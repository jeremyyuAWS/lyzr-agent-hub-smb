import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, Building, Users, CreditCard, Settings, Play } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  actor: 'MSP' | 'SI' | 'SMB';
  completed: boolean;
  current: boolean;
}

interface ProvisioningFlowProps {
  onStartDemo: () => void;
}

const ProvisioningFlow: React.FC<ProvisioningFlowProps> = ({ onStartDemo }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: FlowStep[] = [
    {
      id: 'msp_add_si',
      title: 'MSP Adds System Integrator',
      description: 'MSP creates SI account, defines domain, assigns licenses',
      actor: 'MSP',
      completed: true,
      current: false
    },
    {
      id: 'si_accepts',
      title: 'SI Accepts & Configures',
      description: 'SI configures white-labeling, branding, custom domains',
      actor: 'SI',
      completed: true,
      current: false
    },
    {
      id: 'si_adds_smb',
      title: 'SI Adds SMB Tenant',
      description: 'SI creates SMB account, allocates licenses from pool',
      actor: 'SI',
      completed: true,
      current: false
    },
    {
      id: 'smb_setup',
      title: 'SMB Completes Setup',
      description: 'SMB owner completes company profile, billing details',
      actor: 'SMB',
      completed: false,
      current: true
    },
    {
      id: 'user_invite',
      title: 'Invite Users & Assign Roles',
      description: 'SMB owner invites admins, assigns agent permissions',
      actor: 'SMB',
      completed: false,
      current: false
    },
    {
      id: 'user_onboard',
      title: 'User Onboarding',
      description: 'Users log in via SSO, access Agent Hub, start using agents',
      actor: 'SMB',
      completed: false,
      current: false
    }
  ];

  const getActorIcon = (actor: string) => {
    switch (actor) {
      case 'MSP': return Building;
      case 'SI': return Settings;
      case 'SMB': return Users;
      default: return Circle;
    }
  };

  const getActorColor = (actor: string) => {
    switch (actor) {
      case 'MSP': return 'bg-purple-100 text-purple-600';
      case 'SI': return 'bg-blue-100 text-blue-600';
      case 'SMB': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-black">Provisioning Flow</h3>
          <p className="text-sm text-gray-600">End-to-end tenant onboarding process</p>
        </div>
        <button 
          onClick={onStartDemo}
          className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Demo Flow</span>
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = getActorIcon(step.actor);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="relative">
              <div className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                step.current 
                  ? 'border-blue-500 bg-blue-50' 
                  : step.completed 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
              }`}>
                {/* Step Indicator */}
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : step.current ? (
                    <Circle className="w-6 h-6 text-blue-600 animate-pulse" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${getActorColor(step.actor)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Step Status */}
                  <div className="flex items-center space-x-2 mt-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActorColor(step.actor)}`}>
                      {step.actor}
                    </span>
                    {step.completed && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    )}
                    {step.current && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                {step.current && (
                  <button 
                    onClick={() => setCurrentStep(index + 1)}
                    className="flex-shrink-0 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                )}
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-black">
            {steps.filter(s => s.completed).length}/{steps.length} Steps Complete
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProvisioningFlow;