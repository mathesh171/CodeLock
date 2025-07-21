// src/components/QuestionSection/QuestionSection.jsx
import React from "react";
import styles from "./QuestionSection.module.css";

const Section = ({ title, children }) => (
  <section>
    <div className={styles.heading}>{title}</div>
    <div className={styles.sectionBody}>{children}</div>
  </section>
);

const QuestionSection = ({ question }) => {
  if (!question) return <div className={styles.loading}>Loading question…</div>;

  return (
    <div className={styles.box}>
      <div className={styles.title}>{question.title || "Untitled Question"}</div>
      <Section title={<u>Problem Statement</u>}>
        {question.description}
      </Section>
      <Section title={<b>Input Format</b>}>
        {question.input_format}
      </Section>
      <Section title={<b>Output Format</b>}>
        {question.output_format}
      </Section>
      {/* Optionally: constraints, examples, etc */}
    </div>
  );
};

export default QuestionSection;
