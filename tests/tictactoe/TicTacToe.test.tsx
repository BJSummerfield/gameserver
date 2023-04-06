import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicTacToe from '@/app/tictactoe/page';
import { GameDifficulty, GameState } from '@/app/tictactoe/types';

describe('TicTacToe', () => {
  test('renders status', () => {
    render(<TicTacToe />);
    const statusElement = screen.getByTestId('status');
    expect(statusElement).toBeInTheDocument();
  });

  test('renders board with 9 squares', () => {
    render(<TicTacToe />);
    const boardElement = screen.getByTestId('board');
    const squareElements = within(boardElement).getAllByRole('button');
    expect(squareElements.length).toEqual(9);
  });

  test('renders settings button', () => {
    render(<TicTacToe />);
    const settingsButton = screen.getByTestId('settings-button');
    expect(settingsButton).toBeInTheDocument();
  });

  test('toggles settings menu', () => {
    render(<TicTacToe />);
    const settingsButton = screen.getByTestId('settings-button');

    fireEvent.click(settingsButton);
    expect(screen.getByTestId('players-button')).toBeInTheDocument();

    fireEvent.click(settingsButton);
    expect(screen.queryByTestId('players-button')).not.toBeInTheDocument();
  });

  test('updates square value on click', () => {
    render(<TicTacToe />);
    const boardElement = screen.getByTestId('board');
    const squareElements = within(boardElement).getAllByRole('button');

    fireEvent.click(squareElements[0]);
    expect(squareElements[0].textContent).toBe(GameState.PlayerOne);
  });

  test('toggles players mode', () => {
    render(<TicTacToe />);
    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);

    const playersButton = screen.getByTestId('players-button');
    fireEvent.click(playersButton);
    expect(playersButton.textContent).toBe("Players: 2");
  });

  test('updates difficulty when not in two-players mode', () => {
    render(<TicTacToe />);
    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);

    const difficultyButton = screen.getByTestId('difficulty-button');
    fireEvent.click(difficultyButton);
    expect(difficultyButton.textContent).toBe(`Difficulty: ${GameDifficulty.Medium}`);
  });

  test('reset game button appears when game is not in progress', () => {
    render(<TicTacToe />);
    const boardElement = screen.getByTestId('board');
    const squareElements = within(boardElement).getAllByRole('button');

    // Simulate clicks to fill up the board and reach a tie
    squareElements.map((square) => {
      return fireEvent.click(square)
    })

    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();
  });

  test('reset game button resets the board', () => {
    render(<TicTacToe />);
    const boardElement = screen.getByTestId('board');
    const squareElements = within(boardElement).getAllByRole('button');

    // Simulate clicks to fill up the board and reach a tie
    squareElements.map((square) => {
      return fireEvent.click(square)
    })

    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);

    const updatedSquareElements = within(boardElement).getAllByRole('button');
    updatedSquareElements.forEach((square) => {
      expect(square.textContent).toBe("");
    });
  });
});
