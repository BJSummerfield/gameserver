import { SquareValue, GameDifficulty, GameState } from "./types"
import { easyAi, mediumAi, hardAi } from "./ai"

export const getNextValue = (squares: SquareValue[]): SquareValue => {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O"
}

export const getGameState = (squares: SquareValue[]): GameState => {
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

export const getStatus = (nextValue: SquareValue, gameState: GameState) => {
  switch (true) {
    case gameState == GameState.Tie:
      return "Cats Game"
    case gameState == GameState.PlayerOne || gameState == GameState.PlayerTwo:
      return `${gameState} Wins!`
    default:
      return `${nextValue}'s Turn...`
  }
}

export const getAiMove = (squares: SquareValue[], difficulty: GameDifficulty): number => {
  switch (difficulty) {
    case GameDifficulty.Easy:
      return easyAi(squares);
    case GameDifficulty.Medium:
      return mediumAi(squares);
    case GameDifficulty.Hard:
      return hardAi(squares);
  }
};


