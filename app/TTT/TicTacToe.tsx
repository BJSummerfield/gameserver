export enum CellValue {
  X = 1,
  O = -1,
  Empty = 0,
}

export class TicTacToe {
  xBoard: bigint;
  oBoard: bigint;
  player: CellValue;

  constructor() {
    this.xBoard = 0n;
    this.oBoard = 0n;
    this.player = CellValue.X;
  }

  makeMove(pos: number): TicTacToe | null {
    const newGame = new TicTacToe();
    newGame.xBoard = this.xBoard;
    newGame.oBoard = this.oBoard;
    newGame.player = this.player;

    const currentBoard = newGame.player === CellValue.X ? newGame.xBoard : newGame.oBoard;
    const otherBoard = newGame.player === CellValue.X ? newGame.oBoard : newGame.xBoard;
    const moveMask = 1n << BigInt(pos);

    if (!((currentBoard | otherBoard) & moveMask)) {
      if (newGame.player === CellValue.X) {
        newGame.xBoard |= moveMask;
      } else {
        newGame.oBoard |= moveMask;
      }

      if (newGame.checkWin(currentBoard | moveMask)) {
        console.log(`Player ${newGame.player === CellValue.X ? 'X' : 'O'} wins!`);
      } else if (newGame.isBoardFull()) {
        console.log('Draw!');
      } else {
        newGame.player *= -1;
      }
      return newGame;
    } else {
      console.log('Invalid move');
      return null;
    }
  }

  getCellValue(index: number): CellValue {
    const mask = 1n << BigInt(index);
    if (this.xBoard & mask) {
      return CellValue.X;
    } else if (this.oBoard & mask) {
      return CellValue.O;
    } else {
      return CellValue.Empty;
    }
  }

  checkWin(board: bigint): boolean {
    const winPatterns = [
      0b111000000n,
      0b000111000n,
      0b000000111n,
      0b100100100n,
      0b010010010n,
      0b001001001n,
      0b100010001n,
      0b001010100n,
    ];

    return winPatterns.some((pattern) => (board & pattern) === pattern);
  }

  isBoardFull(): boolean {
    return (this.xBoard | this.oBoard) === 0b111111111n;
  }
}
