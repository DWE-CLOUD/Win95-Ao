import { useState, useEffect } from 'react';

export function BootScreen() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      { text: 'Starting Windows 95...', duration: 1000 },
      { text: 'Loading system files...', duration: 500 },
      { text: 'Initializing device drivers...', duration: 500 },
      { text: 'Loading user settings...', duration: 500 },
      { text: 'Preparing Windows...', duration: 500 },
    ];

    let timeout: number;
    let progressInterval: number;

    const startProgress = () => {
      let currentProgress = 0;
      progressInterval = window.setInterval(() => {
        currentProgress += 1;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 30);
    };

    const runSteps = (currentStep: number) => {
      if (currentStep < steps.length) {
        setStep(currentStep);
        timeout = window.setTimeout(() => {
          runSteps(currentStep + 1);
        }, steps[currentStep].duration);
      }
    };

    startProgress();
    runSteps(0);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
    };
  }, []);

  const steps = [
    'Starting Windows 95...',
    'Loading system files...',
    'Initializing device drivers...',
    'Loading user settings...',
    'Preparing Windows...',
  ];

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-white text-center space-y-8 max-w-md w-full px-4">
        <div className="space-y-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Logo_1992.svg/1200px-Windows_Logo_1992.svg.png"
            alt="Windows 95"
            className="w-64 mx-auto"
          />
          <div className="text-xl font-bold">{steps[step]}</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mx-auto">
          <div className="win95-window p-1">
            <div className="h-5 bg-[#c0c0c0] relative overflow-hidden">
              <div 
                className="h-full bg-[#000080] transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-2 bg-[#c0c0c0] animate-progress"
                    style={{
                      left: `${i * 20}%`,
                      animation: 'progressStripe 1s infinite linear',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressStripe {
          from { transform: translateX(-100%); }
          to { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
}