import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CalculatorContent() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return first / second;
      default: return second;
    }
  };

  const performCalculation = () => {
    if (operator === null || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  return (
    <div className="w-64 mx-auto">
      <div className="bg-[#eee] p-2 text-right mb-2 font-mono text-xl border-2 border-gray-400">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {['7', '8', '9', '/'].map(key => (
          <CalcButton
            key={key}
            onClick={() => isNaN(Number(key)) ? handleOperator(key) : inputDigit(key)}
          >
            {key}
          </CalcButton>
        ))}
        {['4', '5', '6', '*'].map(key => (
          <CalcButton
            key={key}
            onClick={() => isNaN(Number(key)) ? handleOperator(key) : inputDigit(key)}
          >
            {key}
          </CalcButton>
        ))}
        {['1', '2', '3', '-'].map(key => (
          <CalcButton
            key={key}
            onClick={() => isNaN(Number(key)) ? handleOperator(key) : inputDigit(key)}
          >
            {key}
          </CalcButton>
        ))}
        {['0', '.', '=', '+'].map(key => (
          <CalcButton
            key={key}
            onClick={() => {
              if (key === '=') performCalculation();
              else if (key === '.') inputDecimal();
              else if (isNaN(Number(key))) handleOperator(key);
              else inputDigit(key);
            }}
          >
            {key}
          </CalcButton>
        ))}
        <CalcButton
          className="col-span-4"
          onClick={clear}
        >
          Clear
        </CalcButton>
      </div>
    </div>
  );
}

function CalcButton({ 
  children, 
  onClick,
  className = ''
}: { 
  children: React.ReactNode; 
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      className={`h-10 ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}