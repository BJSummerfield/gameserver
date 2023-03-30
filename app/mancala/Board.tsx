import React, { useState } from 'react';
import Pit from './Pit';
import { initialPits } from './utils';
import styles from './page.module.css'
import { GameState } from './types'

const Board: React.FC = () => {
  const [activePlayer, setActivePlayer] = useState<number>(GameState.PlayerOne)
  const [pits, setPits] = useState<number[]>(initialPits);

  const distributeStones = (pits: number[], index: number, isPlayerOne: boolean) => {
    let stones = pits[index];
    pits[index] = 0;

    let currentIndex = index;
    while (stones > 0) {
      currentIndex++;
      if (currentIndex > 13) currentIndex = 0;

      // Skip opponent's Mancala pit
      if (isPlayerOne ? currentIndex !== 13 : currentIndex !== 6) {
        pits[currentIndex]++;
        stones--;
      }
    }

    return currentIndex;
  };

  const isPlayersPit = (index: number, isPlayerOne: boolean) => {
    return isPlayerOne ? index < 5 : index > 6
  }

  const captureOpponentStones = (
    pits: number[],
    lastIndex: number,
    currentPlayerMancala: number,
    isPlayerOne: boolean
  ) => {
    if (pits[lastIndex] === 1 && isPlayersPit(lastIndex, isPlayerOne)) {
      const opponentIndex = isPlayerOne ? 12 - lastIndex : lastIndex - 12;
      pits[currentPlayerMancala] += pits[lastIndex] + pits[opponentIndex];
      pits[lastIndex] = 0;
      pits[opponentIndex] = 0;
    }
  };

  const handlePitClick = (index: number) => {
    const isPlayerOne = activePlayer === GameState.PlayerOne;
    if (!isPlayersPit(index, isPlayerOne)) return;

    const currentPlayerMancala = isPlayerOne ? 6 : 13;

    const newPits = [...pits];

    const lastIndex = distributeStones(newPits, index, isPlayerOne);
    captureOpponentStones(newPits, lastIndex, currentPlayerMancala, isPlayerOne);

    if (lastIndex !== currentPlayerMancala) {
      setActivePlayer(1 - activePlayer);
    }
    setPits(newPits);
  };


  const topPits = pits.slice(7, 13).reverse();
  const bottomPits = pits.slice(0, 6);
  return (
    <div className={styles.board}>
      <div className={`${styles.mancala} ${styles.mancalaLeft}`}>{pits[13]}</div>
      <div className={styles.pitsContainer}>
        <div className={styles.pitsRow}>
          {topPits.map((stones, index) => (
            <Pit key={index} index={12 - index} stones={stones} onPitClick={handlePitClick} />
          ))}
        </div>
        <div className={styles.pitsRow}>
          {bottomPits.map((stones, index) => (
            <Pit key={index} index={index} stones={stones} onPitClick={handlePitClick} />
          ))}
        </div>
      </div>
      <div className={`${styles.mancala} ${styles.mancalaRight}`}>{pits[6]}</div>
    </div>
  );
};
export default Board;

