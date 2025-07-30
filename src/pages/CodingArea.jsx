import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';
import QuestionNumberSection from '../components/QuestionNumberSection/QuestionNumberSection';
import QuestionSection from '../components/QuestionSection/QuestionSection';
import CodeEditorSection from '../components/CodeEditorSection/CodeEditorSection';
import { useRoom } from '../context/RoomContext';
import { useAuthUser } from '../context/AuthUser';
import styles from '../pageStyles/CodingArea.module.css';
import Logo from '../components/Logo/Logo.jsx'

const API_BASE = "http://localhost:8084";
const LANG_OPTIONS = [
  { value: 'python3', label: 'Python 3', ext: 'py' },
  { value: 'java', label: 'Java', ext: 'java' },
  { value: 'cpp', label: 'C++', ext: 'cpp' },
  { value: 'c', label: 'C', ext: 'c' }
];
const initialCodeSamples = {
  python3: '# Write your Python code here\ndef solution():\n    pass',
  java: '// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n    }\n}',
  cpp: '// Write your C++ code here\nint main() {\n    return 0;\n}',
  c: '// Write your C code here\n#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
};
function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem('authUser')) || {};
  } catch {
    return {};
  }
}
export default function CodingArea() {
  const { roomCode: roomCodeParam } = useParams();
  const { roomCode, setRoomCode } = useRoom();
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const [codeByQ, setCodeByQ] = useState({});
  const [langByQ, setLangByQ] = useState({});
  const [lang, setLang] = useState('python3');
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [timer, setTimer] = useState(0);
  const authUser = getAuthUser();
  const [statusMap, setStatusMap] = useState({});

  const updateStatus = (idx, newStatus) => {
    setStatusMap(prev => ({ ...prev, [idx]: newStatus }));
  };

  useEffect(() => {
    if (questions.length > 0) {
      setStatusMap(prev => {
        const updated = { ...prev };
        questions.forEach((_, idx) => {
          if (updated[idx] === undefined) {
            updated[idx] = 'unseen';
          }
        });
        return updated;
      });
    }
  }, [questions]);


  useEffect(() => {
    const savedStatus = localStorage.getItem(`statusMap-${roomCode}`);
    if (savedStatus) {
      setStatusMap(JSON.parse(savedStatus));
    }
  }, [roomCode]);

  useEffect(() => {
    localStorage.setItem(`statusMap-${roomCode}`, JSON.stringify(statusMap));
  }, [statusMap, roomCode]);



  useEffect(() => {
    if (roomCodeParam && roomCodeParam !== roomCode) setRoomCode(roomCodeParam);
  }, [roomCodeParam, roomCode, setRoomCode]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/questions/get/${roomCode}`)
      .then(r => r.json())
      .then(data => {
        if (isMounted) {
          setQuestions(data);
          if (data.length > 0) {
            const codes = {};
            const langs = {};
            data.forEach((q, idx) => {
              const defLang = lang;
              codes[q.questions_id.id] = initialCodeSamples[defLang];
              langs[q.questions_id.id] = defLang;
            });
            setCodeByQ(codes);
            setLangByQ(langs);
            setCurIdx(0);
          }
        }
      });
    return () => { isMounted = false; };
  }, [roomCode, lang]);

  useEffect(() => {
    if (questions.length > 0) {
      const current = questions[curIdx]?.questions_id;
      setLang(langByQ[current?.id] || lang);
    }
  }, [curIdx, questions, langByQ, lang]);

  const markCurrentAsSkippedIfUnanswered = () => {
    if (statusMap[curIdx] === 'unseen') {
      updateStatus(curIdx, 'skipped');
    }
  };

  const handlePrev = () => {
    markCurrentAsSkippedIfUnanswered();
    if (curIdx > 0) setCurIdx(curIdx - 1);
  };

  const handleNext = () => {
    markCurrentAsSkippedIfUnanswered();
    if (curIdx < questions.length - 1) setCurIdx(curIdx + 1);
  };

  const handleSelectQuestion = (idx) => {
    markCurrentAsSkippedIfUnanswered();
    setCurIdx(idx);
};

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    setSubmitResult(null);
    const currentQ = questions[curIdx]?.questions_id;
    const code = codeByQ[currentQ.id];
    const ext = LANG_OPTIONS.find(l => l.value === lang)?.ext || 'py';
    try {
      const res = await fetch(`${API_BASE}/api/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: currentQ.id,
          code,
          lang,
          ext
        })
      });
      const data = await res.json();
      setRunResult(data);
    } catch (err) {
      setRunResult({ error: "Run error" });
    }
    setLoading(false);
  };
  const handleSubmitCode = async () => {
    setLoading(true);
    setRunResult(null);
    setSubmitResult(null);
    const currentQ = questions[curIdx]?.questions_id;
    const code = codeByQ[currentQ.id];
    const ext = LANG_OPTIONS.find(l => l.value === lang)?.ext || 'py';
    try {
      const res = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: currentQ.id,
          code,
          lang,
          ext,
          roomcode: roomCode,
          username: authUser.username
        })
      });
      const data = await res.json();
      setSubmitResult(data);
      updateStatus(curIdx, 'answered');
    } catch (err) {
      setSubmitResult({ error: "Submit error" });
    }
    setLoading(false);
  };
  const handleFinalSubmit = () => {
    localStorage.removeItem(`statusMap-${roomCode}`);
    fetch(`${API_BASE}/api/submittest`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode, username: authUser.username })
    }).then(() => {
      setShowSubmitModal(false);
      navigate(`/result/${roomCode}`);
    });
  };
  const handleCancelSubmit = () => setShowSubmitModal(false);
  const handleClear = () => {
    const current = questions[curIdx]?.questions_id;
    setCodeByQ(prev => ({ ...prev, [current.id]: initialCodeSamples[lang] }));
  };
  const handleLangChange = (val) => {
    const current = questions[curIdx]?.questions_id;
    setLang(val);
    setCodeByQ(prev => ({ ...prev, [current.id]: initialCodeSamples[val] }));
    setLangByQ(prev => ({ ...prev, [current.id]: val }));
  };
  const handleCodeChange = (val) => {
    const current = questions[curIdx]?.questions_id;
    setCodeByQ(prev => ({ ...prev, [current.id]: val }));
  };
  const displayCode = (() => {
    const current = questions[curIdx]?.questions_id;
    return (codeByQ && current && codeByQ[current.id]) || initialCodeSamples[lang];
  })();
  return (
    <div className={styles.fixedViewport}>
      <TopBar username={user?.username || authUser?.username || 'Guest'} roomCode={roomCode} onSubmitTest={() => setShowSubmitModal(true)} />
      {showSubmitModal && (
        <div className={styles.modalOverlay} role="dialog">
          <div className={styles.modalContent}>
            <h2>Confirm Submit Test</h2>
            <p>Are you sure you want to submit the test? This action cannot be undone.</p>
            <div className={styles.modalButtons}>
              <button onClick={handleFinalSubmit} className={styles.modalBtnPrimary}>Yes, Submit</button>
              <button onClick={handleCancelSubmit} className={styles.modalBtnSecondary}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <main className={styles.mainLayoutNoScroll}>
        <div className={styles.sidebarAuto}>
          <QuestionNumberSection
            questions={questions}
            curIdx={curIdx}
            statusMap={statusMap}
            onSelect={handleSelectQuestion}
            notViewedCount={questions.length}
          />
        </div>
        <div className={styles.questionSectionAuto}>
          <QuestionSection questionData={questions[curIdx]} />
        </div>
        <div className={styles.editorBoxAuto}>
          <CodeEditorSection
            lang={lang}
            setLang={handleLangChange}
            code={displayCode}
            setCode={handleCodeChange}
            runResult={runResult}
            submitResult={submitResult}
            loading={loading}
            onRun={handleRun}
            onSubmit={handleSubmitCode}
            onClear={handleClear}
            onPrev={handlePrev}
            onNext={handleNext}
            isPrevDisabled={curIdx === 0}
            isNextDisabled={curIdx === questions.length - 1}
            totalQuestions={questions.length}
          />
        </div>
      </main>
      {window.innerWidth < 1200 && (
        <div className={styles.responsiveBlock}>
          
          <Logo/>
          <p className={styles.responsiveMessage}>Use a wider window to attend the test</p>
        </div>
      )}
    </div>
  );
}
