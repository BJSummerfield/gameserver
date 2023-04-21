import React from 'react';
import Pit from './Pit';
import { useMancala } from './useMancala'
import styles from './page.module.css'
import { GameState } from './types'

const Board: React.FC = () => {
 const {
    mancalaPits,
    rows,
    pits,
    gameState,
    selectPit,
    totalPits,
  } = useMancala()

  const handlePitClick = (index: number) => {
    selectPit(index) 
  };
  return (
    <div className={styles.board}>
      <div className={`${styles.mancala} ${styles.mancalaLeft}`}>{pits[mancalaPits[GameState.PlayerTwo]]}</div>
      <div className={styles.pitsContainer}>
        <div className={styles.pitsRow}>
          {rows[GameState.PlayerTwo].map((stones, index) => (
            <Pit key={index} index={totalPits * 2 - index} stones={stones} onPitClick={handlePitClick} mancalaPits={mancalaPits} />
          ))}
        </div>
        <div className={styles.pitsRow}>
          {rows[GameState.PlayerOne].map((stones, index) => (
            <Pit key={index} index={index} stones={stones} onPitClick={handlePitClick} mancalaPits={mancalaPits} />
          ))}
        </div>
      </div>
      <div className={`${styles.mancala} ${styles.mancalaRight}`}>{pits[mancalaPits[GameState.PlayerOne]]}</div>
    </div>
  );
};
export default Board;

