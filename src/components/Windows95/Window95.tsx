import { useState, useEffect } from "react";
import { Minus, Square, X } from "lucide-react";
import { MenuBar } from "./MenuBar";

interface Window95Props {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
  isMaximized: boolean;
  defaultPosition: { x: number; y: number };
  zIndex: number;
}

export function Window95({
  children,
  title,
  onClose,
  onMaximize,
  onMinimize,
  isMaximized,
  defaultPosition,
  zIndex,
}: Window95Props) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const windowStyle = isMaximized 
    ? "fixed inset-0 flex flex-col" 
    : "absolute flex flex-col w-[600px]";

  return (
    <div 
      className={`${windowStyle} win95-window bg-[#c0c0c0]`}
      style={{
        ...(!isMaximized ? { top: position.y, left: position.x } : {}),
        zIndex: 100 + zIndex
      }}
    >
      <div 
        className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm flex items-center gap-2">
          <span className="text-lg">{title.split(' - ')[1]?.includes('.exe') ? '💾' : '📁'}</span>
          {title}
        </span>
        <div className="flex gap-1">
          <WindowButton onClick={onMinimize}>
            <Minus className="h-3 w-3" />
          </WindowButton>
          <WindowButton onClick={onMaximize}>
            <Square className="h-3 w-3" />
          </WindowButton>
          <WindowButton onClick={onClose}>
            <X className="h-3 w-3" />
          </WindowButton>
        </div>
      </div>

      <MenuBar />

      <div className="flex-1 overflow-auto bg-white win95-inset">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function WindowButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button 
      className="win95-button h-5 w-5 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
}