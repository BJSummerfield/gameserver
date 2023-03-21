'use client'
import { useTicTacToe } from './useTicTacToe'
import styles from "./page.module.css"
import { GameDifficulty, GameState } from './types';

export default function Home() {
  const {
    showSettings,
    setShowSettings,
    twoPlayers,
    setTwoPlayers,
    squares,
    setSquares,
    difficulty,
    setDifficulty,
    winner,
    status,
    setSquare,
    gameLoop,
  } = useTicTacToe();

  gameLoop()

  const renderSquare = (square: string | null, index: number) => {
    return <button key={index} onClick={() => { setSquare(index) }}>{square}</button >
  }

  const resetSquares = () => {
    setSquares(Array(9).fill(null))
  }

  const changeDifficulty = () => {
    switch (difficulty) {
      case GameDifficulty.Easy:
        setDifficulty(GameDifficulty.Medium)
        break;
      case GameDifficulty.Medium:
        setDifficulty(GameDifficulty.Hard)
        break;
      default:
        setDifficulty(GameDifficulty.Easy)
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.status}>{status}</div>
        <div className={styles.board}>
          {squares.map((square, index) => {
            return renderSquare(square, index)
          })}
        </div>
        <div className={styles.column}>
          <button className={styles.settings} onClick={() => setShowSettings(!showSettings)}>Settings</button>
          {
            showSettings &&
            <button className={styles.players} onClick={() => setTwoPlayers(!twoPlayers)}>Players: {+twoPlayers + 1}</button>
          }{
            showSettings && !twoPlayers &&
            < button className={styles.difficulty} onClick={() => changeDifficulty()}>Difficulty: {difficulty}</button>
          }
          {winner != GameState.InProgress && <button className={styles.reset} onClick={() => resetSquares()}>Reset Game</button>}
        </div>
      </div>
    </div>
  )
}
