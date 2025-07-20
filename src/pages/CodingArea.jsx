import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:8084"; // Adjust if needed

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
  // add more if your backend supports
];

const defaultCodeByLang = {
  python3: '# Write your Python code here\ndef solution():\n    pass',
  java: '// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n    }\n}',
  cpp: '// Write your C++ code here\nint main() {\n    return 0;\n}',
};

const CodingArea = () => {
  const { roomCode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [curIdx, setCurIdx] = useState(0);
  const [codeByQ, setCodeByQ] = useState({});
  const [lang, setLang] = useState('python3');
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min, adjust as needed
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authUser = getAuthUser();

  // Fetch questions on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`${API_BASE}/api/questions/get/${roomCode}`)
      .then(r => r.json())
      .then(data => {
        if (isMounted) {
          setQuestions(data);
          if (data.length > 0) {
            // Init code state for all questions if not already present (or use last code)
            const firstLang = LANG_OPTIONS.find(l => l.value === lang) || LANG_OPTIONS[0];
            const codes = {};
            data.forEach((q, idx) => {
              codes[q.questions_id.id] = defaultCodeByLang[firstLang.value];
            });
            setCodeByQ(codes);
            setCurIdx(0);
          }
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
    return () => { isMounted = false; }
    // eslint-disable-next-line
  }, [roomCode]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [timeLeft]);

  if (loading) return <div>Loading...</div>;
  if (!questions.length) return <div>No questions for this room!</div>;

  const q = questions[curIdx];
  const code = codeByQ[q.questions_id.id] || '';

  // Navigation
  const handlePrev = () => setCurIdx(i => Math.max(0, i - 1));
  const handleNext = () => setCurIdx(i => Math.min(questions.length - 1, i + 1));

  // Code change
  const handleCodeChange = (value) => {
    setCodeByQ(o => ({ ...o, [q.questions_id.id]: value }));
  };

  // Run code (testcases, not submission)
  const handleRunCode = () => {
    setRunResult(null);
    fetch(`${API_BASE}/api/run`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: q.questions_id.id,
        code,
        lang,
        ext: LANG_OPTIONS.find(l => l.value === lang)?.ext || 'py',
      })
    }).then(r => r.json()).then(setRunResult);
  };

  // Submit code for this question
  const handleSubmitCode = () => {
    setSubmitResult(null);
    fetch(`${API_BASE}/api/submit`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: q.questions_id.id,
        code,
        lang,
        ext: LANG_OPTIONS.find(l => l.value === lang)?.ext || 'py',
        roomcode: roomCode,
        username: authUser.username,
      })
    }).then(r => r.json()).then(setSubmitResult);
  };

  // Submit test (final): finish the test attempt for the user
  const handleFinalSubmit = () => {
    fetch(`${API_BASE}/api/submittest`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomCode,
        username: authUser.username,
      })
    }).then(async r => {
      // await r.json();
      navigate(`/result/${roomCode}`); // Or where your result page is
    });
  };

  // Formatting helpers
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f2f7ff'
    }}>
      {/* Header + Timer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h1>Coding Challenge Room: {roomCode}</h1>
        <div style={{
          fontSize: '22px', fontWeight: 'bold',
          color: timeLeft < 60 ? 'red' : 'black', minWidth: 150, textAlign: 'right'
        }}>
          ⏰ Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* LANG Selection */}
      <div style={{ marginBottom: 16 }}>
        <label>
          Language:
          <select value={lang} onChange={e => setLang(e.target.value)} style={{ marginLeft: 8 }}>
            {LANG_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Question Panel */}
      <div style={{
        background: 'white', borderRadius: 7, marginBottom: 16, padding: 16, boxShadow: '0 2px 6px #eee'
      }}>
        <h2>Question {curIdx + 1} / {questions.length}: {q.questions_id.title}</h2>
        <p>{q.questions_id.description}</p>
        {/* Add more fields if available: input/output examples, etc */}
      </div>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={e => handleCodeChange(e.target.value)}
        style={{
          flex: '1 1 auto', minHeight: 180,
          fontFamily: 'monospace', fontSize: '15px',
          border: '1px solid #bdd0fc', borderRadius: '5px',
          padding: '12px', background: '#fdfaee', marginBottom: 20
        }}
        placeholder="Write your solution here..."
      />

      {/* Run/Submit Result Area */}
      <div style={{
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 10, marginBottom: 18
      }}>
        <button onClick={handleRunCode} style={{
          background: '#ffb547', border: 0, color: '#222',
          padding: '8px 20px', borderRadius: 4, fontWeight: 600, cursor: 'pointer'
        }}>Run Code</button>
        <button onClick={handleSubmitCode} style={{
          background: '#48d18a', border: 0, color: 'white',
          padding: '8px 26px', borderRadius: 4, fontWeight: 600, cursor: 'pointer'
        }}>Submit Solution</button>
      </div>
      {runResult && (
        <div style={{ background: '#f6ffd5', padding: 10, borderRadius: 4, marginBottom: 7 }}>
          <b>Run Result:</b>
          <pre style={{ margin: 0, fontSize: 13 }}>
            {Object.entries(runResult).map(([key, value]) =>
              <div key={key}>{key}: {JSON.stringify(value)}</div>
            )}
          </pre>
        </div>
      )}
      {submitResult && (
        <div style={{ background: '#e7f9f3', padding: 10, borderRadius: 4, marginBottom: 7 }}>
          <b>Submit Result:</b>
          <pre style={{ margin: 0, fontSize: 13 }}>
            {Object.entries(submitResult).map(([key, value]) =>
              <div key={key}>{key}: {JSON.stringify(value)}</div>
            )}
          </pre>
        </div>
      )}

      {/* Question Navigation */}
      <div style={{ marginBottom: 18 }}>
        <button onClick={handlePrev} disabled={curIdx === 0} style={{
          padding: '6px 14px', marginRight: 8, borderRadius: 4, background: '#eee'
        }}>Prev</button>
        <button onClick={handleNext} disabled={curIdx === questions.length - 1} style={{
          padding: '6px 14px', marginLeft: 2, borderRadius: 4, background: '#eee'
        }}>Next</button>
      </div>

      {/* Final Submit */}
      <div style={{ textAlign: 'center', marginBottom: 24, marginTop: 8 }}>
        <button onClick={handleFinalSubmit} style={{
          background: '#376fff', color: 'white', border: 0, fontWeight: 700,
          padding: '12px 44px', borderRadius: 7, fontSize: '17px', cursor: 'pointer'
        }}>Submit All &amp; Finish Test</button>
      </div>
    </div>
  );
};

export default CodingArea;
