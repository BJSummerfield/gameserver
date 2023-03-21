import { useState } from "react";
import {
  getAiMove,
  getGameState,
  getNextValue,
  getStatus,
} from "./utils";
import { SquareValue, GameDifficulty, GameState } from "./types"

export const useTicTacToe = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [twoPlayers, setTwoPlayers] = useState(false);
  const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null));
  const [difficulty, setDifficulty] = useState<GameDifficulty>(GameDifficulty.Easy);

  const nextValue = getNextValue(squares);
  const gameState = getGameState(squares);
  const status = getStatus(nextValue, gameState);

  const setSquare = (index: number) => {
    if (!squares[index] && gameState == GameState.InProgress) {
      const squaresCopy = [...squares];
      squaresCopy[index] = nextValue;
      setSquares(squaresCopy);
    }
  };

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

  const gameLoop = () => {
    if (!twoPlayers && nextValue === "O" && gameState == GameState.InProgress) {
      const index = getAiMove([...squares], difficulty);
      setSquare(index);
    }
  };

  return {
    showSettings,
    setShowSettings,
    twoPlayers,
    setTwoPlayers,
    squares,
    setSquares,
    difficulty,
    setDifficulty,
    nextValue,
    gameState,
    status,
    setSquare,
    resetSquares,
    changeDifficulty,
    gameLoop,
  };
};
