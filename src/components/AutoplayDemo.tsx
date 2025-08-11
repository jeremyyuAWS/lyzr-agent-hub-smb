import React, { useState, useEffect } from 'react';
import { Play, Pause, X } from 'lucide-react';

interface DemoStep {
  step: number;
  title: string;
  description: string;
  target: string;
  duration: number;
}

interface AutoplayDemoProps {
  steps: DemoStep[];
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

const AutoplayDemo: React.FC<AutoplayDemoProps> = ({ steps, isActive, onStart, onStop }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && isActive) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsPlaying(false);
          setCurrentStep(0);
        }
      }, steps[currentStep]?.duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, steps, isActive]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    onStart();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    onStop();
  };

  if (!isActive) {
    return (
      <button
        onClick={handleStart}
        className="fixed bottom-20 right-6 bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-40"
      >
        <Play className="w-6 h-6 text-gray-700" />
      </button>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 m-4 max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-black">Demo Walkthrough</h3>
          <button onClick={handleStop} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {currentStepData && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                Step {currentStepData.step} of {steps.length}
              </span>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-2">{currentStepData.title}</h4>
              <p className="text-gray-600 text-sm">{currentStepData.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="bg-gray-200 rounded-full h-2 flex-1 mx-4">
                <div 
                  className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoplayDemo;