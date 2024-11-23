export type SoundEffect = 'startup' | 'error' | 'shutdown' | 'open' | 'close' | 'click';

export function useSoundEffects() {
  const sounds: Record<SoundEffect, string> = {
    startup: 'https://www.myinstants.com/media/sounds/windows-95-startup.mp3',
    error: 'https://www.myinstants.com/media/sounds/windows-95-error.mp3',
    shutdown: 'https://www.myinstants.com/media/sounds/windows-95-shutdown.mp3',
    open: 'https://www.myinstants.com/media/sounds/windows-95-tada.mp3',
    close: 'https://www.myinstants.com/media/sounds/windows-95-ding.mp3',
    click: 'https://www.myinstants.com/media/sounds/windows-95-click.mp3'
  };

  const playSound = (type: SoundEffect) => {
    const audio = new Audio(sounds[type]);
    audio.play().catch(() => {
      // Ignore errors from browsers blocking autoplay
    });
  };

  return { playSound };
}