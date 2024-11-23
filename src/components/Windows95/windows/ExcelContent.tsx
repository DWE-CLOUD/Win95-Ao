import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Save,
  FileText,
  Printer,
  Plus,
  Minus,
  Equal,
  Percent,
  Calculator
} from "lucide-react";

type CellData = {
  value: string;
  formula?: string;
};

const ROWS = 20;
const COLS = 10;

export function ExcelContent() {
  const [data, setData] = useState<Record<string, CellData>>({});
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [formulaBar, setFormulaBar] = useState('');

  const getCellId = (row: number, col: number) => {
    const colLetter = String.fromCharCode(65 + col);
    return `${colLetter}${row + 1}`;
  };

  const calculateFormula = (formula: string): string => {
    try {
      // Remove the = sign and evaluate basic arithmetic
      const result = Function(`'use strict'; return (${formula.substring(1)})`)();
      return result.toString();
    } catch {
      return '#ERROR';
    }
  };

  const handleCellChange = (cellId: string, value: string) => {
    const newData = { ...data };
    
    if (value.startsWith('=')) {
      newData[cellId] = {
        value: calculateFormula(value),
        formula: value
      };
    } else {
      newData[cellId] = { value };
    }
    
    setData(newData);
  };

  const handleCellClick = (cellId: string) => {
    setActiveCell(cellId);
    setFormulaBar(data[cellId]?.formula || data[cellId]?.value || '');
  };

  const handleFormulaBarChange = (value: string) => {
    setFormulaBar(value);
    if (activeCell) {
      handleCellChange(activeCell, value);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Spreadsheet</title>
            <style>
              table { border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 4px; }
            </style>
          </head>
          <body>
            <table>
              ${Array.from({ length: ROWS }).map((_, row) => `
                <tr>
                  ${Array.from({ length: COLS }).map((_, col) => `
                    <td>${data[getCellId(row, col)]?.value || ''}</td>
                  `).join('')}
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b">
        <div className="flex gap-1">
          <Button variant="outline" size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-1">
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Equal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Percent className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calculator className="h-4 w-4" />
          </Button>
        </div>

        <Input
          value={formulaBar}
          onChange={(e) => handleFormulaBarChange(e.target.value)}
          className="flex-1 font-mono"
          placeholder="Formula Bar"
        />
      </div>

      {/* Spreadsheet */}
      <div className="overflow-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="w-10"></th>
              {Array.from({ length: COLS }).map((_, i) => (
                <th key={i} className="border px-2 py-1 bg-gray-100 font-normal">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ROWS }).map((_, row) => (
              <tr key={row}>
                <td className="border px-2 py-1 bg-gray-100 text-center">
                  {row + 1}
                </td>
                {Array.from({ length: COLS }).map((_, col) => {
                  const cellId = getCellId(row, col);
                  return (
                    <td key={cellId} className="border p-0">
                      <input
                        type="text"
                        value={data[cellId]?.value || ''}
                        onChange={(e) => handleCellChange(cellId, e.target.value)}
                        onClick={() => handleCellClick(cellId)}
                        className="w-full h-full px-2 py-1 border-none focus:outline-none"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}