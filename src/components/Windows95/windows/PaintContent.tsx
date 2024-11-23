import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Square, Circle, Type, Eraser } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

export function PaintContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'rectangle' | 'circle' | 'text' | 'eraser'>('pen');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(2);
  const [startPoint, setStartPoint] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
      }
    }
  }, [color, size]);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawing(true);
      setStartPoint({ x, y });
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current || !startPoint) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();

    switch (tool) {
      case 'pen':
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        setStartPoint({ x, y });
        break;

      case 'rectangle':
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(
          startPoint.x,
          startPoint.y,
          x - startPoint.x,
          y - startPoint.y
        );
        break;

      case 'circle':
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const radius = Math.sqrt(
          Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
        );
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;

      case 'eraser':
        ctx.strokeStyle = '#ffffff';
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = color;
        setStartPoint({ x, y });
        break;
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={tool === 'pen' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTool('pen')}
        >
          <Palette className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === 'rectangle' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTool('rectangle')}
        >
          <Square className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === 'circle' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTool('circle')}
        >
          <Circle className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === 'text' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTool('text')}
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          variant={tool === 'eraser' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setTool('eraser')}
        >
          <Eraser className="h-4 w-4" />
        </Button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-24"
        />
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="border border-gray-300 bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </div>
  );
}