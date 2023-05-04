import { GameState, MancalaPits, Rows } from './types';
import {
  checkWinner,
  isValidPit,
  distributeStones,
  handleEmptyPlayerPit,
  handleWinner,
  splitPits
} from './utils'

const getMaximizingPlayer = (gameState: GameState) => {
  return gameState == GameState.PlayerTwo
}

const getMancalaDifference = (pits: number[], mancalaPits: MancalaPits) => {
  const playerTwoMancala = pits[mancalaPits[GameState.PlayerTwo]];
  const playerOneMancala = pits[mancalaPits[GameState.PlayerOne]];
  return playerTwoMancala - playerOneMancala;
};

const getTotalStonesForPlayer = (pitRows: Rows, gameState: GameState) => {
  return pitRows[gameState].reduce((a, b) => a + b);
};

const getStonesDifference = (pitRows: Rows) => {
  const totalStonesPlayerOne = getTotalStonesForPlayer(pitRows, GameState.PlayerOne);
  const totalStonesPlayerTwo = getTotalStonesForPlayer(pitRows, GameState.PlayerTwo);
  return totalStonesPlayerTwo - totalStonesPlayerOne;
};

const evaluateScore = (pits: number[], mancalaPits: MancalaPits, depth: number, totalPits: number) => {
  const mancalaDifference = getMancalaDifference(pits, mancalaPits);
  const pitRows = splitPits(pits, totalPits);
  const stonesDifference = getStonesDifference(pitRows);
  const score = mancalaDifference * 10 + stonesDifference - depth;
  return score;
};

const getPossibleMoves = (gameState: GameState, pits: number[], totalPits: number) => {
  return pits
    .map((_, index) => index)
    .filter(index => isValidPit(totalPits, gameState, index) && pits[index] > 0);
};

const makeMove = (index: number, pits: number[], mancalaPits: MancalaPits, gameState: GameState, totalPits: number) => {
  const newPits = [...pits];
  const { newPits: updatedPits, lastIndex } = distributeStones(index, newPits, mancalaPits, gameState, totalPits);
  const  handledPits = handleEmptyPlayerPit(updatedPits, totalPits, lastIndex, mancalaPits, gameState);
  return { handledPits, lastIndex };
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
  const isMaximizingPlayer = getMaximizingPlayer(gameState);
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
  let bestMove: number | undefined;

  // Get possible moves for the current game state
  const validMoves = getPossibleMoves(gameState, pits, totalPits);

  // Iterate through each valid move
  for (const move of validMoves) {
    // Make the move and get the updated game state
    const { handledPits: newPits, lastIndex } = makeMove(move, pits, mancalaPits, gameState, totalPits);

    // Calculate the score using the minimax algorithm
    const score = calculateScore(gameState, lastIndex, newPits, totalPits, mancalaPits, depth + 1, alpha, beta);

    // Update bestScore and bestMove if a better score is found
    if ((isMaximizingPlayer && score > bestScore) || (!isMaximizingPlayer && score < bestScore)) {
      bestScore = score;
      bestMove = move;
    }

    // Update alpha or beta based on the maximizing/minimizing player
    if (isMaximizingPlayer) {
      alpha = Math.max(alpha, bestScore);
    } else {
      beta = Math.min(beta, bestScore);
    }

    // Perform alpha-beta pruning if possible
    if (alpha >= beta) {
      break;
    }
  }

  // Return the best move and its corresponding score
  return [bestMove as number, bestScore];
};

const calculateScore = (
  gameState: GameState,
  lastIndex: number,
  pits: number[],
  totalPits: number,
  mancalaPits: MancalaPits,
  depth: number,
  alpha: number,
  beta: number
) => {
  const maxDepth = 10;
  const isWinner = checkWinner(pits, totalPits);

  // If there is a winner, update the pits accordingly
  const newPits = isWinner !== null ? handleWinner(pits, totalPits, mancalaPits, isWinner) : [...pits];

  // If the maximum depth is reached or there is a winner, return the evaluated score
  if (depth === maxDepth || isWinner !== null) {
    return evaluateScore(newPits, mancalaPits, depth, totalPits);
  }

  // Determine the next state based on whether the last pit was a mancala pit for the current player
  const nextState = lastIndex !== mancalaPits[gameState] ? 1 - gameState : gameState;

  // Recursively call getNextMove and return the best score
  const [, bestScore] = getNextMove(nextState, pits, mancalaPits, totalPits, depth, alpha, beta);
  return bestScore;
};




