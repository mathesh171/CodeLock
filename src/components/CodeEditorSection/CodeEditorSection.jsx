import React, { useEffect } from "react";
import styles from "./CodeEditorSection.module.css";
import Button from "../Button/Button";
import MonacoEditor from "react-monaco-editor";

const LANG_OPTIONS = [
  { value: 'java', label: 'Java', ext: 'java' },
  { value: 'python3', label: 'Python 3', ext: 'py' },
  { value: 'cpp', label: 'C++', ext: 'cpp' },
  { value: 'c', label: 'C', ext: 'c' }
];

const defaultCodeByLang = {
  python3: '# Write your Python code here\ndef solution():\n    pass',
  java: '// Write your Java code here\npublic class Solution {\n    public static void main(String[] args) {\n    }\n}',
  cpp: '// Write your C++ code here\nint main() {\n    return 0;\n}',
  c: '// Write your C code here\n#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}'
};

const CodeEditorSection = ({
  lang,
  setLang,
  code,
  setCode,
  runResult,
  submitResult,
  loading,
  onRun,
  onSubmit,
  onClear,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
  expectedOutputs = [],
  totalQuestions,
  setLangByQ,
  setCodeByQ,
  currentQuestionId
}) => {
  useEffect(() => {
    if (!code && defaultCodeByLang[lang]) {
      setCode(defaultCodeByLang[lang]);
    }
  }, [lang, code, setCode]);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    if (setLangByQ && currentQuestionId) {
      setLangByQ(prev => ({ ...prev, [currentQuestionId]: newLang }));
    }
    if (setCodeByQ && currentQuestionId) {
      setCodeByQ(prev => ({
        ...prev,
        [currentQuestionId]: prev[currentQuestionId] || defaultCodeByLang[newLang]
      }));
      setCode(prev => prev[currentQuestionId] || defaultCodeByLang[newLang]);
    } else {
      setCode(defaultCodeByLang[newLang]);
    }
  };

  return (
    <aside className={styles.editorBox}>
      <div className={styles.editorInnerScroll}>
        <div className={styles.row}>
          <label htmlFor="lang" className={styles.label}>Language:</label>
          <select
            id="lang"
            className={styles.dropdown}
            value={lang}
            onChange={e => handleLangChange(e.target.value)}
            aria-required="true"
          >
            {LANG_OPTIONS.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
        <div className={styles.editorOuter}>
          <div className={styles.monacoScrollWrapper}>
            <MonacoEditor
              language={
                lang === "python3" ? "python" :
                lang === "cpp" ? "cpp" :
                lang === "java" ? "java" : "c"
              }
              theme="leetcode-dark"
              value={code}
              onChange={setCode}
              options={{
                fontSize: 15,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'auto'
                }
              }}
              height="500px"
              width="100%"
              editorWillMount={(monaco) => {
                monaco.editor.defineTheme('leetcode-dark', {
                  base: 'vs-dark',
                  inherit: true,
                  rules: [],
                  colors: {
                    'editor.background': '#1e1e1e',
                    'editorLineNumber.foreground': '#858585',
                    'editorLineNumber.activeForeground': '#c6c6c6'
                  }
                });
              }}
              editorDidMount={(editor, monaco) => {
                monaco.editor.setTheme('leetcode-dark');
                const style = document.createElement('style');
                style.innerHTML = `
                  .monaco-editor .scrollbar,
                  .monaco-scrollable-element {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f1f1f1;
                  }
                  .monaco-editor ::-webkit-scrollbar {
                    width: 10px;
                  }
                  .monaco-editor ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                  }
                  .monaco-editor ::-webkit-scrollbar-thumb {
                    background: #888;
                  }
                  .monaco-editor ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                  }
                `;
                document.head.appendChild(style);
              }}
            />
          </div>
        </div>
        <div className={styles.btnRunGroup}>
          <Button variant="ternary" size="small" className={styles.textBlue} onClick={onClear} ariaLabel="Clear code editor">Clear</Button>
          <Button variant="secondary" size="small" className={styles.textBlue} onClick={onRun} disabled={loading} ariaLabel="Compile and run code">Compile & Run</Button>
          <Button variant="primary" size="small" onClick={onSubmit} disabled={loading} ariaLabel="Submit code">Submit Code</Button>
        </div>
        <div className={styles.resultBox} aria-live="polite" aria-atomic="true">
          <RunResultTable runResult={runResult} expectedOutputs={expectedOutputs} />
          <SubmitResultTable submitResult={submitResult} />
        </div>
      </div>
      <div className={styles.btnRowBottom}>
        <Button variant="ternary" size="small" className={styles.textBlue} onClick={onPrev} disabled={isPrevDisabled} ariaLabel="Previous question">Prev</Button>
        <Button variant="ternary" size="small" className={styles.textBlue} onClick={onNext} disabled={isNextDisabled} ariaLabel="Next question">Next</Button>
      </div>
    </aside>
  );
};

const RunResultTable = ({ runResult, expectedOutputs = [] }) => {
  if (!runResult || typeof runResult !== 'object') return null;
  const rows = expectedOutputs.map((expected, i) => {
    const output = runResult[`testcase${i + 1}op`] ?? '';
    const status = output.trim() === expected.trim() ? 'passed' : 'failed';
    return { id: i + 1, expected, output, status };
  });
  const hasAtLeastOneOutput = rows.some(row => row.expected || row.output);
  if (!hasAtLeastOneOutput) return null;
  return (
    <table className={styles.resultTable}>
      <thead>
        <tr>
          <th>Testcase</th>
          <th>Expected Output</th>
          <th>Your Output</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx}>
            <td className={styles.cellText}>{r.id}</td>
            <td className={styles.cellText}>{r.expected}</td>
            <td className={styles.cellText}>{r.output}</td>
            <td className={r.status === 'passed' ? styles.passed : styles.failed}>
              {r.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SubmitResultTable = ({ submitResult }) => {
  if (!submitResult || typeof submitResult !== 'object') return null;
  const rows = Object.entries(submitResult)
    .filter(([key]) => key.startsWith('testcase'))
    .map(([key, value], index) => {
      const output = value?.op ?? '';
      const expected = value?.expected ?? '';
      const error = value?.error;
      let status = '✖';
      let message = 'failed';
      if (error) {
        message = error;
      } else if (output.trim() === expected.trim()) {
        status = '✔';
        message = 'passed';
      }
      return {
        testcase: `Testcase ${index + 1}`,
        status,
        message
      };
    });
  if (!rows.length) return null;
  return (
    <table className={styles.resultTable}>
      <thead>
        <tr>
          <th>Status</th>
          <th>Testcase</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td className={r.status === '✔' ? styles.passed : styles.failed}>{r.status}</td>
            <td className={styles.cellText}>{r.testcase}</td>
            <td className={styles.cellText}>{r.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CodeEditorSection;
