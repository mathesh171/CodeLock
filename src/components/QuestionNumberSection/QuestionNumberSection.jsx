import React from "react";
import styles from "./QuestionNumberSection.module.css";

const statusColors = {
  answered: '#22c55e',    
  bookmarked: '#f59e42',  
  skipped: '#ef4444',     
  unseen: '#cbd5e1'       
};

const QuestionNumberSection = ({ questions, curIdx, statusMap, onSelect, notViewedCount = 0, savedInServerCount = 0 }) => (
  <aside className={styles.sidebar} aria-label="Question Number Navigation">
    <div className={styles.numbersList}>
      {questions.map((q, idx) => (
        <button
          key={String(q.questions_id?.id || idx)}
          onClick={() => onSelect(idx)}
          className={`${styles.numberBtn} ${curIdx === idx ? styles.selected : ""}`}
          aria-label={`Go to Question ${idx + 1}, status: ${statusMap[idx] || 'Not viewed'}`}
          aria-current={curIdx === idx ? 'page' : undefined}
          type="button"
        >
          <span
            className={styles.statusDot}
            style={{ backgroundColor: statusColors[statusMap[idx] || 'unseen'] }}
            aria-hidden="true"
          />
          {idx + 1}
        </button>
      ))}
    </div>
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <span className={styles.dot} style={{ background: statusColors.answered }} aria-hidden="true" />Answered
      </div>
      <div className={styles.legendItem}>
        <span className={styles.dot} style={{ background: statusColors.bookmarked }} aria-hidden="true" />Bookmarked
      </div>
      <div className={styles.legendItem}>
        <span className={styles.dot} style={{ background: statusColors.skipped }} aria-hidden="true" />Skipped
      </div>
      <div className={styles.legendItem}>
        <span className={styles.dot} style={{ background: statusColors.unseen }} aria-hidden="true" />Not Viewed
        <span className={styles.count}>({notViewedCount})</span>
      </div>
      <div className={styles.legendItem}>
        <span className={styles.savedText}>Saved in Server ({savedInServerCount})</span>
      </div>
    </div>
  </aside>
);

export default QuestionNumberSection;
