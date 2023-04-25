import { GameState, MancalaPits } from './types';
import {
  checkWinner,
  isValidPit,
  distributeStones,
  handleEmptyPlayerPit,
} from './utils'

const minimax = (depth: number, maxDepth: number, gameState: GameState, pits: number[], mancalaPits: MancalaPits, totalPits: number, isMaximizingPlayer: boolean) => {
  // Base case: Check for game over or reached maximum depth
  if (depth === maxDepth || checkWinner(pits, totalPits, gameState)) {
    return evaluateScore(gameState, pits, mancalaPits);
  }

  const validMoves = getPossibleMoves(gameState, pits, totalPits);
  if (isMaximizingPlayer) {
    let bestValue = -Infinity;

    for (const move of validMoves) {
      const newPits = makeMove(move, pits, mancalaPits, gameState, totalPits);
      const currentValue = minimax(depth + 1, maxDepth, 1 - gameState, newPits, mancalaPits, totalPits, false);
      bestValue = Math.max(bestValue, currentValue);
    }

    return bestValue;
  } else {
    let bestValue = Infinity;

    for (const move of validMoves) {
      const newPits = makeMove(move, pits, mancalaPits, gameState, totalPits);
      const currentValue = minimax(depth + 1, maxDepth, 1 - gameState, newPits, mancalaPits, totalPits, true);
      bestValue = Math.min(bestValue, currentValue);
    }

    return bestValue;
  }
};

const evaluateScore = (gameState: GameState, pits: number[], mancalaPits: MancalaPits) => {
  const score = pits[mancalaPits[gameState]] - pits[mancalaPits[1 - gameState]];
  return score;
};

const getPossibleMoves = (gameState: GameState, pits: number[], totalPits: number) => {
  return pits
    .map((_, index) => index)
    .filter(index => isValidPit(totalPits, gameState, index) && pits[index] > 0);
};

const makeMove = (index: number, pits: number[], mancalaPits: MancalaPits, gameState: GameState, totalPits: number) => {
  const newPits = [...pits];
  const { newPits: updatedPits, lastIndex} = distributeStones(index, newPits, mancalaPits, gameState, totalPits);
  const handledPits = handleEmptyPlayerPit(updatedPits, totalPits, lastIndex, mancalaPits, gameState);
  return handledPits;
};

export const findBestMove = (gameState: GameState, pits: number[], mancalaPits: MancalaPits, totalPits: number, maxDepth = 15) => {
  const validMoves = getPossibleMoves(gameState, pits, totalPits);
  let bestValue = -Infinity;
  let bestMove = -1;

  for (const move of validMoves) {
    const newPits = makeMove(move, pits, mancalaPits, gameState, totalPits);
    const currentValue = minimax(0, maxDepth, 1 - gameState, newPits, mancalaPits, totalPits, false);
    if (currentValue > bestValue) {
      bestValue = currentValue;
      bestMove = move;
    }
  }

  return bestMove;
};
