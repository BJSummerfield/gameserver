import React from 'react';
import styles from './page.module.css';
import { CellValue, TicTacToe } from './TicTacToe';

interface BoardProps {
  game: TicTacToe;
  onCellClick: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({ game, onCellClick }) => {
  const renderCell = (index: number) => {
    const cellValue = game.getCellValue(index);

    return (
      <button className={styles.cell} onClick={() => onCellClick(index)}>
        {cellValue === CellValue.X ? 'X' : cellValue === CellValue.O ? 'O' : ''}
      </button>
    );
  };

  return (
    <div className={styles.board}>
      {[...Array(9)].map((_, index) => (
        <React.Fragment key={index}>{renderCell(index)}</React.Fragment>
      ))}
    </div>
  );
};
