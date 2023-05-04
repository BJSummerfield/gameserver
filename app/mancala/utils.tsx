import { GameState, MancalaPits, Rows } from './types'

export const initialPits = (totalPits: number, startingStones: number) =>
  Array.from({ length: totalPits * 2 + 2 }, (_, index) => (index === totalPits || index === totalPits * 2 + 1 ? 0 : startingStones));

export const splitPits = (pits: number[], totalPits: number) => {
  const topPits = pits.slice(totalPits + 1, totalPits * 2 + 1).reverse();
  const bottomPits = pits.slice(0, totalPits);
  return { [GameState.PlayerTwo]: topPits, [GameState.PlayerOne]: bottomPits }
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

export const checkWinner = (pits: number[], totalPits: number) => {
  const rows: Rows = splitPits(pits, totalPits);
  const playerOneRowsEmpty = rows[GameState.PlayerOne].every((pit) => pit === 0);
  const playerTwoRowsEmpty = rows[GameState.PlayerTwo].every((pit) => pit === 0);

  if (playerOneRowsEmpty) {
    return GameState.PlayerTwo;
  } else if (playerTwoRowsEmpty) {
    return GameState.PlayerOne;
  }
  return null;
};


export const getTotalStonesForPlayer = (pitRows: Rows, gameState: GameState) => {
  return pitRows[gameState].reduce((a, b) => a + b);
};

export const handleWinner = (pits: number[], totalPits: number, mancalaPits: MancalaPits) => {
  const newPits = [...pits];
  const pitRows = splitPits(newPits, totalPits)
  const finalPits = initialPits(totalPits, 0) 
  const totalStonesPlayerOne = getTotalStonesForPlayer(pitRows, GameState.PlayerOne);
  const totalStonesPlayerTwo = getTotalStonesForPlayer(pitRows, GameState.PlayerTwo);
  finalPits[mancalaPits[GameState.PlayerOne]] = totalStonesPlayerOne + pits[mancalaPits[GameState.PlayerOne]]
  finalPits[mancalaPits[GameState.PlayerTwo]] = totalStonesPlayerTwo + pits[mancalaPits[GameState.PlayerTwo]]
  return finalPits;
};

export const distributeStones = (
  index: number,
  pits: number[],
  mancalaPits: MancalaPits,
  gameState: GameState,
  totalPits: number
) => {
  let stones = pits[index];
  const newPits = [...pits];
  newPits[index] = 0;

  let currentIndex = index;
  while (stones > 0) {
    currentIndex++;
    if (currentIndex > totalPits * 2 + 1) currentIndex = 0;

    // Skip opponent's Mancala pit
    if (currentIndex !== mancalaPits[1 - gameState]) {
      newPits[currentIndex]++;
      stones--;
    }
  }
  return { newPits, lastIndex: currentIndex };
};


export const handleEmptyPlayerPit = (
  pits: number[],
  totalPits: number,
  index: number,
  mancalaPits: MancalaPits,
  gameState: GameState
) => {
  let newPits = [...pits];
  const emptyPit =
    isValidPit(totalPits, gameState, index) &&
    pits[index] === 1

  if (emptyPit) {
    const inverseIndex = getInversePit(totalPits, index);
    const { capturedPits } = captureInverseIndex(pits, index, inverseIndex, mancalaPits[gameState]);
    newPits = [...capturedPits]
  }
  return newPits;
};


const getInversePit = (totalPits: number, index: number) => {
  return Math.abs(index - (totalPits * 2))
}


const captureInverseIndex = (
  pits: number[],
  currentIndex: number,
  inverseIndex: number,
  targetMancala: number
) => {
  const newPits = [...pits];
  const totalStones = newPits[currentIndex] + newPits[inverseIndex];
  newPits[currentIndex] = 0;
  newPits[inverseIndex] = 0;
  newPits[targetMancala] += totalStones;
  return { capturedPits: newPits };
};


