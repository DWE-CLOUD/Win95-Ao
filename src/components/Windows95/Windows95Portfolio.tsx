import { useState, useEffect } from "react";
import { BootScreen } from "./screens/BootScreen";
import { ShutdownScreen } from "./screens/ShutdownScreen";
import { Desktop } from "./Desktop";
import { TaskBar } from "./TaskBar";
import { ContextMenu } from "./ContextMenu";
import { RunDialog } from "./windows/RunDialog";
import { applications } from "./config/applications";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { useWindowManager } from "./hooks/useWindowManager";

export function Windows95Portfolio() {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [showShutdown, setShowShutdown] = useState(false);
  const [time, setTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [minimized, setMinimized] = useState<Record<string, boolean>>({});

  const { playSound } = useSoundEffects();
  const { 
    activeWindows, 
    maximized, 
    windowOrder, 
    openWindow, 
    closeWindow, 
    setMaximized, 
    setWindowOrder 
  } = useWindowManager(playSound);

  // Startup sequence
  useEffect(() => {
    playSound('startup');
    setTimeout(() => setShowBootScreen(false), 3000);
  }, []);

  // Clock updater
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShutdown = () => {
    setShowShutdown(true);
    playSound('shutdown');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleRunCommand = (command: string) => {
    const commandMap: Record<string, string> = {
      'notepad': 'notepad',
      'calc': 'calculator',
      'mspaint': 'paint',
      'cmd': 'cmd',
      'command': 'cmd',
      'explorer': 'browser',
      'iexplore': 'browser',
      'winamp': 'music'
    };

    const app = commandMap[command.toLowerCase()];
    if (app) {
      openWindow(app);
    }
  };

  if (showBootScreen) {
    return <BootScreen />;
  }

  if (showShutdown) {
    return <ShutdownScreen />;
  }

  return (
    <div 
      className="h-screen w-full bg-[#008080] overflow-hidden relative"
      onClick={() => {
        setContextMenu({ show: false, x: 0, y: 0 });
        setStartMenuOpen(false);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({
          show: true,
          x: e.clientX,
          y: e.clientY
        });
      }}
    >
      <Desktop
        applications={applications}
        activeWindows={activeWindows}
        maximized={maximized}
        minimized={minimized}
        windowOrder={windowOrder}
        openWindow={openWindow}
        closeWindow={closeWindow}
        setMaximized={setMaximized}
        setMinimized={setMinimized}
        volume={volume}
        setVolume={setVolume}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        playSound={playSound}
      />

      <TaskBar 
        applications={applications}
        activeWindows={activeWindows}
        minimized={minimized}
        windowOrder={windowOrder}
        setWindowOrder={setWindowOrder}
        setMinimized={setMinimized}
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
        time={time}
        openWindow={openWindow}
        handleShutdown={handleShutdown}
        volume={volume}
        setVolume={setVolume}
        onRunClick={() => setShowRunDialog(true)}
      />

      {contextMenu.show && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onNewWindow={() => openWindow('notepad')}
        />
      )}

      <RunDialog 
        isOpen={showRunDialog}
        onClose={() => setShowRunDialog(false)}
        onRun={handleRunCommand}
      />
    </div>
  );
}