'use client'
import React, { useState } from 'react';
import styles from './page.module.css';
import { TicTacToe } from './TicTacToe';
import { Board } from './Board';

function App() {
  const [game, setGame] = useState(new TicTacToe());

  const handleCellClick = (index: number) => {
    const newGame = game.makeMove(index);
    console.log(newGame, game)
    if (newGame) {
      setGame(newGame);
    }
  };

  return (
    <div className={styles.App}>
      <h1>Tic Tac Toe</h1>
      <Board game={game} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
