// src/components/QuestionSection/QuestionSection.jsx
import React from 'react';
import styles from './QuestionSection.module.css';

const QuestionSection = ({ questionData }) => {
  if (!questionData) {
    return (
      <section className={styles.container} aria-live="polite" aria-busy="true">
        <p>Loading question...</p>
      </section>
    );
  }

  const { title, problemStatement, inputFormat, outputFormat, testcases } = questionData;

  // Extract first two testcases for open testcases (if any)
  const openInput = testcases && testcases.length > 0 ? testcases[0]?.input : null;
  const openInput2 = testcases && testcases.length > 1 ? testcases[1]?.input : null;
  const openOutput = testcases && testcases.length > 0 ? testcases[0]?.output : null;
  const openOutput2 = testcases && testcases.length > 1 ? testcases[1]?.output : null;

  // Function to render format block if any testcases are present else no heading
  const renderInputFormat = () => {
    if (!testcases || testcases.length === 0) return null;
    if (!openInput && !openInput2) return null;

    return (
      <>
        <h3 className={styles.subHeading}>Input Format</h3>
        {openInput && <pre className={styles.codeBlock}>{openInput}</pre>}
        {openInput2 && <pre className={styles.codeBlock}>{openInput2}</pre>}
      </>
    );
  };

  const renderOutputFormat = () => {
    if (!testcases || testcases.length === 0) return null;
    if (!openOutput && !openOutput2) return null;

    return (
      <>
        <h3 className={styles.subHeading}>Output Format</h3>
        {openOutput && <pre className={styles.codeBlock}>{openOutput}</pre>}
        {openOutput2 && <pre className={styles.codeBlock}>{openOutput2}</pre>}
      </>
    );
  };

  return (
    <section className={styles.container} aria-label="Problem description and details">
      <h2 className={styles.title}>{title || "Question"}</h2>

      <article className={styles.problemStatement}>
        <h3 className={styles.subHeading}>Problem Statement</h3>
        <p>{problemStatement || "No problem statement provided."}</p>
      </article>

      {renderInputFormat()}
      {renderOutputFormat()}
    </section>
  );
};

export default QuestionSection;
