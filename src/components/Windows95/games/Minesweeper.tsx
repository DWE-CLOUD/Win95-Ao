import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const GRID_SIZE = 10;
const MINE_COUNT = 10;

export function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [flagCount, setFlagCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const initializeGrid = () => {
    // Create empty grid
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[y][x].isMine) {
        newGrid[y][x].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!newGrid[y][x].isMine) {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (
                ny >= 0 && ny < GRID_SIZE &&
                nx >= 0 && nx < GRID_SIZE &&
                newGrid[ny][nx].isMine
              ) {
                count++;
              }
            }
          }
          newGrid[y][x].neighborMines = count;
        }
      }
    }

    return newGrid;
  };

  useEffect(() => {
    setGrid(initializeGrid());
  }, []);

  useEffect(() => {
    let timer: number;
    if (!gameOver && !won) {
      timer = window.setInterval(() => {
        setTimeElapsed(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameOver, won]);

  const revealCell = (y: number, x: number) => {
    if (gameOver || won || grid[y][x].isFlagged || grid[y][x].isRevealed) {
      return;
    }

    const newGrid = [...grid];
    
    if (grid[y][x].isMine) {
      // Game over
      revealAllMines();
      setGameOver(true);
      return;
    }

    const floodFill = (y: number, x: number) => {
      if (
        y < 0 || y >= GRID_SIZE ||
        x < 0 || x >= GRID_SIZE ||
        newGrid[y][x].isRevealed ||
        newGrid[y][x].isFlagged
      ) {
        return;
      }

      newGrid[y][x].isRevealed = true;

      if (newGrid[y][x].neighborMines === 0) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            floodFill(y + dy, x + dx);
          }
        }
      }
    };

    floodFill(y, x);
    setGrid(newGrid);
    checkWinCondition();
  };

  const toggleFlag = (y: number, x: number) => {
    if (gameOver || won || grid[y][x].isRevealed) {
      return;
    }

    const newGrid = [...grid];
    const cell = newGrid[y][x];
    
    if (!cell.isFlagged && flagCount >= MINE_COUNT) {
      return;
    }

    cell.isFlagged = !cell.isFlagged;
    setGrid(newGrid);
    setFlagCount(prev => prev + (cell.isFlagged ? 1 : -1));
    checkWinCondition();
  };

  const revealAllMines = () => {
    const newGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        isRevealed: cell.isMine ? true : cell.isRevealed,
      }))
    );
    setGrid(newGrid);
  };

  const checkWinCondition = () => {
    const hasWon = grid.every(row =>
      row.every(cell =>
        (cell.isMine && cell.isFlagged) ||
        (!cell.isMine && cell.isRevealed)
      )
    );
    if (hasWon) {
      setWon(true);
    }
  };

  const resetGame = () => {
    setGrid(initializeGrid());
    setGameOver(false);
    setWon(false);
    setFlagCount(0);
    setTimeElapsed(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full mb-4">
        <div className="font-mono text-xl">
          🚩 {MINE_COUNT - flagCount}
        </div>
        <div className="font-mono text-xl">
          ⏱️ {timeElapsed}
        </div>
        <Button variant="outline" onClick={resetGame}>
          New Game
        </Button>
      </div>

      <div className="grid gap-px bg-gray-300 p-px">
        {grid.map((row, y) => (
          <div key={y} className="flex gap-px">
            {row.map((cell, x) => (
              <button
                key={`${y}-${x}`}
                className={`w-8 h-8 flex items-center justify-center font-bold ${
                  cell.isRevealed
                    ? 'bg-gray-100'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => revealCell(y, x)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFlag(y, x);
                }}
              >
                {cell.isFlagged ? '🚩' :
                  cell.isRevealed ? (
                    cell.isMine ? '💣' :
                    cell.neighborMines || ''
                  ) : ''
                }
              </button>
            ))}
          </div>
        ))}
      </div>

      {(gameOver || won) && (
        <div className="text-center">
          <h2 className={`text-xl font-bold ${won ? 'text-green-600' : 'text-red-600'} mb-2`}>
            {won ? 'You Won!' : 'Game Over!'}
          </h2>
          <p className="mb-4">Time: {timeElapsed} seconds</p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
}