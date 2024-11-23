import { useState } from 'react';
import { type SoundEffect } from './useSoundEffects';

export function useWindowManager(playSound: (type: SoundEffect) => void) {
  const [activeWindows, setActiveWindows] = useState<Record<string, boolean>>({});
  const [maximized, setMaximized] = useState<Record<string, boolean>>({});
  const [windowOrder, setWindowOrder] = useState<string[]>([]);

  const openWindow = (window: string) => {
    setActiveWindows(prev => ({ ...prev, [window]: true }));
    setWindowOrder(prev => [...prev.filter(w => w !== window), window]);
    playSound('open');
  };

  const closeWindow = (window: string) => {
    setActiveWindows(prev => ({ ...prev, [window]: false }));
    setWindowOrder(prev => prev.filter(w => w !== window));
    playSound('close');
  };

  return {
    activeWindows,
    maximized,
    windowOrder,
    openWindow,
    closeWindow,
    setMaximized,
    setWindowOrder
  };
}