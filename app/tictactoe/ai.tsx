import { SquareValue, GameScore, GameState } from "./types"; 
import { calculateWinner, calculateNextValue } from "./utils";

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
  const randomMoveProbability = 0.35; // 35% chance to make a random move

  if (Math.random() < randomMoveProbability) {
    return easyAi(squares)
  }
  return hardAi(squares);
};

export const hardAi = (
  squares: SquareValue[],
  firstLoop = true,
  depth = 0,
  alpha = -Infinity,
  beta = Infinity,
): number => {
  const value = calculateNextValue(squares);
  const isX = value === "X";
  let bestScore = isX ? -Infinity : Infinity;
  let bestMove: number | undefined;

 const gameStatus = calculateWinner(squares);
  if (gameStatus != GameState.InProgress) {
    return getScore(gameStatus, depth);
  }

  for (let index = 0; index < squares.length; index++) {
    const square = squares[index];
    if (!square) {
      squares[index] = value;

      let score = hardAi(squares, false, depth + 1, alpha, beta);

      squares[index] = null;

      const scoringAction = isX ? score > bestScore : score < bestScore;

      if (scoringAction) {
        bestScore = score;
        bestMove = index;
      }

      isX ?
        alpha = Math.max(alpha, bestScore) :
        beta = Math.min(beta, bestScore);

      if (alpha >= beta) {
        break;
      }
    }
  }

  return firstLoop ? bestMove as number : bestScore;
};

const getScore = (gameStatus: GameState, depth: number): number => {
  switch (gameStatus) {
    case GameState.PlayerOne:
      return GameScore.PlayerOne / depth;
    case GameState.PlayerTwo:
      return GameScore.PlayerTwo / depth;
    case GameState.Tie:
      return GameScore.Tie;
    default:
      throw new Error(`Invalid game status: ${gameStatus}`);
  }
};
