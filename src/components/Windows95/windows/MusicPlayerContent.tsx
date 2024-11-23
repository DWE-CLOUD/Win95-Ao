import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const playlist = [
  {
    title: "Elevator Music",
    artist: "Unknown",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Jazz Cafe",
    artist: "Unknown",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Lofi Beats",
    artist: "Unknown",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

interface MusicPlayerContentProps {
  volume: number;
  setVolume: (volume: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTrack: number;
  setCurrentTrack: (track: number) => void;
}

export function MusicPlayerContent({
  volume,
  setVolume,
  isPlaying,
  setIsPlaying,
  currentTrack,
  setCurrentTrack
}: MusicPlayerContentProps) {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  const handlePrevious = () => {
    setCurrentTrack(currentTrack === 0 ? playlist.length - 1 : currentTrack - 1);
  };

  const handleNext = () => {
    setCurrentTrack((currentTrack + 1) % playlist.length);
  };

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        src={playlist[currentTrack].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="text-center">
        <h3 className="font-bold">{playlist[currentTrack].title}</h3>
        <p className="text-sm text-gray-500">{playlist[currentTrack].artist}</p>
      </div>

      <Slider
        value={[progress]}
        max={100}
        step={1}
        onValueChange={handleProgressChange}
        className="w-full"
      />

      <div className="flex justify-center items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handlePrevious}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleNext}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4" />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="w-24"
        />
      </div>
    </div>
  );
}