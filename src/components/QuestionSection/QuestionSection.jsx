import React from 'react';
import styles from './QuestionSection.module.css';

const parseTestcases = (testcases) => {
  try {
    if (!testcases) return [];
    if (typeof testcases === "string") {
      const tcObj = JSON.parse(testcases);
      const keys = Object.keys(tcObj).filter(k => k.startsWith('test'));
      return keys.map(k => ({
        input: tcObj[k]?.input,
        output: tcObj[k]?.output
      }));
    }
    return [];
  } catch {
    return [];
  }
};

const QuestionSection = ({ questionData }) => {
  if (!questionData || !questionData.questions_id) {
    return (
      <section className={styles.container} aria-live="polite" aria-busy="true">
        <p>Loading question...</p>
      </section>
    );
  }
  const q = questionData.questions_id;
  const { title, description, testcases } = q;
  const parsed = parseTestcases(testcases);
  return (
    <section className={styles.container} aria-label="Problem description and details">
      <h2 className={styles.title}>{title || "Question"}</h2>
      <article className={styles.problemStatement}>
        <h3 className={styles.subHeading}>Problem Statement</h3>
        <p>{description || "No problem statement provided."}</p>
      </article>
      {parsed.length > 0 && (
        <div className={styles.inputOutput}>
          <h3 className={styles.subHeading}>Sample Input</h3>
          {parsed.slice(0, 2).map((tc, idx) =>
            <div key={'inp'+idx}>
              <p className={styles.sampleLabel}>Input {idx + 1}</p>
              <pre className={styles.codeBlock}>{tc.input}</pre>
            </div>
          )}
          <h3 className={styles.subHeading}>Sample Output</h3>
          {parsed.slice(0, 2).map((tc, idx) =>
            <div key={'out'+idx}>
              <p className={styles.sampleLabel}>Output {idx + 1}</p>
              <pre className={styles.codeBlock}>{tc.output}</pre>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default QuestionSection;
