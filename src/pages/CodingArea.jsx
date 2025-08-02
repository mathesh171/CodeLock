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

  // Sync roomCode param to context
  useEffect(() => {
    if (roomCodeParam && roomCodeParam !== roomCode) {
      setRoomCode(roomCodeParam);
    }
  }, [roomCodeParam, roomCode, setRoomCode]);

  // Load saved data from localStorage on roomCode change
  useEffect(() => {
    if (!roomCode) return;

    const savedLang = localStorage.getItem(`lang-${roomCode}`);
    const savedCurIdx = localStorage.getItem(`curIdx-${roomCode}`);
    const savedCodes = localStorage.getItem(`codeByQ-${roomCode}`);
    const savedLangs = localStorage.getItem(`langByQ-${roomCode}`);
    const savedStatus = localStorage.getItem(`statusMap-${roomCode}`);

    if (savedLang) setLang(savedLang);
    if (savedCurIdx) setCurIdx(Number(savedCurIdx));
    if (savedCodes) setCodeByQ(JSON.parse(savedCodes));
    if (savedLangs) setLangByQ(JSON.parse(savedLangs));
    if (savedStatus) setStatusMap(JSON.parse(savedStatus));

  }, [roomCode]);

  // Fetch questions based on roomCode
  useEffect(() => {
    if (!roomCode) return;

    let isMounted = true;
    fetch(`${API_BASE}/api/questions/get/${roomCode}`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to fetch questions');
        return r.json();
      })
      .then(data => {
        if (!isMounted) return;

        setQuestions(data || []);
        if (data?.length) {
          const newCodes = {};
          const newLangs = {};
          data.forEach(q => {
            if (!q.questions_id) return;

            const qid = q.questions_id.id;

            // Use existing lang from langByQ or default
            const existingLang = langByQ[qid] || lang || 'java';
            newLangs[qid] = existingLang;

            // Use saved code or initial sample for language
            newCodes[qid] = codeByQ[qid] || initialCodeSamples[existingLang] || '';
          });

          setCodeByQ(newCodes);
          setLangByQ(newLangs);
        }
      })
      .catch(() => {
        setQuestions([]);
      });

    return () => { isMounted = false; };
  }, [roomCode, langByQ, lang, codeByQ]);

  // Update status map when questions load
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

  // Persist statusMap to localStorage
  useEffect(() => {
    localStorage.setItem(`statusMap-${roomCode}`, JSON.stringify(statusMap));
  }, [statusMap, roomCode]);

  // Persist codeByQ and langByQ to localStorage
  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`codeByQ-${roomCode}`, JSON.stringify(codeByQ));
  }, [codeByQ, roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`langByQ-${roomCode}`, JSON.stringify(langByQ));
  }, [langByQ, roomCode]);

  // Persist current lang and curIdx
  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`lang-${roomCode}`, lang);
  }, [lang, roomCode]);

  useEffect(() => {
    if (!roomCode) return;
    localStorage.setItem(`curIdx-${roomCode}`, curIdx);
  }, [curIdx, roomCode]);

  // Clear run and submit results on question change
  useEffect(() => {
    setRunResult(null);
    setSubmitResult(null);
  }, [curIdx]);

  // Sync code with currently selected question & saved code
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

  // Update status helper
  const updateStatus = (idx, status) => {
    setStatusMap(prev => ({ ...prev, [idx]: status }));
  };

  const markCurrentSkippedIfUnanswered = () => {
    if (statusMap[curIdx] === 'unseen') {
      updateStatus(curIdx, 'skipped');
    }
  };

  // Navigation handlers
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

  // Run code
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

  // Submit code
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

  // Submit test final action
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

  // Clear code for current question
  const handleClear = () => {
    const curQ = questions[curIdx]?.questions_id;
    if (!curQ) return;

    setCodeByQ(prev => ({
      ...prev,
      [curQ.id]: initialCodeSamples[lang] || '',
    }));
    setCode(initialCodeSamples[lang] || '');
  };

  // Handle language change
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

  // Sync code on edit
  const handleCodeChange = (newCode) => {
    const curQ = questions[curIdx]?.questions_id;
    if (!curQ) return;
    setCode(newCode);
    setCodeByQ(prev => ({
      ...prev,
      [curQ.id]: newCode,
    }));
  };

  // Extract expected outputs from current question's JSON testcases
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
      <TopBar username={user?.username || authUser?.username || 'Guest'} roomCode={roomCode} onSubmit={() => setShowSubmitModal(true)} />

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
