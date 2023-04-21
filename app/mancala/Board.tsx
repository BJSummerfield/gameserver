import React from 'react';
import Pit from './Pit';
import styles from './page.module.css'
import { GameState, MancalaPits, Rows } from './types'

interface BoardProps {
  pits: number[];
  rows: Rows;
  selectPit: (index:number) => void;
  mancalaPits: MancalaPits;
  totalPits: number;
}

const Board: React.FC<BoardProps> = ({
  pits,
  rows,
  selectPit,
  mancalaPits,
  totalPits
}) => {

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

