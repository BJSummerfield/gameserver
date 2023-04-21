import React from 'react';
import styles from './page.module.css'
import { GameState, MancalaPits } from './types';

interface PitProps {
  index: number;
  stones: number;
  mancalaPits: MancalaPits;
  onPitClick: (index: number) => void;
}

const Pit: React.FC<PitProps> = ({ index, stones, mancalaPits, onPitClick }) => {
  const isMancala = index == mancalaPits[GameState.PlayerOne]  || index == mancalaPits[GameState.PlayerTwo];

  const handleClick = () => {
    if (!isMancala) {
      onPitClick(index);
    }
  };

  return (
    <div className={`${styles.pit} ${isMancala ? styles.mancala : ''}`} onClick={handleClick}>
      <div className="stones">{stones}</div>
    </div>
  );
};

export default Pit;

