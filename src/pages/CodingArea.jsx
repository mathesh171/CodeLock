import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';
import QuestionNumberSection from '../components/QuestionNumberSection/QuestionNumberSection';
import QuestionSection from '../components/QuestionSection/QuestionSection';
import CodeEditorSection from '../components/CodeEditorSection/CodeEditorSection';
import { useRoom } from '../context/RoomContext';
import { useAuthUser } from '../context/AuthUser';
import styles from '../pageStyles/CodingArea.module.css';
import Logo from '../components/Logo/Logo.jsx';

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
  const [lang, setLang] = useState('java');
  const [code, setCode] = useState('');
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [statusMap, setStatusMap] = useState({});
  const authUser = getAuthUser();

  useEffect(() => {
    if (roomCodeParam && roomCodeParam !== roomCode) {
      setRoomCode(roomCodeParam);
    }
  }, [roomCodeParam, roomCode, setRoomCode]);

  useEffect(() => {
    if (!roomCode) return;

    fetch(`${API_BASE}/api/questions/get/${roomCode}`)
      .then(res => res.json())
      .then(data => {
        if (!data) return;

        setQuestions(data);
        setLangByQ(prev => {
          const updated = { ...prev };
          data.forEach(({ questions_id }) => {
            const qid = questions_id?.id;
            if (qid && !(qid in updated)) {
              updated[qid] = 'java';
            }
          });
          return updated;
        });

        setCodeByQ(prev => {
          const updated = { ...prev };
          data.forEach(({ questions_id }) => {
            const qid = questions_id?.id;
            if (qid && !(qid in updated)) {
              updated[qid] = initialCodeSamples['java'];
            }
          });
          return updated;
        });
      });
  }, [roomCode]);

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
    localStorage.setItem(`statusMap-${roomCode}`, JSON.stringify(statusMap));
  }, [statusMap, roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`codeByQ-${roomCode}`, JSON.stringify(codeByQ));
  }, [codeByQ, roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`langByQ-${roomCode}`, JSON.stringify(langByQ));
  }, [langByQ, roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`lang-${roomCode}`, lang);
  }, [lang, roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`curIdx-${roomCode}`, curIdx);
  }, [curIdx, roomCode]);

  useEffect(() => {
    setRunResult(null);
    setSubmitResult(null);
  }, [curIdx]);

  useEffect(() => {
    if (questions.length === 0) {
      setCode('');
      return;
    }
    const currentQ = questions[curIdx]?.questions_id;

    if (!currentQ) {
      setCode('');
      return;
    }

    const qid = currentQ.id;
    const savedCode = codeByQ[qid];

    if (savedCode !== undefined) {
      setCode(savedCode);
    } else {
      const langForQ = langByQ[qid] || lang || 'java';
      setCode(initialCodeSamples[langForQ] || '');
    }
  }, [curIdx, questions, codeByQ, langByQ, lang]);

  const updateStatus = (idx, status) => {
    setStatusMap(prev => ({ ...prev, [idx]: status }));
  };

  const markCurrentSkippedIfUnanswered = () => {
    if (statusMap[curIdx] === 'unseen') {
      updateStatus(curIdx, 'skipped');
    }
  };

  const handlePrev = () => {
    markCurrentSkippedIfUnanswered();
    if (curIdx > 0) setCurIdx(curIdx - 1);
  };

  const handleNext = () => {
    markCurrentSkippedIfUnanswered();
    if (curIdx < questions.length - 1) setCurIdx(curIdx + 1);
  };

  const handleSelect = idx => {
    markCurrentSkippedIfUnanswered();
    setCurIdx(idx);
  };

  const handleRun = async () => {
    if (!questions[curIdx]?.questions_id) return;
    setLoading(true);
    setRunResult(null);
    setSubmitResult(null);

    const curQ = questions[curIdx].questions_id;
    const codeToRun = codeByQ[curQ.id] ?? '';
    const fileExt = LANG_OPTIONS.find(l => l.value === lang)?.ext || 'py';

    try {
      const response = await fetch(`${API_BASE}/api/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: curQ.id,
          code: codeToRun,
          lang,
          ext: fileExt,
        }),
      });
      const data = await response.json();
      setRunResult(data);
    } catch {
      setRunResult({ error: "Run error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!questions[curIdx]?.questions_id) return;
    setLoading(true);
    setRunResult(null);
    setSubmitResult(null);

    const curQ = questions[curIdx].questions_id;
    const codeToSubmit = codeByQ[curQ.id] ?? '';
    const fileExt = LANG_OPTIONS.find(l => l.value === lang)?.ext || 'java';

    try {
      const response = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: curQ.id,
          code: codeToSubmit,
          lang,
          ext: fileExt,
          roomcode: roomCode,
          username: authUser.username
        }),
      });
      const data = await response.json();
      setSubmitResult(data);
      updateStatus(curIdx, 'answered');
    } catch {
      setSubmitResult({ error: "Submit error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = () => {
    localStorage.removeItem(`statusMap-${roomCode}`);
    fetch(`${API_BASE}/api/submittest`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomCode, username: authUser.username }),
    }).then(() => {
      setShowSubmitModal(false);
      navigate(`/result/${roomCode}`);
    });
  };

  const handleCancelSubmit = () => setShowSubmitModal(false);

  const handleClear = () => {
    const curQ = questions[curIdx]?.questions_id;
    if (!curQ) return;

    setCodeByQ(prev => ({
      ...prev,
      [curQ.id]: initialCodeSamples[lang] || '',
    }));
    setCode(initialCodeSamples[lang] || '');
  };

  const handleLanguageChange = (newLang) => {
    const curQ = questions[curIdx]?.questions_id;
    if (!curQ) return;
    setLang(newLang);
    setLangByQ(prev => ({
      ...prev,
      [curQ.id]: newLang,
    }));
    setCodeByQ(prev => ({
      ...prev,
      [curQ.id]: prev[curQ.id] || initialCodeSamples[newLang] || '',
    }));
    setCode(prev => prev || initialCodeSamples[newLang] || '');
  };

  const handleCodeChange = (newCode) => {
    const curQ = questions[curIdx]?.questions_id;
    if (!curQ) return;
    setCode(newCode);
    setCodeByQ(prev => ({
      ...prev,
      [curQ.id]: newCode,
    }));
  };

  const currentExpectedOutputs = (() => {
    const curQ = questions[curIdx]?.questions_id;
    if (!curQ) return [];
    try {
      const tests = JSON.parse(curQ.testcases || '{}');
      const keys = Object.keys(tests).slice(0, 2);
      return keys.map(k => tests[k].output || '');
    } catch {
      return [];
    }
  })();

  return (
    <div className={styles.fixedViewport}>
      <TopBar username={user?.username || authUser?.username || 'Guest'} roomCode={roomCode} onSubmitTest={() => setShowSubmitModal(true)} />

      {showSubmitModal && (
        <div className={styles.modalOverlay} role="dialog">
          <div className={styles.modalContent}>
            <h2>Confirm Submission</h2>
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
          <QuestionNumberSection questions={questions} curIdx={curIdx} statusMap={statusMap} onSelect={handleSelect} notVisitedCount={questions.length} />
        </div>
        <div className={styles.questionSectionAuto}>
          <QuestionSection questionData={questions[curIdx]} />
        </div>
        <div className={styles.editorBoxAuto}>
          <CodeEditorSection
            lang={lang}
            setLang={handleLanguageChange}
            code={code}
            setCode={handleCodeChange}
            runResult={runResult}
            submitResult={submitResult}
            loading={loading}
            onRun={handleRun}
            onSubmit={handleSubmit}
            onClear={handleClear}
            onPrev={handlePrev}
            onNext={handleNext}
            isPrevDisabled={curIdx === 0}
            isNextDisabled={curIdx === questions.length - 1}
            totalQuestions={questions.length}
            expectedOutputs={currentExpectedOutputs}
            setLangByQ={setLangByQ}
            setCodeByQ={setCodeByQ}
            currentQuestionId={questions[curIdx]?.questions_id?.id}
          />
        </div>
      </main>

      {window.innerWidth < 1200 && (
        <div className={styles.responsiveBlock}>
          <Logo />
          <p className={styles.responsiveMessage}>Please use a wider window to attend the test</p>
        </div>
      )}
    </div>
  );
}
