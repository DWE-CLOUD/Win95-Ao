import { type SoundEffect } from './hooks/useSoundEffects';

export interface Application {
  title: string;
  icon: string;
  content: React.ComponentType<any>;
}

export interface Applications {
  [key: string]: Application;
}

export interface Position {
  x: number;
  y: number;
}

export interface WindowProps {
  volume?: number;
  setVolume?: (volume: number) => void;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
  currentTrack?: number;
  setCurrentTrack?: (track: number) => void;
  playSound?: (sound: SoundEffect) => void;
}

export type { SoundEffect };