import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RunDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRun: (command: string) => void;
}

export function RunDialog({ isOpen, onClose, onRun }: RunDialogProps) {
  const [command, setCommand] = useState('');

  const handleRun = () => {
    onRun(command);
    setCommand('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="win95-window">
        <DialogHeader>
          <DialogTitle>Run</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm mb-2 block">
              Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
            </label>
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter command..."
              className="font-mono"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleRun()}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={handleRun}>OK</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}