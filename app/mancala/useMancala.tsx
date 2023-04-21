import { useState } from 'react'
import { GameState, MancalaPits } from './types'
import {
  initialPits,
  splitPits,
  isValidPit,
  distributeStones,
  handleEmptyPlayerPit,
  checkWinner,
  handleWinner,
} from './utils';
export const useMancala = () => {
  const [totalPits] = useState<number>(6)
  const [startingStones] = useState<number>(4)
  const [pits, setPits] = useState<number[]>(initialPits(totalPits, startingStones));
  const [gameState, setGameState] = useState<number>(GameState.PlayerOne)

  const rows = splitPits(pits, totalPits)

  const mancalaPits: MancalaPits = {
    [GameState.PlayerOne]: totalPits,
    [GameState.PlayerTwo]: totalPits * 2 + 1,
  }


const selectPit = (index: number) => {
  // Early return if game is over
  if (gameState === GameState.GameOver) return;

  if (pits[index] !== 0 && isValidPit(totalPits, gameState, index)) {
    const { newPits: distributedPits, lastIndex } = distributeStones(index, pits, mancalaPits, gameState, totalPits);
    const updatedPits = handleEmptyPlayerPit(distributedPits, totalPits, lastIndex, mancalaPits, gameState);

    if (lastIndex !== mancalaPits[gameState]) {
      setGameState(1 - gameState);
    }

    const winner = checkWinner(updatedPits, totalPits, gameState);
    if (winner !== null) {
      const finalPits = handleWinner(updatedPits, totalPits, mancalaPits, winner);
      setPits(finalPits);
      setGameState(GameState.GameOver);
    } else {
      setPits(updatedPits);
    }
  }
};

  return {
    mancalaPits,
    rows,
    pits,
    gameState,
    selectPit,
    totalPits,
  }
}
