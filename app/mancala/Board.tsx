import React, { useState } from 'react';
import Pit from './Pit';
import styles from './page.module.css'

const Board: React.FC = () => {
  const initialPits = Array(14).fill(null).map((_, index) => {
    if (index === 6 || index === 13) {
      return 0; // Mancala pits
    }
    return 4; // Regular pits
  });

  const [pits, setPits] = useState<number[]>(initialPits);

  const handlePitClick = (index: number) => {
    if (pits[index] === 0) return;

    const newPits = [...pits];
    let stones = newPits[index];
    newPits[index] = 0;

    let currentIndex = index;
    while (stones > 0) {
      currentIndex++;
      if (currentIndex > 13) currentIndex = 0;

      // Skip opponent's Mancala pit
      if (currentIndex === 6 && index > 6) continue;
      if (currentIndex === 13 && index < 6) continue;

      newPits[currentIndex]++;
      stones--;
    }

    // Capture opponent's stones
    if (
      currentIndex < 13 &&
      newPits[currentIndex] === 1 &&
      ((index < 6 && currentIndex < 6) || (index > 6 && currentIndex > 6))
    ) {
      const opponentIndex = 12 - currentIndex;
      newPits[currentIndex === 0 ? 13 : 6] += newPits[opponentIndex] + 1;
      newPits[currentIndex] = 0;
      newPits[opponentIndex] = 0;
    }

    // Switch turns if the last stone wasn't placed in the player's Mancala pit
    if (!((index < 6 && currentIndex === 6) || (index > 6 && currentIndex === 13))) {
      const playerPits = newPits.slice(0, 6);
      const opponentPits = newPits.slice(7, 13);

      if (playerPits.every((pit) => pit === 0) || opponentPits.every((pit) => pit === 0)) {
        newPits[6] += playerPits.reduce((sum, pit) => sum + pit, 0);
        newPits[13] += opponentPits.reduce((sum, pit) => sum + pit, 0);
        newPits.fill(0, 0, 6).fill(0, 7, 13);
      } else {
        newPits.reverse(); // Switch turns
      }
    }

    setPits(newPits);
  };

  const topPits = pits.slice(7, 13).reverse();
  const bottomPits = pits.slice(0, 6);

  return (
    <div className={styles.board}>
      <div className={`${styles.mancala} ${styles.mancalaRight}`}>{pits[13]}</div>
      <div className={styles.pitsRow}>{topPits.map((stones, index) => <Pit key={index} index={12 - index} stones={stones} onPitClick={handlePitClick} />)}</div>
      <div className={styles.pitsRow}>{bottomPits.map((stones, index) => <Pit key={index} index={index} stones={stones} onPitClick={handlePitClick} />)}</div>
      <div className={`${styles.mancala} ${styles.mancalaLeft}`}>{pits[6]}</div>
    </div>
  );
};
export default Board;

