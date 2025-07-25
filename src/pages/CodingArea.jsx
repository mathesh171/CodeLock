import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';
import QuestionNumberSection from '../components/QuestionNumberSection/QuestionNumberSection';
import QuestionSection from '../components/QuestionSection/QuestionSection';
import CodeEditorSection from '../components/CodeEditorSection/CodeEditorSection';
import { useRoom } from '../context/RoomContext';
import { useAuthUser } from '../context/AuthUser';
import styles from '../pageStyles/CodingArea.module.css';

const API_BASE = "http://localhost:8084";

function getInitialTimerValue(initialMinutes) {
  if (initialMinutes === 'unlimited') {
    return 0; // start stopwatch from 0
  }
  return initialMinutes * 60;
}

const initialCodeSamples = {
  python3: `# Write your Python 3 code here\n`,
  java: `// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n        // your code\n    }\n}`,
  cpp: `// Write your C++ code here\n#include <iostream>\nusing namespace std;\nint main() {\n    // your code\n    return 0;\n}`
};

function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem('authUser')) || {};
  } catch {
    return {};
  }
}

const LANG_OPTIONS = [
  { value: 'python3', label: 'Python 3', ext: 'py' },
  { value: 'java', label: 'Java', ext: 'java' },
  { value: 'cpp', label: 'C++', ext: 'cpp' },
];

const defaultCodeByLang = {
  python3: '# Write your Python code here\ndef solution():\n    pass',
  java: '// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n        \n    }\n}',
  cpp: '// Write your C++ code here\nint main() {\n    return 0;\n}',
};

export default function CodingArea() {
  const { roomCode: roomCodeParam } = useParams();
  const navigate = useNavigate();

  const { roomCode, setRoomCode } = useRoom();
  const { user } = useAuthUser();


  const [questions, setQuestions] = useState([]); 
  const [curQuestionIdx, setCurQuestionIdx] = useState(0);
  const [statusMap, setStatusMap] = useState({}); 
  const [notViewedCount, setNotViewedCount] = useState(0);
  const [savedInServerCount, setSavedInServerCount] = useState(0);
  const [questionContent, setQuestionContent] = useState(null); 
  const [lang, setLang] = useState('python3');
  const [code, setCode] = useState(initialCodeSamples['python3']);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [timerActive, setTimerActive] = useState(false);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(null);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  
  const [curIdx, setCurIdx] = useState(0);
  const [codeByQ, setCodeByQ] = useState({});
  const [loadingAlt, setLoadingAlt] = useState(true);
  const [showSubmitModalAlt, setShowSubmitModalAlt] = useState(false);
  const authUser = getAuthUser();

  
  useEffect(() => {
    if (roomCodeParam && roomCodeParam !== roomCode) {
      setRoomCode(roomCodeParam);
    }
  }, [roomCodeParam, roomCode, setRoomCode]);

  
const fetchQuestionsAndTimer = useCallback(async () => {
  try {
    const res = await fetch(`${API_BASE}/api/questions/get/${roomCode}`);
    if (!res.ok) throw new Error('Failed to fetch questions');

    const data = await res.json();

    // ✅ data itself is the array
    if (!Array.isArray(data)) {
      throw new Error("Invalid response: expected an array of questions");
    }

    const questionsArray = data;

    setQuestions(questionsArray);

    const initialStatus = {};
    questionsArray.forEach((_, idx) => {
      initialStatus[idx] = 'unseen';
    });
    setStatusMap(initialStatus);

    setNotViewedCount(questionsArray.length);
    setSavedInServerCount(0); // or update if backend sends it somewhere else

    const timerFromServer = 'unlimited'; // adjust if timer is moved elsewhere
    setTotalTimeMinutes(timerFromServer);

    const timeInit = getInitialTimerValue(timerFromServer);
    setTimeLeft(timeInit);
    setTimerActive(true);

    if (questionsArray.length > 0) {
      setCurQuestionIdx(0);
      setQuestionContent(questionsArray[0]);
    }
  } catch (err) {
    console.error("Error fetching questions and timer:", err.message);
  }
}, [roomCode]);



  useEffect(() => {
    if (roomCode) {
      fetchQuestionsAndTimer();
    }
  }, [roomCode, fetchQuestionsAndTimer]);

  
  useEffect(() => {
    if (!timerActive) return;

    
    if (totalTimeMinutes === 'unlimited') {
      const interval = setInterval(() => {
        setTimeLeft((t) => t + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    
    if (timeLeft <= 0) {
      setTimerActive(false);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, timerActive, totalTimeMinutes]);

  
  useEffect(() => {
    if (!questions[curQuestionIdx]) return;
    setQuestionContent(questions[curQuestionIdx]);

    if (statusMap[curQuestionIdx] === 'unseen') {
      setStatusMap((prev) => {
        const newStatus = { ...prev, [curQuestionIdx]: 'skipped' };
        setNotViewedCount((n) => (n - 1 > 0 ? n - 1 : 0));
        return newStatus;
      });
    }

    setCode(initialCodeSamples[lang]);
    setRunResult(null);
    setSubmitResult(null);
  }, [curQuestionIdx, questions, statusMap, lang]);

  
  useEffect(() => {
    setCode(initialCodeSamples[lang]);
  }, [lang]);

  
  const handleSelectQuestion = (idx) => {
    setCurQuestionIdx(idx);
    setCurIdx(idx);
  };

  const handleSubmitTest = () => {
    setShowSubmitModal(true);
    setShowSubmitModalAlt(true);
  };

  const confirmSubmitTest = () => {
    setShowSubmitModal(false);
    setShowSubmitModalAlt(false);
    alert('Test submitted!');
    navigate('/result');
  };

  const cancelSubmitTest = () => {
    setShowSubmitModal(false);
    setShowSubmitModalAlt(false);
  };

  
  const handleClearCode = () => {
    setCode(initialCodeSamples[lang]);
    setCodeByQ((prev) => ({
      ...prev,
      [questions[curQuestionIdx]?.questions_id?.id]: initialCodeSamples[lang],
    }));
  };

  const handleRunCode = async () => {
    setLoading(true);
    setRunResult(null);
    setSubmitResult(null);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setRunResult({
        testcases: [
          { id: 1, passed: true, status: 'Passed' },
          { id: 2, passed: false, status: 'Error: Wrong output' },
        ],
      });
    } catch (error) {
      setRunResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setRunResult(null);
    setSubmitResult(null);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitResult({
        testcases: [
          { id: 1, passed: true, status: 'Passed' },
          { id: 2, passed: true, status: 'Passed' },
        ],
      });
      setStatusMap((prev) => ({ ...prev, [curQuestionIdx]: 'answered' }));
    } catch (error) {
      setSubmitResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  
  const handleCurIdxChange = (idx) => {
    setCurIdx(idx);
    setCurQuestionIdx(idx);
  };

  const handleLangChangeAlt = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setCodeByQ((codeByQ) => ({
      ...codeByQ,
      [questions[curIdx]?.questions_id?.id]: defaultCodeByLang[newLang],
    }));

    setCode(initialCodeSamples[newLang]);
  };

  const handleCodeChange = (val) =>
    setCodeByQ((prev) => ({
      ...prev,
      [questions[curIdx]?.questions_id?.id]: val,
    }));

  const handleClearAlt = () => {
    setCodeByQ((prev) => ({
      ...prev,
      [questions[curIdx]?.questions_id?.id]: defaultCodeByLang[lang],
    }));
    setCode(initialCodeSamples[lang]);
  };

  const handleRunAlt = async () => {
    setRunResult(null);
    setSubmitResult(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRunResult({
        testcases: [
          { id: 1, passed: true, status: 'Passed' },
          { id: 2, passed: false, status: 'Error: Wrong output' },
        ],
      });
    }, 1200);
  };

  const handleSubmitAlt = () => {
    setShowSubmitModal(true);
    setShowSubmitModalAlt(true);
  };

  if (loading && !questions.length)
    return (
      <div className={styles.outer}>
        <div className={styles.topBar}>
          <div style={{ flex: 1 }} />
          <div style={{ color: '#2563eb', fontWeight: 600 }}>Loading...</div>
        </div>
      </div>
    );

  const displayCode =
    (questions[curIdx]?.questions_id?.id && codeByQ[questions[curIdx]?.questions_id?.id]) ||
    code;

  
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <>
      
      <TopBar
        username={user?.username || authUser?.username || 'Guest'}
        roomCode={roomCode}
        onSubmitTest={handleSubmitTest}
      />

      {showSubmitModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="submit-dialog-title">
          <div className={styles.modalContent}>
            <h2 id="submit-dialog-title">Confirm Submit Test</h2>
            <p>Are you sure you want to submit the test? This action cannot be undone.</p>
            <div className={styles.modalButtons}>
              <button onClick={confirmSubmitTest} className={styles.modalBtnPrimary}>Yes, Submit</button>
              <button onClick={cancelSubmitTest} className={styles.modalBtnSecondary}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.mainLayout}>
        <QuestionNumberSection
          questions={questions}
          curIdx={curQuestionIdx}
          statusMap={statusMap}
          onSelect={(idx) => {
            handleSelectQuestion(idx);
            handleCurIdxChange(idx);
          }}
          notViewedCount={notViewedCount}
          savedInServerCount={savedInServerCount}
        />

        <QuestionSection questionData={questionContent} />

        <CodeEditorSection
          lang={lang}
          setLang={(val) => {
            setLang(val);
            handleLangChangeAlt({ target: { value: val } });
          }}
          code={displayCode}
          setCode={handleCodeChange}
          onClear={() => {
            handleClearCode();
            handleClearAlt();
          }}
          onRun={() => {
            handleRunCode();
            handleRunAlt();
          }}
          onSubmit={() => {
            handleSubmitCode();
            handleSubmitAlt();
          }}
          runResult={runResult}
          submitResult={submitResult}
          loading={loading}
        />
      </main>
    </>
  );
}
