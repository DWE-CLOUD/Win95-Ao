interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <div 
      className="win95-desktop-icon select-none"
      onClick={onClick}
      onDoubleClick={onClick}
      tabIndex={0}
    >
      <div className="text-3xl mb-1">
        {icon}
      </div>
      <div className="win95-desktop-icon-label">
        {label}
      </div>
    </div>
  );
}