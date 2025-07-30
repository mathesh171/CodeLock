import React from "react";
import styles from "./QuestionNumberSection.module.css";

const statusColors = {
  answered: '#22c55e',
  skipped: '#ef4444',
  unseen: '#cbd5e1'
};

const QuestionNumberSection = ({ questions, curIdx, statusMap, onSelect }) => {
  const answeredCount = Object.values(statusMap).filter(s => s === 'answered').length;
  const skippedCount = Object.values(statusMap).filter(s => s === 'skipped').length;
  const notViewedCount = Object.values(statusMap).filter(s => s === 'unseen').length;

  return (
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
          <div className={styles.legendLabel}>
            <span className={styles.dot} style={{ background: statusColors.answered }} aria-hidden="true" />
            <span>Answered</span>
          </div>
          <span className={styles.count}>{answeredCount}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendLabel}>
            <span className={styles.dot} style={{ background: statusColors.skipped }} aria-hidden="true" />
            <span>Skipped</span>
          </div>
          <span className={styles.count}>{skippedCount}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendLabel}>
            <span className={styles.dot} style={{ background: statusColors.unseen }} aria-hidden="true" />
            <span>Not Viewed</span>
          </div>
          <span className={styles.count}>{notViewedCount}</span>
        </div>
      </div>
    </aside>
  );
};

export default QuestionNumberSection;
