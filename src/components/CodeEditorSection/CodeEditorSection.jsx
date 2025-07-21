// src/components/CodeEditorSection/CodeEditorSection.jsx
import React from "react";
import styles from "./CodeEditorSection.module.css";
import Button from "../Button/Button";
import MonacoEditor from "react-monaco-editor"; // You should install and import this package

const LANG_OPTIONS = [
  { value: 'python3', label: 'Python 3', ext: 'py' },
  { value: 'java', label: 'Java', ext: 'java' },
  { value: 'cpp', label: 'C++', ext: 'cpp' }
];

const CodeEditorSection = ({
  lang, setLang,
  code, setCode,
  onClear, onRun, onSubmit,
  runResult,
  submitResult,
  loading
}) => (
  <aside className={styles.editorBox}>
    <div className={styles.row}>
      <label htmlFor="lang" className={styles.label}>Language:</label>
      <select
        id="lang"
        className={styles.dropdown}
        value={lang}
        onChange={e => setLang(e.target.value)}
      >
        {LANG_OPTIONS.map(l => (
          <option key={l.value} value={l.value}>{l.label}</option>
        ))}
      </select>
    </div>
    <div className={styles.editorOuter}>
      <MonacoEditor
        language={lang === "python3" ? "python" : lang}
        theme="vs-dark"
        value={code}
        onChange={setCode}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        height="320px"
      />
    </div>
    <div className={styles.btnRow}>
      <Button variant="ternary" onClick={onClear}>Clear</Button>
      <Button variant="secondary" onClick={onRun} disabled={loading}>Compile & Run</Button>
      <Button variant="primary" onClick={onSubmit} disabled={loading}>Submit Code</Button>
    </div>
    {(runResult || submitResult) && (
      <div className={styles.resultBox}>
        {/* Adjust this render as per your result structure */}
        <pre>{JSON.stringify(runResult || submitResult, null, 2)}</pre>
      </div>
    )}
  </aside>
);

export default CodeEditorSection;
