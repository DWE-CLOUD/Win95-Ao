import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Save,
  FileText,
  Printer,
  Scissors,
  Copy,
  Clipboard,
  Undo2,
  Redo2,
  Search,
  List,
  ListOrdered,
  ImageIcon
} from "lucide-react";

const fonts = [
  'Times New Roman',
  'Arial',
  'Courier New',
  'Georgia',
  'Verdana',
  'MS Sans Serif'
];

const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '36', '48', '72'];

export function WordContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [content, setContent] = useState('');
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [fontSize, setFontSize] = useState('12');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  if (showSplash) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="bg-[#c0c0c0] p-8 rounded-lg shadow-xl max-w-md w-full text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Microsoft_Office_Word_%281995-2001%29.svg/1200px-Microsoft_Office_Word_%281995-2001%29.svg.png"
              alt="Microsoft Word"
              className="w-16 h-16 mr-4"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold">Microsoft Office</h2>
              <p className="text-sm">for Windows 95</p>
              <p className="text-sm">Version 7.0</p>
            </div>
          </div>
          
          <div className="text-left text-sm space-y-2">
            <p>This copy of Microsoft Office is licensed to:</p>
            <p className="font-bold">Akshit Ohri</p>
            <p className="font-bold">DWOSCLOUD</p>
          </div>

          <p className="text-xs mt-8">
            This program is protected by copyright laws as described in the About Box.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar 1 - File Operations */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b">
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="word95-button">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="word95-button">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="word95-button">
            <Printer className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="word95-button">
            <Scissors className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="word95-button">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="word95-button">
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="word95-button">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="word95-button">
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline" size="icon" className="word95-button">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Toolbar 2 - Formatting */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b">
        <select 
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            handleFormat('fontName', e.target.value);
          }}
          className="word95-button px-2"
        >
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>

        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            handleFormat('fontSize', e.target.value);
          }}
          className="word95-button px-2"
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('bold')}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('italic')}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('underline')}
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('justifyLeft')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('justifyCenter')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('justifyRight')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('justifyFull')}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('insertUnorderedList')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('insertOrderedList')}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="word95-button"
            onClick={() => handleFormat('insertImage')}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Ruler */}
      <div className="h-6 bg-gray-100 border-b flex items-center px-2">
        <div className="flex-1 h-4 bg-white border relative">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute h-2 border-l border-gray-400"
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Editor */}
      <div 
        ref={editorRef}
        className="flex-1 p-8 bg-white overflow-auto"
        contentEditable
        suppressContentEditableWarning
        style={{
          fontFamily,
          fontSize: `${fontSize}pt`,
          minHeight: '100%',
          outline: 'none',
          direction: 'ltr',
          unicodeBidi: 'bidi-override'
        }}
        onInput={(e) => setContent(e.currentTarget.textContent || '')}
      />

      {/* Status Bar */}
      <div className="h-6 bg-gray-100 border-t flex items-center px-2 text-sm">
        <span>Page 1</span>
        <span className="mx-2">|</span>
        <span>Words: {content.split(/\s+/).filter(Boolean).length}</span>
        <span className="mx-2">|</span>
        <span>Characters: {content.length}</span>
      </div>
    </div>
  );
}