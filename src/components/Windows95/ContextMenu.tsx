import { useState } from 'react';
import { 
  FolderPlus, 
  FileText, 
  RefreshCw, 
  Settings, 
  Layout,
  Grid,
  Monitor
} from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onNewWindow: () => void;
}

export function ContextMenu({ x, y, onNewWindow }: ContextMenuProps) {
  return (
    <div 
      className="fixed bg-[#c0c0c0] border-2 border-gray-400 shadow-md py-1 min-w-48"
      style={{ top: y, left: x }}
    >
      <ContextMenuGroup>
        <ContextMenuItem 
          text="New" 
          icon={<FolderPlus className="h-4 w-4" />}
          onClick={onNewWindow}
        >
          <div className="absolute left-full top-0 bg-[#c0c0c0] border-2 border-gray-400 shadow-md py-1 min-w-48">
            <ContextMenuItem 
              text="Folder" 
              icon={<FolderPlus className="h-4 w-4" />} 
            />
            <ContextMenuItem 
              text="Text Document" 
              icon={<FileText className="h-4 w-4" />} 
            />
          </div>
        </ContextMenuItem>
      </ContextMenuGroup>

      <ContextMenuDivider />

      <ContextMenuGroup>
        <ContextMenuItem 
          text="View" 
          icon={<Monitor className="h-4 w-4" />}
        >
          <div className="absolute left-full top-0 bg-[#c0c0c0] border-2 border-gray-400 shadow-md py-1 min-w-48">
            <ContextMenuItem 
              text="Large Icons" 
              icon={<Grid className="h-4 w-4" />} 
            />
            <ContextMenuItem 
              text="Small Icons" 
              icon={<Layout className="h-4 w-4" />} 
            />
          </div>
        </ContextMenuItem>
        <ContextMenuItem 
          text="Refresh" 
          icon={<RefreshCw className="h-4 w-4" />} 
        />
      </ContextMenuGroup>

      <ContextMenuDivider />

      <ContextMenuGroup>
        <ContextMenuItem 
          text="Properties" 
          icon={<Settings className="h-4 w-4" />} 
        />
      </ContextMenuGroup>
    </div>
  );
}

function ContextMenuGroup({ children }: { children: React.ReactNode }) {
  return <div className="py-1">{children}</div>;
}

function ContextMenuDivider() {
  return <div className="h-px bg-gray-400 my-1" />;
}

interface ContextMenuItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

function ContextMenuItem({ text, icon, onClick, children }: ContextMenuItemProps) {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      <button 
        className="w-full text-left px-4 py-1 hover:bg-blue-700 hover:text-white flex items-center gap-2"
        onClick={onClick}
      >
        {icon}
        <span>{text}</span>
        {children && <span className="ml-auto">▶</span>}
      </button>
      {showSubmenu && children}
    </div>
  );
}