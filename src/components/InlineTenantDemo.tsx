import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Building, Users, CreditCard, TrendingUp, AlertTriangle, CheckCircle, ArrowRight, Zap, Target, Activity } from 'lucide-react';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  action: string;
  highlight: string;
  duration: number;
  businessValue: string;
}

interface InlineTenantDemoProps {
  perspective: 'msp' | 'si' | 'smb';
}

const InlineTenantDemo: React.FC<InlineTenantDemoProps> = ({ perspective }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const demoScenarios = {
    msp: [
      {
        id: 'msp_ecosystem_health',
        title: 'Ecosystem Health Monitoring',
        description: 'Monitor 47 System Integrators with real-time performance metrics',
        action: 'CloudPro Services shows 90% utilization - needs immediate attention',
        highlight: 'Partner at capacity limit',
        duration: 4000,
        businessValue: 'Prevent revenue loss through proactive partner support'
      },
      {
        id: 'msp_license_allocation',
        title: 'Smart License Management', 
        description: 'AI detects NetSecure Ltd growing at 31.4% - allocate more licenses',
        action: 'Automatically recommend 10 additional licenses for expansion',
        highlight: 'Growth opportunity identified',
        duration: 4000,
        businessValue: 'Capture $2.8K additional monthly revenue through expansion'
      },
      {
        id: 'msp_new_partner',
        title: 'Partner Onboarding',
        description: 'VelocityTech Partners requests platform access for construction vertical',
        action: 'Deploy 25-license starter package with white-label branding',
        highlight: 'New vertical expansion',
        duration: 4000,
        businessValue: 'Enter construction market with 95% confidence potential'
      },
      {
        id: 'msp_optimization',
        title: 'Revenue Optimization',
        description: 'AI identifies $12.4K monthly revenue opportunity across ecosystem',
        action: 'Execute optimization recommendations across 8 high-potential partners',
        highlight: 'AI-powered growth strategy',
        duration: 4000,
        businessValue: 'Increase ecosystem revenue by 23.5% through strategic optimization'
      }
    ],
    si: [
      {
        id: 'si_client_health',
        title: 'Client Portfolio Monitoring',
        description: 'Track 35 SMB clients - Global Dynamics shows excellent performance',
        action: 'Global Dynamics at 94% efficiency - ready for agent expansion',
        highlight: 'Top performing client',
        duration: 4000,
        businessValue: 'Identify $1.2K upselling opportunity with high-value client'
      },
      {
        id: 'si_agent_deployment',
        title: 'Strategic Agent Deployment',
        description: 'Sigma Systems underutilizing Operations Agent - training opportunity',
        action: 'Deploy targeted training program to increase adoption by 40%',
        highlight: 'Usage optimization',
        duration: 4000,
        businessValue: 'Unlock $600 monthly value through improved agent adoption'
      },
      {
        id: 'si_new_client',
        title: 'Client Onboarding',
        description: 'Healthcare startup Velocity Healthcare requests 8-license package',
        action: 'Deploy Healthcare Agent bundle with compliance features',
        highlight: 'Healthcare vertical entry',
        duration: 4000,
        businessValue: 'Secure $5K monthly revenue with specialized healthcare offering'
      },
      {
        id: 'si_expansion',
        title: 'Portfolio Expansion',
        description: 'Request 15 additional licenses from MSP to support growth pipeline',
        action: 'Justify expansion with 25.2% portfolio growth rate evidence',
        highlight: 'Capacity expansion',
        duration: 4000,
        businessValue: 'Scale portfolio to support $18K additional monthly revenue'
      }
    ],
    smb: [
      {
        id: 'smb_team_performance',
        title: 'Team Performance Analytics',
        description: 'Marketing team leads at 92% efficiency with Finance close behind',
        action: 'Operations team has 60% growth potential - deploy training program',
        highlight: 'Department optimization',
        duration: 4000,
        businessValue: 'Unlock $8K additional monthly savings through team optimization'
      },
      {
        id: 'smb_agent_adoption',
        title: 'Agent Adoption Strategy',
        description: 'Sarah Chen generates 47 outputs monthly - share best practices',
        action: 'Cross-train Finance team on Sarah\'s Marketing Agent techniques',
        highlight: 'Knowledge transfer',
        duration: 4000,
        businessValue: 'Increase team-wide productivity by 15% through skill sharing'
      },
      {
        id: 'smb_license_optimization',
        title: 'License Efficiency',
        description: 'Unused Admin license detected - deploy Support Agent for customer service',
        action: 'Activate dormant license to handle 50+ customer inquiries monthly',
        highlight: 'License activation',
        duration: 4000,
        businessValue: 'Generate $1.2K monthly value from previously unused license'
      },
      {
        id: 'smb_expansion',
        title: 'Team Expansion',
        description: 'Department growth requires 2 additional licenses for new hires',
        action: 'Request license expansion to support Sales and Customer Success teams',
        highlight: 'Team growth',
        duration: 4000,
        businessValue: 'Support business growth with AI-powered team scaling'
      }
    ]
  };

  const currentScenario = demoScenarios[perspective];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentStep(current => {
              const nextStep = (current + 1) % currentScenario.length;
              return nextStep;
            });
            return 0;
          }
          return prev + (100 / (currentScenario[currentStep].duration / 100));
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, currentScenario]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const currentDemo = currentScenario[currentStep];

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
      case 'msp': return Building;
      case 'si': return Users;
      case 'smb': return Activity;
      default: return Target;
    }
  };

  const Icon = getPerspectiveIcon();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getPerspectiveColor()} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {perspective === 'msp' ? 'MSP Ecosystem Demo' : 
                   perspective === 'si' ? 'SI Portfolio Demo' : 'SMB Team Demo'}
                </h3>
                <p className="text-sm opacity-90">
                  {perspective === 'msp' ? 'Managing 47 System Integrators' : 
                   perspective === 'si' ? 'Managing 35 SMB Clients' : 'Optimizing 24-person team'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlayPause}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-2 rounded-lg transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={handleReset}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm p-2 rounded-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm opacity-90">
            Step {currentStep + 1} of {currentScenario.length} • {isPlaying ? 'Playing' : 'Paused'}
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-br ${getPerspectiveColor()} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
            {currentStep === 0 ? <TrendingUp className="w-6 h-6" /> :
             currentStep === 1 ? <Target className="w-6 h-6" /> :
             currentStep === 2 ? <Users className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-bold text-black mb-2">{currentDemo.title}</h4>
            <p className="text-gray-700 mb-3">{currentDemo.description}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">Action Required:</span>
              </div>
              <p className="text-sm text-blue-800">{currentDemo.action}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900">Business Impact:</span>
              </div>
              <p className="text-sm text-green-800">{currentDemo.businessValue}</p>
            </div>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className={`bg-gradient-to-r ${getPerspectiveColor()} bg-opacity-10 border-l-4 border-current p-4 rounded-r-lg`}>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 opacity-80" />
            <span className="font-medium">{currentDemo.highlight}</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {currentScenario.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-8 h-2 rounded-full transition-all ${
                  index === currentStep ? getPerspectiveColor().includes('purple') ? 'bg-purple-500' :
                                         getPerspectiveColor().includes('blue') ? 'bg-blue-500' : 'bg-green-500'
                                       : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            Auto-playing tenant management scenarios
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineTenantDemo;