import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar/TopBar";
import QuestionNumberSection from "../components/QuestionNumberSection/QuestionNumberSection";
import QuestionSection from "../components/QuestionSection/QuestionSection";
import CodeEditorSection from "../components/CodeEditorSection/CodeEditorSection";
import { useAuthUser } from "../context/AuthUser";
import { useRoom } from "../context/RoomContext";

const LANGUAGES = [
  { value: "python3", label: "Python 3" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" }
];
const DEFAULT_CODE = {
  python3: "# Write your code in Python 3 here\n",
  java: "// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n        \n    }\n}\n",
  cpp: "// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n"
};
const getInitialCodes = (questions, lang) => {
  const obj = {};
  questions.forEach(q => {
    obj[q.questions_id?.id] = DEFAULT_CODE[lang];
  });
  return obj;
};
function CodingArea() {
  const { authUser } = useAuthUser();
  const { roomCode, questions } = useRoom();
  const [curIdx, setCurIdx] = useState(0);
  const [lang, setLang] = useState("python3");
  const [codeByQ, setCodeByQ] = useState({});
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 30);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!questions || questions.length === 0) return;
    setCodeByQ(obj => {
      let updated = { ...obj };
      questions.forEach(q => {
        if (!updated[q.questions_id?.id]) {
          updated[q.questions_id?.id] = DEFAULT_CODE[lang];
        }
      });
      return updated;
    });
  }, [questions, lang]);
  const [questionStatusMap, setQuestionStatusMap] = useState({});
  useEffect(() => {
    if (questions && questions.length > 0) {
      let obj = {};
      questions.forEach((_, i) => {
        if (i === curIdx) obj[i] = "answered";
        else if (i % 3 === 0) obj[i] = "bookmarked";
        else if (i % 2 === 0) obj[i] = "skipped";
        else obj[i] = "unseen";
      });
      setQuestionStatusMap(obj);
    }
  }, [questions, curIdx]);
  const handleCodeChange = (val) => {
    const questionId = questions[curIdx].questions_id?.id;
    setCodeByQ(prev => ({
      ...prev,
      [questionId]: val
    }));
  };
  const handleClear = () => {
    const questionId = questions[curIdx].questions_id?.id;
    setCodeByQ(prev => ({
      ...prev,
      [questionId]: DEFAULT_CODE[lang]
    }));
    setRunResult(null);
    setSubmitResult(null);
  };
  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      setRunResult({ output: "Sample output...\n(Integrate runCode API for real result)" });
    } catch (err) {
      setRunResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      setSubmitResult({ verdict: "Submitted! (Integrate submit API for real result)" });
    } catch (err) {
      setSubmitResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };
  const handleFinalSubmit = () => {
    if (window.confirm("Submit your entire test? You will not be able to edit further.")) {
      alert("Test submitted!");
    }
  };
  if (!questions || questions.length === 0) {
    return (
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100vh", fontSize: "1.3rem", color: "#2563eb"
        }}
      >
        Loading Questions...
      </div>
    );
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <TopBar
        username={authUser?.username || "Candidate"}
        roomCode={roomCode || "XXXXXX"}
        timeLeft={timeLeft}
        onSubmitTest={handleFinalSubmit}
      />
      <div
        style={{
          flex: "1 1 0",
          display: "grid",
          gridTemplateColumns: "110px 1.7fr 1.15fr",
          gap: "1.2rem",
          width: "100%",
          margin: "0 auto",
          maxWidth: "1850px",
          minHeight: 0,
          padding: "1rem 0",
          boxSizing: "border-box"
        }}
      >
        <QuestionNumberSection
          questions={questions}
          curIdx={curIdx}
          statusMap={questionStatusMap}
          onSelect={setCurIdx}
        />
        <div style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch"
        }}>
          <QuestionSection question={questions[curIdx]?.questions_id} />
        </div>
        <CodeEditorSection
          lang={lang}
          setLang={setLang}
          code={codeByQ[questions[curIdx]?.questions_id?.id] || DEFAULT_CODE[lang]}
          setCode={handleCodeChange}
          onClear={handleClear}
          onRun={handleRun}
          onSubmit={handleSubmit}
          runResult={runResult}
          submitResult={submitResult}
          loading={loading}
        />
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .ca-main-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
export default CodingArea;
