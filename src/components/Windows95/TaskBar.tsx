import { useState } from 'react';
import {
  LogOut,
  Settings,
  HelpCircle,
  Power,
  User,
  FolderOpen,
  Terminal,
  FileText,
  Globe,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { type Applications } from "./types";

interface TaskBarProps {
  applications: Applications;
  activeWindows: Record<string, boolean>;
  minimized: Record<string, boolean>;
  windowOrder: string[];
  setWindowOrder: (order: string[]) => void;
  setMinimized: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;
  time: Date;
  openWindow: (window: string) => void;
  handleShutdown: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  onRunClick: () => void;
}

export function TaskBar({
  applications,
  activeWindows,
  minimized,
  windowOrder,
  setWindowOrder,
  setMinimized,
  startMenuOpen,
  setStartMenuOpen,
  time,
  openWindow,
  handleShutdown,
  volume,
  setVolume,
  onRunClick,
}: TaskBarProps) {
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 50) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  const handleTaskbarButtonClick = (window: string) => {
    if (minimized[window]) {
      setMinimized(prev => ({ ...prev, [window]: false }));
    }
    setWindowOrder([...windowOrder.filter(w => w !== window), window]);
  };

  return (
    <div className="win95-taskbar">
      <div className="flex items-center h-full">
        {/* Start Button */}
        <button
          className={`win95-start-button ${startMenuOpen ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuOpen(!startMenuOpen);
          }}
        >
          <span className="text-xl">🪟</span>
          <span className="font-bold">Start</span>
        </button>

        {/* Quick Launch */}
        <div className="flex items-center px-1 border-l border-gray-400">
          <button
            className="win95-quick-launch-button"
            onClick={() => openWindow('browser')}
          >
            <Globe className="h-4 w-4" />
          </button>
          <button
            className="win95-quick-launch-button"
            onClick={() => openWindow('notepad')}
          >
            <FileText className="h-4 w-4" />
          </button>
          <button
            className="win95-quick-launch-button"
            onClick={() => openWindow('cmd')}
          >
            <Terminal className="h-4 w-4" />
          </button>
        </div>

        {/* Active Windows */}
        <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto">
          {windowOrder.map((window) => (
            activeWindows[window] && (
              <button
                key={window}
                className={`win95-taskbar-button ${
                  windowOrder[windowOrder.length - 1] === window && !minimized[window] ? 'active' : ''
                }`}
                onClick={() => handleTaskbarButtonClick(window)}
              >
                <span className="text-lg">{applications[window].icon}</span>
                <span className="truncate">{applications[window].title.split(' - ')[0]}</span>
              </button>
            )
          ))}
        </div>

        {/* System Tray */}
        <div className="win95-system-tray">
          <div className="relative">
            <button
              className="p-1 hover:bg-gray-200"
              onClick={() => setShowVolumeControl(!showVolumeControl)}
            >
              {getVolumeIcon()}
            </button>
            {showVolumeControl && (
              <div className="absolute bottom-full right-0 mb-2 p-2 win95-window">
                <div className="flex items-center gap-2">
                  <VolumeX className="h-4 w-4" />
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    orientation="vertical"
                    onValueChange={(value) => setVolume(value[0])}
                    className="h-24"
                  />
                  <Volume2 className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>
          <span className="win95-clock">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div 
          className="win95-start-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win95-start-menu-header">
            <User className="h-8 w-8" />
            <span className="font-bold">Windows 95</span>
          </div>

          <div className="win95-start-menu-content">
            <StartMenuItem
              icon={<User className="h-4 w-4" />}
              text="About Me"
              onClick={() => {
                openWindow('about');
                setStartMenuOpen(false);
              }}
            />
            <StartMenuItem
              icon={<FolderOpen className="h-4 w-4" />}
              text="My Projects"
              onClick={() => {
                openWindow('projects');
                setStartMenuOpen(false);
              }}
            />
            <StartMenuItem
              icon={<Terminal className="h-4 w-4" />}
              text="Command Prompt"
              onClick={() => {
                openWindow('cmd');
                setStartMenuOpen(false);
              }}
            />

            <Separator className="my-1" />

            <StartMenuItem
              icon={<LogOut className="h-4 w-4" />}
              text="Run..."
              onClick={() => {
                setStartMenuOpen(false);
                onRunClick();
              }}
            />
            <StartMenuItem
              icon={<Settings className="h-4 w-4" />}
              text="Settings"
              onClick={() => setStartMenuOpen(false)}
            />
            <StartMenuItem
              icon={<HelpCircle className="h-4 w-4" />}
              text="Help"
              onClick={() => setStartMenuOpen(false)}
            />

            <Separator className="my-1" />

            <StartMenuItem
              icon={<Power className="h-4 w-4" />}
              text="Shut Down..."
              onClick={() => {
                setStartMenuOpen(false);
                handleShutdown();
              }}
              className="text-red-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface StartMenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
}

function StartMenuItem({
  icon,
  text,
  onClick,
  className = ''
}: StartMenuItemProps) {
  return (
    <button
      className={`win95-menu-item ${className}`}
      onClick={onClick}
    >
      <span className="win95-menu-item-icon">{icon}</span>
      <span className="flex-1">{text}</span>
    </button>
  );
}