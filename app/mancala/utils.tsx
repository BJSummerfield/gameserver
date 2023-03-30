import { GameState } from './types'
export const initialPits = Array(14).fill(null).map((_, index) => {
  if (index === 6 || index === 13) {
    return 0; // Mancala pits
  }
  return 4; // Regular pits
});

export const getGameState = (pits: number[]) => {
  // switch (true) {
  //   case  :
  //     
  //     break;

  //   default:
  //     return GameState.InProgress
  // }
  //check if winner and return value in return inprogress
}
