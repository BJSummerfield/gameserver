'use client'
import { useTicTacToe } from './useTicTacToe'
import styles from "./page.module.css"
import { GameState } from './types';

export default function TicTacToe() {
  const {
    showSettings,
    setShowSettings,
    twoPlayers,
    setTwoPlayers,
    squares,
    difficulty,
    gameState,
    status,
    setSquare,
    resetSquares,
    changeDifficulty,
    gameLoop,
  } = useTicTacToe();

  gameLoop()

  const renderSquare = (square: string | null, index: number) => {
    return (
      <button
        key={index}
        onClick={() => { setSquare(index) }}
      >
        {square}
      </button >
    )
  }

  return (
    <div className={styles.container} data-testid="container">
      <div className={styles.column}>
        <div className={styles.status} data-testid="status">{status}</div>
        <div className={styles.board} data-testid="board">
          {squares.map((square, index) => {
            return renderSquare(square, index)
          })}
        </div>
        <div className={styles.column}>
          <button
            className={styles.settings}
            onClick={() => setShowSettings(!showSettings)}
            data-testid="settings-button"
          >
            Settings
          </button>
          {
            showSettings &&
            <button
              className={styles.players}
              onClick={() => setTwoPlayers(!twoPlayers)}
              data-testid="players-button"
            >
              Players: {+twoPlayers + 1}
            </button>
          }{
            showSettings && !twoPlayers &&
            <button
              className={styles.difficulty}
              onClick={() => changeDifficulty()}
              data-testid="difficulty-button"
            >
              Difficulty: {difficulty}
            </button>
          }
          {gameState != GameState.InProgress &&
            <button
              className={styles.reset}
              onClick={() => resetSquares()}
              data-testid="reset-button"
            >
              Reset Game
            </button>}
        </div>
      </div>
    </div>
  )
}
