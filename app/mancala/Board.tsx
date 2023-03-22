import React, { useState } from 'react';
import Pit from './Pit';
import { initialPits } from './utils';
import styles from './page.module.css'

enum GameState {
  PlayerOne = 0,
  PlayerTwo = 1,
  InProgress = 2,
}




const Board: React.FC = () => {
  const [activePlayer, setActivePlayer] = useState<number>(GameState.PlayerOne)
  const [pits, setPits] = useState<number[]>(initialPits);

  console.log(activePlayer)
  const handlePitClick = (index: number) => {
    const isPlayerOne = activePlayer === GameState.PlayerOne
    if (isPlayerOne ? index > 5 : index < 6) return
    
    const newPits = [...pits];
    let stones = newPits[index];
    newPits[index] = 0;

    let currentIndex = index;
    while (stones > 0) {
      currentIndex++;
      if (currentIndex > 13) currentIndex = 0;

      // Skip opponent's Mancala pit
      if (isPlayerOne ? currentIndex !== 13 : currentIndex !== 6) {
        newPits[currentIndex]++;
        stones--;
      }
      
    }

    // Capture opponent's stones

    if (
      newPits[currentIndex] === 1 &&
      (isPlayerOne ? currentIndex < 5 : currentIndex > 6)
    ) {
      const opponentIndex = isPlayerOne ? 12 - currentIndex : currentIndex - 12;
      // newPits[currentIndex === 0 ? 13 : 6] += newPits[opponentIndex] + 1;
      const currentPlayerMancala = isPlayerOne ? 6 : 13
      newPits[currentPlayerMancala] += (newPits[currentIndex] + newPits[opponentIndex])
      newPits[currentIndex] = 0;
      newPits[opponentIndex] = 0;
    }

    // Switch turns if the last stone wasn't placed in the player's Mancala pit
    // if (!((index < 6 && currentIndex === 6) || (index > 6 && currentIndex === 13))) {
    //   const playerPits = newPits.slice(0, 6);
    //   const opponentPits = newPits.slice(7, 13);

    //   if (playerPits.every((pit) => pit === 0) || opponentPits.every((pit) => pit === 0)) {
    //     newPits[6] += playerPits.reduce((sum, pit) => sum + pit, 0);
    //     newPits[13] += opponentPits.reduce((sum, pit) => sum + pit, 0);
    //     newPits.fill(0, 0, 6).fill(0, 7, 13);
    //   } else {
    //     // newPits.reverse(); // Switch turns
    //   }
    // }
    setActivePlayer(1 - activePlayer)
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

