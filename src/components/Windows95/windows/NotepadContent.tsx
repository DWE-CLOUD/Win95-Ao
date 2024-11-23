import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

export function NotepadContent() {
  const [content, setContent] = useState(
`Welcome to Windows 95 Notepad!

This is a simple text editor where you can:
- Take quick notes
- Write code
- Create todo lists
- And more...

Feel free to type anything here.`
  );

  return (
    <Textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full h-full min-h-[400px] font-mono text-sm resize-none p-4"
      placeholder="Start typing..."
    />
  );
}