import { useState, useRef, useEffect } from 'react';

export function CommandPromptContent() {
  const [history, setHistory] = useState<string[]>([
    'Microsoft(R) Windows 95\nCopyright (C) Microsoft Corp 1981-1995\n\nC:\\WINDOWS>',
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (command: string) => {
    const commands: Record<string, () => string> = {
      help: () => 'Available commands: help, dir, cls, ver, date, time, echo',
      dir: () =>
        'Directory of C:\\WINDOWS\n\nDIR1    <DIR>    System32\nDIR2    <DIR>    Program Files\nFILE1.txt    1024    Document\nFILE2.exe    2048    Application',
      cls: () => '',
      ver: () =>
        'Ver: Windows 95 [Version 4.00.950]\nMade By: Akshit Ohri\nStatus: Zinda >_<}',
      date: () => new Date().toLocaleDateString(),
      time: () => new Date().toLocaleTimeString(),
      echo: () => command.slice(5),
    };

    const cmd = command.toLowerCase().split(' ')[0];
    const output = commands[cmd]
      ? commands[cmd]()
      : `'${command}' is not recognized as an internal or external command, operable program or batch file.`;

    return output;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newHistory = [...history];
      if (currentCommand.trim()) {
        newHistory.push(`C:\\WINDOWS>${currentCommand}`);
        const output = handleCommand(currentCommand.trim());
        if (output) newHistory.push(output);
      }
      newHistory.push('C:\\WINDOWS>');
      setHistory(newHistory);
      setCurrentCommand('');
    }
  };

  return (
    <div className="bg-black text-white font-mono text-sm p-2 h-full">
      <div ref={outputRef} className="whitespace-pre-wrap mb-2">
        {history.slice(0, -1).join('\n')}
      </div>
      <div className="flex">
        <span>{history[history.length - 1]}</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none ml-1"
          autoFocus
        />
      </div>
    </div>
  );
}