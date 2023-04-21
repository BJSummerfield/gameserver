import { useState } from 'react'
import { GameState, MancalaPits } from './types'
import {
  initialPits,
  splitPits,
  isValidPit,
  distributeStones,
  handleEmptyPlayerPit,
  checkWinner,
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
    //Early return if game is over
    if (gameState === GameState.GameOver) return

    if (pits[index] != 0 && isValidPit(totalPits, gameState, index)) {
      const newPits = [...pits]
      const lastIndex = distributeStones(index, newPits, mancalaPits, gameState, totalPits)
      handleEmptyPlayerPit(
        newPits,
        totalPits,
        lastIndex,
        mancalaPits,
        gameState
      )
      if (lastIndex != mancalaPits[gameState]) {
        setGameState(1 - gameState)
      }
      const isGameOver = checkWinner(newPits, totalPits, mancalaPits, gameState)
      if (isGameOver) {
        setGameState(GameState.GameOver)
      }
      setPits(newPits)
    }
  }
  return {
    mancalaPits,
    rows,
    pits,
    gameState,
    selectPit,
    totalPits,
  }
}
