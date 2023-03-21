import { SquareValue, GameDifficulty, GameState } from "./types"
import { easyAi, mediumAi, hardAi } from "./ai"

export const calculateNextValue = (squares: SquareValue[]): SquareValue => {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O"
}

export const calculateWinner = (squares: SquareValue[]): GameState => {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a] === "X" ? GameState.PlayerOne : GameState.PlayerTwo;
    }
  }

  if (!squares.includes(null)) {
    return GameState.Tie;
  }

  return GameState.InProgress;
};

export const calculateStatus = (nextValue: SquareValue, winner: GameState) => {
  switch (true) {
    case winner == GameState.Tie:
      return "Cats Game"
    case winner == GameState.PlayerOne || winner == GameState.PlayerTwo:
      return `${winner} Wins!`
    default:
      return `${nextValue}'s Turn...`
  }
}

export const calculateAi = (squares: SquareValue[], difficulty: GameDifficulty): number => {
  switch (difficulty) {
    case GameDifficulty.Easy:
      return easyAi(squares);
    case GameDifficulty.Medium:
      return mediumAi(squares);
    case GameDifficulty.Hard:
      return hardAi(squares);
  }
};


