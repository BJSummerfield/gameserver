export type SquareValue = GameState.PlayerOne | GameState.PlayerTwo | null;

export enum GameDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export enum GameScore {
  PlayerOne = 10,
  PlayerTwo = -10,
  Tie = 0,
}

export enum GameState {
  PlayerOne = "X",
  PlayerTwo = "O",
  Tie = "Tie",
  InProgress = "InProgress",
}

