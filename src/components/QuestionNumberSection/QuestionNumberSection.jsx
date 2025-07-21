// src/components/QuestionNumberSection/QuestionNumberSection.jsx
import React from "react";
import styles from "./QuestionNumberSection.module.css";

const statusColors = {
  answered: '#22c55e',
  bookmarked: '#f59e42',
  skipped: '#ef4444',
  unseen: '#cbd5e1'
};

const QuestionNumberSection = ({ questions, curIdx, statusMap, onSelect }) => (
  <aside className={styles.sidebar}>
    <div className={styles.numbersList}>
      {questions.map((q, idx) => (
        <button
          key={String(q.questions_id?.id || idx)}
          onClick={() => onSelect(idx)}
          className={`${styles.numberBtn} ${curIdx === idx ? styles.selected : ""}`}
          aria-label={`Go to Question ${idx + 1}`}
        >
          <span
            className={styles.statusDot}
            style={{ backgroundColor: statusColors[statusMap[idx] || 'unseen'] }}
          />
          {idx + 1}
        </button>
      ))}
    </div>
    <div className={styles.legend}>
      <div className={styles.legendItem}><span className={styles.dot} style={{ background: statusColors.answered }} />Answered</div>
      <div className={styles.legendItem}><span className={styles.dot} style={{ background: statusColors.bookmarked }} />Bookmarked</div>
      <div className={styles.legendItem}><span className={styles.dot} style={{ background: statusColors.skipped }} />Skipped</div>
      <div className={styles.legendItem}><span className={styles.dot} style={{ background: statusColors.unseen }} />Not Viewed</div>
      <div className={styles.legendItem}><span className={styles.savedText}>Saved in Server</span></div>
    </div>
  </aside>
);

export default QuestionNumberSection;
