import { useState, useEffect } from 'react';
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
    const [history, setHistory] = useState<string[]>(['https://www.google.com']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        navigate(url, false);
    }, []);

    const navigate = (newUrl: string, addToHistory: boolean = true) => {
        let formattedUrl = newUrl.trim();
        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
            formattedUrl = `https://${formattedUrl}`;
        }

        setIsLoading(true);
        setTimeout(() => {
            setUrl(formattedUrl);
            if (addToHistory) {
                const newHistory = [...history.slice(0, currentIndex + 1), formattedUrl];
                setHistory(newHistory);
                setCurrentIndex(newHistory.length - 1);
            }
            setIsLoading(false);
            setIframeKey(prevKey => prevKey + 1);
        }, 1000);
    };

    const goBack = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setUrl(history[newIndex]);
        }
    };

    const goForward = () => {
        if (currentIndex < history.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setUrl(history[newIndex]);
        }
    };

    const refresh = () => {
        setIsLoading(true);
        setIframeKey(prevKey => prevKey + 1);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const goHome = () => {
        navigate('https://www.google.com');
    };

        const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigate(e.currentTarget.value);
        }
    };

    return (
        <div className="flex flex-col h-screen">
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
                        onChange={handleUrlChange}
                        onKeyDown={handleKeyDown}
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

            <div className="flex-1 bg-white p-0">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    </div>
                ) : (
                    <div className="h-full">
                        <iframe
                            key={iframeKey}
                            src={url}
                            className="w-full h-full border-0"
                            title="browser-frame"
                             sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                        />
                    </div>
                )}
            </div>

            <div className="text-xs p-1 border-t bg-gray-100">
                {isLoading ? 'Loading...' : 'Done'}
            </div>
        </div>
    );
}
