import { useState } from "react";
import {
  calculateAi,
  calculateWinner,
  calculateNextValue,
  calculateStatus,
} from "./utils";
import { SquareValue, GameDifficulty, GameState } from "./types"

export const useTicTacToe = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [twoPlayers, setTwoPlayers] = useState(false);
  const [squares, setSquares] = useState<Array<SquareValue>>(Array(9).fill(null));
  const [difficulty, setDifficulty] = useState<GameDifficulty>(GameDifficulty.Easy);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(nextValue, winner);

  const setSquare = (index: number) => {
    if (!squares[index] && winner == GameState.InProgress ) {
      const squaresCopy = [...squares];
      squaresCopy[index] = nextValue;
      setSquares(squaresCopy);
    }
  };

  const gameLoop = () => {
    if (!twoPlayers && nextValue === "O" && winner == GameState.InProgress) {
      const index = calculateAi([...squares], difficulty);
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
    winner,
    status,
    setSquare,
    gameLoop,
  };
};
