import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  RefreshCcw, 
  X,
  Star
} from "lucide-react";

export function WebBrowserContent() {
  const [url, setUrl] = useState('https://www.google.com');
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = (newUrl: string) => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setUrl(newUrl);
      if (currentIndex < history.length - 1) {
        setHistory(history.slice(0, currentIndex + 1).concat(newUrl));
      } else {
        setHistory([...history, newUrl]);
      }
      setCurrentIndex(prev => prev + 1);
      setIsLoading(false);
    }, 1000);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setUrl(history[currentIndex - 1]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUrl(history[currentIndex + 1]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const goHome = () => {
    navigate('https://www.google.com');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Bar */}
      <div className="flex items-center gap-2 p-2 border-b">
        <Button 
          variant="outline" 
          size="icon"
          onClick={goBack}
          disabled={currentIndex <= 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={goForward}
          disabled={currentIndex >= history.length - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={refresh}
        >
          <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={goHome}
        >
          <Home className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(url)}
            className="font-mono text-sm"
          />
          {url && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setUrl('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Button variant="outline" size="icon">
          <Star className="h-4 w-4" />
        </Button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="browser-frame"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="text-xs p-1 border-t bg-gray-100">
        {isLoading ? 'Loading...' : 'Done'}
      </div>
    </div>
  );
}