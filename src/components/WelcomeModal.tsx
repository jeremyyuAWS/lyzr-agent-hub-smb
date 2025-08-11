import React, { useState, useEffect } from 'react';
import { X, CheckCircle, TrendingUp, Users, Zap, ArrowRight, Play } from 'lucide-react';
import helpContent from '../data/help_content.json';

interface WelcomeModalProps {
  perspective: 'msp' | 'si' | 'smb';
  isOpen: boolean;
  onClose: () => void;
  onStartTour?: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ perspective, isOpen, onClose, onStartTour }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  if (!isOpen) return null;

  const welcomeData = helpContent.welcome[perspective];
  
  const getPerspectiveColor = () => {
    switch (perspective) {
      case 'msp': return 'from-purple-500 to-purple-600';
      case 'si': return 'from-blue-500 to-blue-600';
      case 'smb': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPerspectiveIcon = () => {
    switch (perspective) {
      case 'msp': return TrendingUp;
      case 'si': return Users;
      case 'smb': return Zap;
      default: return CheckCircle;
    }
  };

  const Icon = getPerspectiveIcon();
  const steps = ['Welcome', 'Key Benefits', 'Getting Started', 'Success Metrics'];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${getPerspectiveColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">{welcomeData.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{welcomeData.subtitle}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{welcomeData.overview}</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black mb-4">Key Benefits for Your Organization</h3>
            <div className="space-y-3">
              {welcomeData.key_benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 text-sm font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black mb-4">Getting Started - Quick Wins</h3>
            <div className="space-y-3">
              {welcomeData.getting_started.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className={`w-6 h-6 bg-gradient-to-br ${getPerspectiveColor()} text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                    {index + 1}
                  </div>
                  <p className="text-blue-800 text-sm font-medium">{step}</p>
                </div>
              ))}
            </div>
            {onStartTour && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-indigo-900">Want a guided tour?</p>
                    <p className="text-sm text-indigo-700">Take an interactive walkthrough of key features</p>
                  </div>
                  <button
                    onClick={() => {
                      onStartTour();
                      onClose();
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    Start Tour
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black mb-4">Track Your Success</h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Success Metrics to Monitor:</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{welcomeData.success_metrics}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">You're all set!</span>
              </div>
              <p className="text-sm text-green-700">
                Start exploring your dashboard to see real-time metrics and begin optimizing your {
                  perspective === 'msp' ? 'partner ecosystem' :
                  perspective === 'si' ? 'client portfolio' :
                  'team productivity'
                }.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getPerspectiveColor()} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Icon className="w-8 h-8" />
                <div>
                  <h1 className="text-xl font-bold">Welcome to Control Tower</h1>
                  <p className="text-sm opacity-90">
                    {perspective === 'msp' ? 'MSP Command Center' : 
                     perspective === 'si' ? 'System Integrator Portal' : 'SMB Team Dashboard'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index <= currentStep 
                      ? 'bg-white text-gray-900' 
                      : 'bg-white bg-opacity-30 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-all ${
                      index < currentStep ? 'bg-white' : 'bg-white bg-opacity-30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-sm opacity-90">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dontShowAgain"
              className="rounded border-gray-300"
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem('lyzr_welcome_seen', 'true');
                }
              }}
            />
            <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
              Don't show this again
            </label>
          </div>
          
          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`bg-gradient-to-r ${getPerspectiveColor()} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className={`bg-gradient-to-r ${getPerspectiveColor()} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2`}
              >
                <span>Get Started</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;