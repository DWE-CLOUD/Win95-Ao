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
  const [displayUrl, setDisplayUrl] = useState('https://www.google.com');
  const [history, setHistory] = useState<string[]>(['https://www.google.com']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = (newUrl: string) => {
    setIsLoading(true);
    
    // Add http:// if not present
    let processedUrl = newUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      processedUrl = 'https://' + newUrl;
    }

    // Update display URL immediately
    setDisplayUrl(processedUrl);
    
    // Update the actual URL after a short delay
    setTimeout(() => {
      setUrl(processedUrl);
      
      // Update history
      if (currentIndex < history.length - 1) {
        setHistory(history.slice(0, currentIndex + 1).concat(processedUrl));
      } else {
        setHistory([...history, processedUrl]);
      }
      setCurrentIndex(prev => prev + 1);
      setIsLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      const previousUrl = history[currentIndex - 1];
      setDisplayUrl(previousUrl);
      setUrl(previousUrl);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextUrl = history[currentIndex + 1];
      setDisplayUrl(nextUrl);
      setUrl(nextUrl);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    const currentUrl = url;
    setUrl('about:blank');
    setTimeout(() => {
      setUrl(currentUrl);
      setIsLoading(false);
    }, 100);
  };

  const goHome = () => {
    navigate('https://www.google.com');
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="bg-[#000080] text-white px-2 py-1 flex items-center text-sm">
        <span className="mr-4">File</span>
        <span className="mr-4">Edit</span>
        <span className="mr-4">View</span>
        <span>Help</span>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-1 p-1 border-b border-gray-400 bg-[#c0c0c0]">
        <div className="flex gap-1 mr-2">
          <button 
            className={`win95-button w-8 h-8 flex items-center justify-center ${currentIndex <= 0 ? 'opacity-50' : ''}`}
            onClick={goBack} 
            disabled={currentIndex <= 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button 
            className={`win95-button w-8 h-8 flex items-center justify-center ${currentIndex >= history.length - 1 ? 'opacity-50' : ''}`}
            onClick={goForward} 
            disabled={currentIndex >= history.length - 1}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="win95-button w-8 h-8 flex items-center justify-center" onClick={refresh}>
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button className="win95-button w-8 h-8 flex items-center justify-center" onClick={goHome}>
            <Home className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 flex items-center">
          <span className="mr-2 text-sm whitespace-nowrap">Address:</span>
          <div className="flex-1 win95-inset bg-white">
            <input
              value={displayUrl}
              onChange={(e) => setDisplayUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(displayUrl)}
              className="w-full px-2 py-1 bg-transparent border-none focus:outline-none text-sm"
              placeholder="Enter a URL..."
            />
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 bg-white win95-inset p-0 relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <iframe
            key={url}
            src={url}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-gray-400 flex items-center justify-between px-2">
        <div className="text-xs">
          {isLoading ? 'Opening page...' : 'Done'}
        </div>
        <div className="flex items-center text-xs">
          <span className="border-r border-gray-400 pr-2 mr-2">Internet</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}