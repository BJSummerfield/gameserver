import { GameState, MancalaPits } from './types';
import {
  checkWinner,
  isValidPit,
  distributeStones,
  handleEmptyPlayerPit,
} from './utils'

const getMaximizingPlayer = (gameState: GameState) => {
  return gameState == GameState.PlayerTwo
}

const evaluateScore = (gameState: GameState, pits: number[], mancalaPits: MancalaPits) => {
  console.log("EVAL: ", gameState, pits[mancalaPits[gameState]] - pits[mancalaPits[1 - gameState]])
  return pits[mancalaPits[gameState]] - pits[mancalaPits[1 - gameState]]
};

const getPossibleMoves = (gameState: GameState, pits: number[], totalPits: number) => {
  return pits
    .map((_, index) => index)
    .filter(index => isValidPit(totalPits, gameState, index) && pits[index] > 0);
};

const makeMove = (index: number, pits: number[], mancalaPits: MancalaPits, gameState: GameState, totalPits: number) => {
  const newPits = [...pits];
  const { newPits: updatedPits, lastIndex } = distributeStones(index, newPits, mancalaPits, gameState, totalPits);
  const { newPits: handledPits, wasEmpty } = handleEmptyPlayerPit(updatedPits, totalPits, lastIndex, mancalaPits, gameState);
  return { handledPits, wasEmpty };
};

export const getNextMove = (
  gameState: GameState,
  pits: number[],
  mancalaPits: MancalaPits,
  totalPits: number,
  depth = 0,
  alpha = -Infinity,
  beta = Infinity
) => {
  const isMaximizingPlayer = getMaximizingPlayer(gameState)
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity
  let bestMove: number | undefined
  const validMoves = getPossibleMoves(gameState, pits, totalPits)

  for (const move of validMoves) {
    const { handledPits: newPits, wasEmpty } = makeMove(move, pits, mancalaPits, gameState, totalPits);
    const score = minimax(gameState, wasEmpty, newPits, totalPits, mancalaPits, depth + 1, alpha, beta);


    if (isMaximizingPlayer ? score > bestScore : score < bestScore) {
      bestScore = score;
      bestMove = move;
    }

    if (isMaximizingPlayer) {
      alpha = Math.max(alpha, bestScore);
    } else {
      beta = Math.min(beta, bestScore);
    }

    console.log(pits, newPits, bestScore, bestMove, depth, alpha, beta)
    if (alpha >= beta) {
      break;
    }
  }
  return [bestMove as number, bestScore];
}

const minimax = (gameState: GameState, wasEmpty: boolean, pits: number[], totalPits: number, mancalaPits: MancalaPits, depth: number, alpha: number, beta: number) => {
  const maxDepth = 16
  console.log(checkWinner(pits, totalPits, gameState))
  if (depth === maxDepth || checkWinner(pits, totalPits, gameState) !== null) {
    return evaluateScore(gameState, pits, mancalaPits);
  }
  const nextState = wasEmpty ? gameState : 1 - gameState
  const [, bestScore] = getNextMove(nextState, pits, mancalaPits, totalPits, depth, alpha, beta)
  return bestScore
}




