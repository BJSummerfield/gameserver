import { GameState, MancalaPits, Rows } from './types'

export const initialPits = (totalPits: number, startingStones: number) =>
  Array.from({ length: totalPits * 2 + 2 }, (_, index) => (index === totalPits || index === totalPits * 2 + 1 ? 0 : startingStones));

export const splitPits = (pits: number[], totalPits: number) => {
  const topPits = pits.slice(totalPits + 1, totalPits * 2 + 1).reverse();
  const bottomPits = pits.slice(0, totalPits);
  return { [GameState.PlayerTwo]: topPits, [GameState.PlayerOne]: bottomPits }
}

export const checkWinner = (pits: number[], totalPits: number, mancalaPits: MancalaPits, gameState: GameState) => {
  const rows: Rows = splitPits(pits, totalPits);
  const currentPlayerRowsEmpty = rows[gameState].every((pit) => pit === 0);
  if (currentPlayerRowsEmpty) {
    handleWinner(pits, totalPits, mancalaPits, gameState);
    return true;
  }
  return false;
};

const handleWinner = (pits: number[], totalPits: number, mancalaPits: MancalaPits, gameState: GameState) => {
  for (let index = 0; index < pits.length; index++) {
    if (isValidPit(totalPits, 1 - gameState, index)) {
      pits[mancalaPits[1 - gameState]] += pits[index]
      pits[index] = 0
    }
  }
}

export const isValidPit = (totalPits: number, gameState: GameState, index: number) => {
  switch (gameState) {
    case GameState.PlayerOne:
      return index < totalPits;
    case GameState.PlayerTwo:
      return totalPits < index && index < totalPits * 2 + 1;
    default:
      return false;
  }
}

export const distributeStones = (
  index: number,
  pits: number[],
  mancalaPits: MancalaPits,
  gameState: GameState,
  totalPits: number
) => {
  let stones = pits[index];
  pits[index] = 0;

  let currentIndex = index;
  while (stones > 0) {
    currentIndex++;
    if (currentIndex > totalPits * 2 + 1) currentIndex = 0;

    // Skip opponent's Mancala pit
    if (currentIndex !== mancalaPits[1 - gameState]) {
      pits[currentIndex]++;
      stones--;
    }
  }
  return currentIndex
}

export const handleEmptyPlayerPit = (
  pits: number[],
  totalPits: number,
  index: number,
  mancalaPits: MancalaPits,
  gameState: GameState
) => {
  if (
    isValidPit(totalPits, gameState, index)
    &&
    pits[index] == 1
  ) {
    const inverseIndex = getInversePit(totalPits, index)
    captureInverseIndex(pits, index, inverseIndex, mancalaPits[gameState])
  }
}

const getInversePit = (totalPits: number, index: number) => {
  return Math.abs(index - (totalPits * 2))
}

const captureInverseIndex = (
  pits: number[],
  currentIndex: number,
  inverseIndex: number,
  targetMancala: number
) => {
  const totalStones = pits[currentIndex] + pits[inverseIndex]
  pits[currentIndex] = 0
  pits[inverseIndex] = 0
  pits[targetMancala] += totalStones
}

