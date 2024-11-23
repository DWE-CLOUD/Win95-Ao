import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = {
  File: ['New', 'Open', 'Save', 'Save As...', 'Print', 'Exit'],
  Edit: ['Undo', 'Cut', 'Copy', 'Paste', 'Delete'],
  View: ['Status Bar', 'Tool Bar', 'Full Screen'],
  Help: ['Help Topics', 'About']
};

export function MenuBar() {
  return (
    <div className="flex border-b-2 border-gray-400 text-sm">
      {Object.entries(menuItems).map(([menu, items]) => (
        <DropdownMenu key={menu}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="px-4 py-1 h-7 rounded-none hover:bg-blue-700 hover:text-white"
            >
              {menu}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#c0c0c0] border-2 border-white rounded-none min-w-40">
            {items.map((item) => (
              <DropdownMenuItem 
                key={item}
                className="rounded-none focus:bg-blue-700 focus:text-white"
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  );
}