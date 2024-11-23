import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Snake } from '../games/Snake';
import { Minesweeper } from '../games/Minesweeper';

type Game = 'snake' | 'minesweeper' | null;

export function GamesContent() {
  const [activeGame, setActiveGame] = useState<Game>(null);

  return (
    <div>
      {!activeGame ? (
        <div className="grid grid-cols-2 gap-4">
          <GameCard
            title="Snake"
            description="Classic Snake game - Use arrow keys to control the snake"
            onClick={() => setActiveGame('snake')}
          />
          <GameCard
            title="Minesweeper"
            description="Classic Minesweeper - Left click to reveal, right click to flag"
            onClick={() => setActiveGame('minesweeper')}
          />
        </div>
      ) : (
        <div>
          <Button 
            variant="outline" 
            onClick={() => setActiveGame(null)}
            className="mb-4"
          >
            Back to Games
          </Button>
          {activeGame === 'snake' && <Snake />}
          {activeGame === 'minesweeper' && <Minesweeper />}
        </div>
      )}
    </div>
  );
}

function GameCard({ 
  title, 
  description, 
  onClick 
}: { 
  title: string; 
  description: string; 
  onClick: () => void;
}) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Card>
  );
}