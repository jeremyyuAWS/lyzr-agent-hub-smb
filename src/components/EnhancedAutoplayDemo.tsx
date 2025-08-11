import React, { useState, useEffect } from 'react';
import { Play, Pause, X, ArrowRight, Users, Bot, TrendingUp, DollarSign } from 'lucide-react';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  persona: 'msp' | 'si' | 'smb';
 tab: string;
  steps: DemoStep[];
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  target: string;
  highlight: 'metrics' | 'chart' | 'table' | 'agent' | 'button';
  duration: number;
  action?: string;
  businessValue?: string;
}

interface EnhancedAutoplayDemoProps {
  currentTab: string;
  currentPerspective: string;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onPerspectiveChange: (perspective: string) => void;
 onTabChange: (tab: string) => void;
}

const EnhancedAutoplayDemo: React.FC<EnhancedAutoplayDemoProps> = ({
  currentTab,
  currentPerspective,
  isActive,
  onStart,
  onStop,
 onPerspectiveChange,
 onTabChange
}) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBusinessValue, setShowBusinessValue] = useState(false);

  const scenarios: DemoScenario[] = [
    {
      id: 'msp_ecosystem_overview',
      title: 'MSP: Managing the Ecosystem',
      description: 'A day in the life of an MSP Admin managing 47 System Integrators',
      persona: 'msp',
     tab: 'dashboard',
      steps: [
        {
          id: 'msp_dashboard',
          title: 'Ecosystem Health Check',
          description: 'Monitor 47 SIs, 284 SMBs, and $89K monthly revenue at a glance',
          target: '.metrics-cards',
          highlight: 'metrics',
          duration: 4000,
          businessValue: 'Real-time visibility prevents revenue leaks and identifies growth opportunities'
        },
        {
          id: 'msp_si_performance',
          title: 'Partner Performance Analysis',
          description: 'NetSecure Ltd shows 31.4% growth - our top performer needs more licenses',
          target: '.usage-chart',
          highlight: 'chart',
          duration: 4000,
          businessValue: 'Data-driven partner management increases ecosystem revenue by 25%'
        },
        {
          id: 'msp_license_allocation',
          title: 'Strategic License Management',
          description: 'CloudPro Services at 90% utilization - reallocate 10 licenses immediately',
          target: '.agent-grid',
          highlight: 'table',
          duration: 4000,
          action: 'Navigate to License Manager',
          businessValue: 'Proactive license management prevents churn and maximizes utilization'
        }
      ]
    },
   {
     id: 'msp_tenant_management',
     title: 'MSP: Strategic Tenant Analytics',
     description: 'Managing partner ecosystem with advanced tenant intelligence',
     persona: 'msp',
     tab: 'tenants',
     steps: [
       {
         id: 'msp_tenant_overview',
         title: 'Partner Portfolio Intelligence',
         description: '47 System Integrators generating $91K monthly with 85% license utilization',
         target: '.metrics-cards',
         highlight: 'metrics',
         duration: 4000,
         businessValue: 'Ecosystem-wide visibility drives 23.5% revenue growth through optimized partner management'
       },
       {
         id: 'msp_token_analytics',
         title: 'Token Economics Mastery',
         description: '45.7M tokens consumed with NetSecure Ltd showing highest efficiency at 88%',
         target: '.token-chart',
         highlight: 'chart',
         duration: 4000,
         businessValue: 'Token analytics prevent cost overruns and identify $12K+ monthly optimization opportunities'
       },
       {
         id: 'msp_partner_drilldown',
         title: 'Deep Partner Analysis',
         description: 'Click "View as CloudPro Services" to analyze their 35 SMB client portfolio',
         target: '.tenant-grid',
         highlight: 'button',
         duration: 4000,
         action: 'Switch to SI Perspective',
         businessValue: 'Cross-tier visibility enables strategic partner support and expansion planning'
       }
     ]
   },
   {
     id: 'msp_intelligence_insights',
     title: 'MSP: Predictive Intelligence',
     description: 'AI-powered ecosystem forecasting and strategic optimization',
     persona: 'msp',
     tab: 'insights',
     steps: [
       {
         id: 'msp_ecosystem_roi',
         title: 'Ecosystem ROI Intelligence',
         description: '340% token ROI with 23.5% partner revenue growth - NetSecure needs capacity expansion',
         target: '.metrics-cards',
         highlight: 'metrics',
         duration: 4000,
         businessValue: 'AI-driven insights predict revenue opportunities worth $30K+ in Q2 expansion'
       },
       {
         id: 'msp_predictive_analytics',
         title: 'Strategic Forecasting',
         description: 'Q2 projections show 1,300 license demand (+30%) with $118.5K revenue potential',
         target: '.forecast-chart',
         highlight: 'chart',
         duration: 4000,
         businessValue: 'Predictive modeling enables proactive capacity planning and prevents revenue loss'
       },
       {
         id: 'msp_growth_opportunities',
         title: 'AI-Powered Growth Recommendations',
         description: 'CloudPro Services high utilization alert - recommend 5 additional licenses for $325/month',
         target: '.opportunities-panel',
         highlight: 'table',
         duration: 4000,
         businessValue: 'Automated optimization recommendations drive 15% ecosystem efficiency improvement'
       }
     ]
   },
    {
      id: 'si_portfolio_management',
      title: 'SI: Growing Client Portfolio',
      description: 'CloudPro Services managing 35 SMB clients with strategic growth',
      persona: 'si',
     tab: 'dashboard',
      steps: [
        {
          id: 'si_portfolio',
          title: 'Client Portfolio Review',
          description: 'Monitor 35 SMB clients - Global Dynamics is top revenue generator at $4.9K',
          target: '.metrics-cards',
          highlight: 'metrics',
          duration: 4000,
          businessValue: 'Client insights drive 25% portfolio revenue growth'
        },
        {
          id: 'si_agent_deployment',
          title: 'Strategic Agent Deployment',
          description: 'Deploy Finance Agent to Sigma Systems healthcare workflows',
          target: '.agent-grid',
          highlight: 'agent',
          duration: 4000,
          action: 'Deploy Agent to SMB',
          businessValue: 'Targeted agent deployment increases client engagement by 40%'
        },
        {
          id: 'si_growth_opportunity',
          title: 'Expansion Opportunity',
          description: 'Request 5 more licenses from MSP to onboard 2 new healthcare SMBs',
          target: '.chat-panel',
          highlight: 'button',
          duration: 4000,
          businessValue: 'Strategic expansion grows monthly recurring revenue by $12K'
        }
      ]
    },
   {
     id: 'si_client_intelligence',
     title: 'SI: Client Portfolio Intelligence',
     description: 'CloudPro Services optimizing 35 SMB clients with advanced analytics',
     persona: 'si',
     tab: 'tenants',
     steps: [
       {
         id: 'si_portfolio_analytics',
         title: 'Portfolio Performance Dashboard',
         description: '8.9M tokens, 89% utilization, $5.3K profit margin across 35 clients',
         target: '.metrics-cards',
         highlight: 'metrics',
         duration: 4000,
         businessValue: 'Portfolio analytics drive 31.5% profit growth through optimized client management'
       },
       {
         id: 'si_client_optimization',
         title: 'Client Usage Intelligence',
         description: 'Global Dynamics shows 94% efficiency - ready for Operations Agent upsell worth +$800/month',
         target: '.client-grid',
         highlight: 'table',
         duration: 4000,
         businessValue: 'Usage intelligence identifies $2.4K quarterly expansion opportunities per client'
       },
       {
         id: 'si_client_drilldown',
         title: 'Deep Client Analysis',
         description: 'Click "View Global Dynamics" to analyze their 24-person team productivity metrics',
         target: '.tenant-card',
         highlight: 'button',
         duration: 4000,
         action: 'Switch to SMB View',
         businessValue: 'Client-level insights enable targeted support and reduce churn by 40%'
       }
     ]
   },
   {
     id: 'si_revenue_intelligence',
     title: 'SI: Revenue Intelligence',
     description: 'Advanced revenue forecasting and client optimization insights',
     persona: 'si',
     tab: 'insights',
     steps: [
       {
         id: 'si_revenue_metrics',
         title: 'Portfolio ROI Analysis',
         description: '285% token ROI with 94% client retention - profit margin optimization at 23.1%',
         target: '.metrics-cards',
         highlight: 'metrics',
         duration: 4000,
         businessValue: 'Revenue intelligence drives 25.2% portfolio growth and 18.3% profit improvement'
       },
       {
         id: 'si_client_forecasting',
         title: 'Client Growth Forecasting',
         description: 'Global Dynamics 95% renewal probability - expand to Marketing automation for +$1.2K/month',
         target: '.forecast-chart',
         highlight: 'chart',
         duration: 4000,
         businessValue: 'Predictive client analytics prevent churn and identify $15K+ annual expansion revenue'
       },
       {
         id: 'si_optimization_insights',
         title: 'AI-Powered Client Recommendations',
         description: 'Sigma Systems underutilizing licenses - training session could unlock +$600/month value',
         target: '.recommendations-panel',
         highlight: 'table',
         duration: 4000,
         businessValue: 'Automated client optimization increases portfolio efficiency by 20%'
       }
     ]
   },
    {
      id: 'smb_team_productivity',
      title: 'SMB: Maximizing Team Productivity',
      description: 'Global Dynamics optimizing 24-person team with AI automation',
      persona: 'smb',
     tab: 'dashboard',
      steps: [
        {
          id: 'smb_team_overview',
          title: 'Team Productivity Dashboard',
          description: '22 active users, 198 agent calls this month, $12.6K cost savings achieved',
          target: '.metrics-cards',
          highlight: 'metrics',
          duration: 4000,
          businessValue: '32% productivity gain translates to $150K annual value'
        },
        {
          id: 'smb_agent_launch',
          title: 'Launch Marketing Campaign',
          description: 'Marketing team launches AI agent to create Q1 campaign content',
          target: '.agent-grid',
          highlight: 'agent',
          duration: 4000,
          action: 'Launch Marketing Agent',
          businessValue: 'AI content creation saves 45 hours per campaign, $4.5K value'
        },
        {
          id: 'smb_department_optimization',
          title: 'Department Optimization',
          description: 'Operations team adoption at 76% - opportunity for 60% more usage',
          target: '.usage-chart',
          highlight: 'chart',
          duration: 4000,
          businessValue: 'Full team adoption could generate additional $8K monthly savings'
        }
      ]
    },
   {
     id: 'smb_team_management',
     title: 'SMB: Advanced Team Management',
     description: 'Global Dynamics optimizing team performance with detailed analytics',
     persona: 'smb',
     tab: 'tenants',
     steps: [
       {
         id: 'smb_team_analytics',
         title: 'Team Performance Intelligence',
         description: '2.8M tokens, 94.7% utilization, $14.35 cost per call across 3 departments',
         target: '.metrics-cards',
         highlight: 'metrics',
         duration: 4000,
         businessValue: 'Team analytics drive 32% productivity improvement and $12.6K monthly savings'
       },
       {
         id: 'smb_department_insights',
         title: 'Department Efficiency Analysis',
         description: 'Marketing leads at 92% efficiency, Operations has 60% growth potential',
         target: '.department-grid',
         highlight: 'table',
         duration: 4000,
         businessValue: 'Department insights unlock $8K additional monthly value through optimization'
       },
       {
         id: 'smb_user_optimization',
         title: 'Individual User Performance',
         description: 'Sarah Chen (Marketing) generates 47 outputs monthly - cross-train Finance team on her approach',
         target: '.user-list',
         highlight: 'table',
         duration: 4000,
         businessValue: 'User-level insights enable knowledge transfer and 15% team-wide efficiency gains'
       }
     ]
   },
   {
     id: 'smb_productivity_intelligence',
     title: 'SMB: Productivity Intelligence',
     description: 'AI-powered team optimization and cost efficiency insights',
     persona: 'smb',
     tab: 'insights',
     steps: [
       {
         id: 'smb_productivity_metrics',
         title: 'Team Productivity Intelligence',
         description: '32% productivity gain, 87% license efficiency, 580% potential ROI with optimization',
         target: '.metrics-cards',
         highlight: 'metrics',
         duration: 4000,
         businessValue: 'Productivity intelligence drives $16.8K monthly value through optimized team performance'
       },
       {
         id: 'smb_optimization_forecast',
         title: 'Performance Forecasting',
         description: 'Next month projection: 42% productivity with full optimization implementation',
         target: '.forecast-chart',
         highlight: 'chart',
         duration: 4000,
         businessValue: 'Predictive modeling enables proactive team optimization and prevents efficiency loss'
       },
       {
         id: 'smb_ai_recommendations',
         title: 'AI-Powered Team Optimization',
         description: 'Unused Admin license - deploy Support Agent for customer service worth +$1,200/month',
         target: '.optimization-panel',
         highlight: 'table',
         duration: 4000,
         businessValue: 'AI recommendations unlock hidden productivity potential worth $20K+ annually'
       }
     ]
   }
  ];

  useEffect(() => {
    if (isPlaying && isActive) {
      const scenario = scenarios[currentScenario];
      const step = scenario.steps[currentStep];
      
      // Auto-switch perspective if needed
      if (currentPerspective !== scenario.persona) {
        onPerspectiveChange(scenario.persona);
      }

     // Auto-switch tab if needed
     if (currentTab !== scenario.tab) {
       onTabChange(scenario.tab);
     }
      const timer = setTimeout(() => {
        if (currentStep < scenario.steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else if (currentScenario < scenarios.length - 1) {
          setCurrentScenario(currentScenario + 1);
          setCurrentStep(0);
        } else {
          // Demo complete
          setIsPlaying(false);
          setCurrentScenario(0);
          setCurrentStep(0);
          setShowBusinessValue(false);
        }
      }, step.duration);

      // Show business value after 2 seconds
      const valueTimer = setTimeout(() => {
        if (step.businessValue) {
          setShowBusinessValue(true);
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(valueTimer);
      };
    }
  }, [isPlaying, currentStep, currentScenario, isActive, currentPerspective, onPerspectiveChange, scenarios]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentScenario(0);
    setCurrentStep(0);
    setShowBusinessValue(false);
    onStart();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentScenario(0);
    setCurrentStep(0);
    setShowBusinessValue(false);
    onStop();
  };

  const handleScenarioSelect = (scenarioIndex: number) => {
    setCurrentScenario(scenarioIndex);
    setCurrentStep(0);
    setShowBusinessValue(false);
    onPerspectiveChange(scenarios[scenarioIndex].persona);
   onTabChange(scenarios[scenarioIndex].tab);
  };

  if (!isActive) {
    return (
      <button
        onClick={handleStart}
        className="fixed bottom-20 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 pulse-animation"
        style={{
          animation: 'pulse 2s infinite'
        }}
      >
        <Play className="w-6 h-6" />
      </button>
    );
  }

  const scenario = scenarios[currentScenario];
  const step = scenario.steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      {/* Main Demo Interface */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${
              scenario.persona === 'msp' ? 'bg-purple-100 text-purple-600' :
              scenario.persona === 'si' ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600'
            }`}>
              {scenario.persona === 'msp' ? <TrendingUp className="w-5 h-5" /> :
               scenario.persona === 'si' ? <Users className="w-5 h-5" /> :
               <Bot className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-black">{scenario.title}</h3>
              <p className="text-sm text-gray-600">{scenario.description}</p>
            </div>
          </div>
          <button onClick={handleStop} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Selection */}
        <div className="px-6 py-4 border-b border-gray-200">
         <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {scenarios.map((s, index) => (
              <button
                key={s.id}
                onClick={() => handleScenarioSelect(index)}
               className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-center ${
                  currentScenario === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
               <div>{s.persona.toUpperCase()}</div>
               <div className="text-xs opacity-75">{s.tab}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              Step {currentStep + 1} of {scenario.steps.length}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black mb-2">{step.title}</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
          </div>

          {step.action && (
            <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">{step.action}</span>
            </div>
          )}

          {showBusinessValue && step.businessValue && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
              <div className="flex items-start space-x-2">
                <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-green-800 mb-1">Business Impact</h5>
                  <p className="text-sm text-green-700">{step.businessValue}</p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Demo Progress</span>
              <span>{Math.round((currentStep + 1) / scenario.steps.length * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep + 1) / scenario.steps.length * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Navigation */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={() => {
                if (currentStep < scenario.steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else if (currentScenario < scenarios.length - 1) {
                  setCurrentScenario(currentScenario + 1);
                  setCurrentStep(0);
                }
                setShowBusinessValue(false);
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out;
  }
`;
document.head.appendChild(style);

export default EnhancedAutoplayDemo;