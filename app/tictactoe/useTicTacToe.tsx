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

  const difficultyTransitions = {
    [GameDifficulty.Easy]: GameDifficulty.Medium,
    [GameDifficulty.Medium]: GameDifficulty.Hard,
    [GameDifficulty.Hard]: GameDifficulty.Easy,
  };

  const changeDifficulty = () => {
    setDifficulty(difficultyTransitions[difficulty] || GameDifficulty.Easy);
  };

  const gameLoop = () => {
    if (!twoPlayers && nextValue === GameState.PlayerTwo && gameState == GameState.InProgress) {
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
