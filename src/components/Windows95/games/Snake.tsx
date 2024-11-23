import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

interface Position {
  x: number;
  y: number;
}

export function Snake() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(currentSnake => {
      const newHead = {
        x: (currentSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (currentSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood, isGameOver, isPaused]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isGameOver) return;

      const keyDirections: Record<string, Position> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      if (keyDirections[e.key]) {
        const newDirection = keyDirections[e.key];
        // Prevent 180-degree turns
        if (
          direction.x + newDirection.x !== 0 ||
          direction.y + newDirection.y !== 0
        ) {
          setDirection(newDirection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full mb-4">
        <div className="text-xl font-bold">Score: {score}</div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant="outline"
            onClick={resetGame}
          >
            New Game
          </Button>
        </div>
      </div>

      <div 
        className="border-2 border-gray-400 bg-white"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          position: 'relative'
        }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            className="bg-green-500 absolute"
            style={{
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          />
        ))}
        <div
          className="bg-red-500 absolute"
          style={{
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        />
      </div>

      {isGameOver && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Game Over!</h2>
          <p className="mb-4">Final Score: {score}</p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
}