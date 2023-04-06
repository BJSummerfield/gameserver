import { renderHook, act } from '@testing-library/react';
import { useTicTacToe } from '@/app/tictactoe/useTicTacToe';
import { GameDifficulty, GameState } from '@/app/tictactoe/types';


describe('useTicTacToe', () => {
  test('should set showSettings state', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.setShowSettings(true);
    });

    expect(result.current.showSettings).toBe(true);
  });

  test('should set twoPlayers state', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.setTwoPlayers(true);
    });

    expect(result.current.twoPlayers).toBe(true);
  });

  test('should reset squares', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.setSquare(0);
      result.current.resetSquares();
    });

    expect(result.current.squares).toEqual(Array(9).fill(null));
  });

  test('should change difficulty', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.changeDifficulty();
    });

    expect(result.current.difficulty).toBe(GameDifficulty.Medium);
  });

  test('should set square value', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.setSquare(0);
    });

    expect(result.current.squares[0]).toBe(GameState.PlayerOne);
  });

  test('should not change square value when the square is already set', () => {
    const { result } = renderHook(() => useTicTacToe());

    act(() => {
      result.current.setSquare(0);
      result.current.setSquare(0);
    });

    expect(result.current.squares[0]).toBe(GameState.PlayerOne);
  });

  test('should not change square value when the game is not in progress', () => {
    const { result } = renderHook(() => useTicTacToe());

    // Fill the squares to simulate a tie
    act(() => {
      result.current.setSquares([
        GameState.PlayerOne,
        GameState.PlayerTwo,
        GameState.PlayerOne,
        GameState.PlayerTwo,
        GameState.PlayerOne,
        GameState.PlayerOne,
        GameState.PlayerTwo,
        GameState.PlayerOne,
        GameState.PlayerTwo,
      ]);
    });

    act(() => {
      result.current.setSquare(0);
    });

    expect(result.current.squares[0]).toBe(GameState.PlayerOne);
  });
});
