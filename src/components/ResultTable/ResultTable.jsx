import React from 'react';
import styles from './ResultTable.module.css';
import { Link } from 'react-router-dom';

const ResultTable = ({ results, currentUser }) => {
  let winnerName = '';
  if (results.length > 0) {
    const sorted = [...results].sort((a, b) => b.totalScore - a.totalScore);
    const winner = sorted[0];
    winnerName = winner?.user?.username || '';
  }

  return (
    <div className={styles.resultCard}>
      <h1 className={styles.headingResult}>RESULT🏆</h1>
      {results.length > 0 && (
        <>
          {currentUser === winnerName ? (
            <div className={styles.winnerBanner}>
              Winner: {winnerName}
            </div>
          ) : (
            <div className={styles.loserBanner}>
              Loser: {currentUser} | Winner: {winnerName}
            </div>
          )}
        </>
      )}
      <div className={styles.tableWrapper}>
        <h2 className={styles.tableTitle}>Competition Results</h2>
        <table className={styles.resultTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {results
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((result, idx) => (
                <tr key={result.user.id} className={result.winner ? styles.winnerRow : ""}>
                  <td>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </td>
                  <td className={result.user.username === currentUser ? styles.boldCell : ""}>
                    {result.user.username}
                  </td>
                  <td>{result.totalScore}</td>
                  <td>
                    {result.winner ? '🏆 Winner' : '—'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={styles.actionLinks}>
        <Link to="/dashboard" className={styles.dashboardBtn}>
          View Dashboard
        </Link>
        <Link to="/" className={styles.newGameBtn}>
          New Game
        </Link>
      </div>
    </div>
  );
};

export default ResultTable;
