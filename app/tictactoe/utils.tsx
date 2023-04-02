import { SquareValue, GameDifficulty, GameState } from "./types"
import { easyAi, mediumAi, hardAi } from "./ai"

export const getNextValue = (squares: SquareValue[]): SquareValue => {
  return squares.filter(Boolean).length % 2 === 0 ? GameState.PlayerOne : GameState.PlayerTwo
}

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

export const getGameState = (squares: SquareValue[]): GameState => {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a] === GameState.PlayerOne ? GameState.PlayerOne : GameState.PlayerTwo;
    }
  }

  if (!squares.includes(null)) {
    return GameState.Tie;
  }

  return GameState.InProgress;
};

interface Status<T extends GameState> {
  (nextValue: SquareValue, gameState: T): string;
}

export const getStatus: Status<GameState> = (nextValue, gameState) => {
  return gameStateMessages[gameState](gameState, nextValue);
};

const gameStateMessages: Record<GameState, (gameState: GameState, nextValue: SquareValue) => string> = {
  [GameState.Tie]: () => 'Cats Game',
  [GameState.PlayerOne]: (gameState) => `${gameState} Wins!`,
  [GameState.PlayerTwo]: (gameState) => `${gameState} Wins!`,
  [GameState.InProgress]: (_, nextValue) => `${nextValue}'s Turn...`,
};

interface AiMove<T extends GameDifficulty> {
  (squares: SquareValue[], difficulty: T): number;
}

const aiMoveFunctions: Record<GameDifficulty, (squares: SquareValue[]) => number> = {
  [GameDifficulty.Easy]: easyAi,
  [GameDifficulty.Medium]: mediumAi,
  [GameDifficulty.Hard]: hardAi,
};

export const getAiMove: AiMove<GameDifficulty> = (squares, difficulty) => {
  return aiMoveFunctions[difficulty](squares);
};


