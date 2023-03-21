import { SquareValue, GameScore, GameState } from "./types";
import { getGameState, getNextValue } from "./utils";

export const easyAi = (squares: SquareValue[]): number => {
  let availableMoves: number[] = [];
  squares.forEach((square, index) => {
    if (!square) {
      availableMoves.push(index);
    }
  });
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

export const mediumAi = (
  squares: SquareValue[],
): number => {
  const easyAiProbability = 0.35; // 35% chance to make a random move

  if (Math.random() < easyAiProbability) {
    return easyAi(squares)
  }
  return hardAi(squares);
};

export const hardAi = (squares: SquareValue[]): number => {
  const maximizingPlayer = getNextValue(squares) === GameState.PlayerOne;
  const [bestMove] = getNextMove(squares, maximizingPlayer, 0, -Infinity, Infinity);
  return bestMove;
};

const getNextMove = (
  squares: SquareValue[],
  maximizingPlayer: boolean,
  depth: number,
  alpha: number,
  beta: number,
): [number, number] => {
  let bestScore = maximizingPlayer ? -Infinity : Infinity;
  let bestMove: number | undefined;

  for (let index = 0; index < squares.length; index++) {
    const square = squares[index];
    if (!square) {
      squares[index] = maximizingPlayer ? GameState.PlayerOne : GameState.PlayerTwo;
      const score = minimax(squares, !maximizingPlayer, depth + 1, alpha, beta);
      squares[index] = null;

      if (maximizingPlayer ? score > bestScore : score < bestScore) {
        bestScore = score;
        bestMove = index;
      }

      if (maximizingPlayer) {
        alpha = Math.max(alpha, bestScore);
      } else {
        beta = Math.min(beta, bestScore);
      }

      if (alpha >= beta) {
        break;
      }
    }
  }

  return [bestMove as number, bestScore];
};

const minimax = (
  squares: SquareValue[],
  maximizingPlayer: boolean,
  depth: number,
  alpha: number,
  beta: number,
): number => {
  const gameState = getGameState(squares);
  if (gameState !== GameState.InProgress) {
    return getScore(gameState, depth);
  }

  const [, bestScore] = getNextMove(squares, maximizingPlayer, depth, alpha, beta);
  return bestScore;
};

const getScore = (gameState: GameState, depth: number): number => {
  switch (gameState) {
    case GameState.PlayerOne:
      return GameScore.PlayerOne / depth;
    case GameState.PlayerTwo:
      return GameScore.PlayerTwo / depth;
    case GameState.Tie:
      return GameScore.Tie;
    default:
      throw new Error(`Invalid game status: ${gameState}`);
  }
};
