import React from 'react';
import styles from './RecentGamesTable.module.css';

const RecentGamesTable = ({ games }) => {
  if (!games || games.length === 0) {
    return (
      <div className={styles.noGames}>
        <p>No recent games found</p>
      </div>
    );
  }

  return (
    <div className={styles.gamesTable}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>🎮 Recent Games</h3>
      </div>
      
      <div className={styles.tableContent}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Result</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={index}>
                <td>{game.date}</td>
                <td>{game.opponent}</td>
                <td>
                  <span className={`${styles.resultBadge} ${
                    game.result === 'Win' ? styles.win : styles.loss
                  }`}>
                    {game.result}
                  </span>
                </td>
                <td>{game.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentGamesTable;