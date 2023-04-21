export enum GameState {
  PlayerOne = 0,
  PlayerTwo = 1,
  GameOver = 2,
}

export interface MancalaPits {
[key: number]: number;
}

export interface Rows {
  [key: number]: number[]
}

export type StatusMessagesType = {
  [key in GameState]: string;
};
