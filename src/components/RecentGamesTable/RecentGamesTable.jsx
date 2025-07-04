import React from 'react';
import styles from './RecentGamesTable.module.css';

const RecentGamesTable = ({ games }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>Recent Games</h3>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Opponent</th>
              <th className={styles.th}>Result</th>
              <th className={styles.th}>Score</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {games.map((game, index) => (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>{game.date}</td>
                <td className={styles.td}>{game.opponent}</td>
                <td className={`${styles.td} ${game.result === 'Win' ? styles.win : styles.loss}`}>
                  {game.result}
                </td>
                <td className={styles.td}>{game.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentGamesTable;