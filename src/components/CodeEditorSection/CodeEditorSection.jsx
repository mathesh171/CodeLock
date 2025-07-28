import React from "react";
import styles from "./CodeEditorSection.module.css";
import Button from "../Button/Button";
import MonacoEditor from "react-monaco-editor";

const LANG_OPTIONS = [
  { value: 'python3', label: 'Python 3', ext: 'py' },
  { value: 'java', label: 'Java', ext: 'java' },
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
  lang, setLang,
  code, setCode,
  onClear, onRun, onSubmit,
  runResult,
  submitResult,
  loading
}) => (
  <aside className={styles.editorBox} aria-label="Code editor and controls">
    <div className={styles.row}>
      <label htmlFor="lang" className={styles.label}>Language:</label>
      <select
        id="lang"
        className={styles.dropdown}
        value={lang}
        onChange={e => {
          setLang(e.target.value);
          setCode(defaultCodeByLang[e.target.value] || '');
        }}
        aria-required="true"
      >
        {LANG_OPTIONS.map(l => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
    </div>
    <div className={styles.editorOuter}>
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
        }}
        height="320px"
        editorWillMount={(monaco) => {
          
          monaco.languages.registerCompletionItemProvider(lang, {
            provideCompletionItems: () => ({
              suggestions: [
                {
                  label: 'Scanner',
                  kind: monaco.languages.CompletionItemKind.Class,
                  insertText: 'Scanner',
                  documentation: 'Java Scanner class',
                },
              ],
            }),
            triggerCharacters: ['S'],
          });
          monaco.editor.defineTheme('leetcode-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'comment', foreground: '6A9955' },
              { token: 'keyword', foreground: '569CD6' },
              { token: 'number', foreground: 'B5CEA8' },
              { token: 'string', foreground: 'CE9178' },
              { token: 'operator', foreground: 'D4D4D4' },
              { token: 'namespace', foreground: '4EC9B0' },
              { token: 'type.identifier', foreground: '4EC9B0' },
              { token: 'function', foreground: 'DCDCAA' },
              { token: 'variable', foreground: '9CDCFE' },
              { token: 'class', foreground: '4EC9B0' }
            ],
            colors: {
              'editor.background': '#1e1e1e',
              'editor.foreground': '#d4d4d4',
              'editorLineNumber.foreground': '#858585',
              'editorCursor.foreground': '#AEAFAD',
              'editor.lineHighlightBackground': '#2a2d2e'
            }
          });
        }}
        editorDidMount={(editor, monaco) => {
          monaco.editor.setTheme('leetcode-dark');
        }}
      />
    </div>
    <div className={styles.btnRow}>
      <Button variant="ternary" onClick={onClear} ariaLabel="Clear code editor">Clear</Button>
      <Button variant="secondary" onClick={onRun} disabled={loading} ariaLabel="Compile and run code">Compile &amp; Run</Button>
      <Button variant="primary" onClick={onSubmit} disabled={loading} ariaLabel="Submit code">Submit Code</Button>
    </div>
    {(runResult || submitResult) && (
      <div className={styles.resultBox} aria-live="polite" aria-atomic="true">
        <TestCasesResultTable runResult={runResult} submitResult={submitResult} />
      </div>
    )}
  </aside>
);

const TestCasesResultTable = ({ runResult, submitResult }) => {
  const results = runResult?.testcases || submitResult?.testcases || [];

  if (results.length === 0) {
    return <p>No test case results to display.</p>;
  }

  return (
    <table className={styles.resultTable}>
      <thead>
        <tr>
          <th>Testcase</th>
          <th>Passed</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {results.map(tc => (
          <tr key={tc.id}>
            <td>Testcase {tc.id}</td>
            <td className={tc.passed ? styles.passed : styles.failed} aria-label={tc.passed ? "Passed" : "Failed"}>
              {tc.passed ? '✔️' : '❌'}
            </td>
            <td>{tc.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CodeEditorSection;
