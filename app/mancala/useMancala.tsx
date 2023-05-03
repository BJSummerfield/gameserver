import { useState } from 'react'
import { GameState, MancalaPits, StatusMessagesType } from './types'
import {
  initialPits,
  splitPits,
  isValidPit,
  distributeStones,
  handleEmptyPlayerPit,
  checkWinner,
  handleWinner,
} from './utils';
import { getNextMove } from './ai';

export const useMancala = () => {
  const [totalPits] = useState<number>(2)
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
      const {newPits: updatedPits} = handleEmptyPlayerPit(distributedPits, totalPits, lastIndex, mancalaPits, gameState);

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


  const statusMessages: StatusMessagesType = {
    [GameState.PlayerOne]: "Player One's Turn",
    [GameState.PlayerTwo]: "Player Two's Turn",
    [GameState.GameOver]: (() => {
      if (pits[mancalaPits[GameState.PlayerOne]] === pits[mancalaPits[GameState.PlayerTwo]]) {
        return "Tie Game!";
      } else {
        return `Player ${pits[mancalaPits[GameState.PlayerOne]] > pits[mancalaPits[GameState.PlayerTwo]]
          ? "One"
          : "Two"
          } wins!`;
      }
    })(),
  };

  const gameLoop = () => {
    // if (!twoPlayers && nextValue === GameState.PlayerTwo && gameState == GameState.InProgress) {
    if (gameState != GameState.GameOver && gameState != GameState.PlayerOne) {
      //// START HERE TOMORROW YOU NEED TO GET AI TO MAKE A Move
      const [index,] = getNextMove(gameState, pits, mancalaPits, totalPits);
      // console.log(index)
      selectPit(index);
    } else {
      console.log("PlayerOne", getNextMove(gameState, pits, mancalaPits, totalPits))
    }
  };

  const status = statusMessages[gameState];

  return {
    gameLoop,
    gameState,
    mancalaPits,
    status,
    rows,
    pits,
    selectPit,
    totalPits,
  }
}
