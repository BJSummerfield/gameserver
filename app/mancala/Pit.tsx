import React from 'react';
import styles from './page.module.css'

interface PitProps {
  index: number;
  stones: number;
  onPitClick: (index: number) => void;
}

const Pit: React.FC<PitProps> = ({ index, stones, onPitClick }) => {
  const isMancala = index === 6 || index === 13;

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

