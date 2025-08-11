import React from 'react';
import { Bot, TrendingUp, Clock, Users, ExternalLink } from 'lucide-react';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    role: string;
    goal: string;
    inputs: string;
    outputs: string;
    usageCount: number;
    adoptionRate: number;
    avgResponseTime: string;
    category: string;
    demoUrl?: string;
  };
  onDeploy: (agentId: string) => void;
  perspective?: string;
  isDeployed?: boolean;
  isNewlyDeployed?: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  onDeploy, 
  perspective = 'msp', 
  isDeployed = false, 
  isNewlyDeployed = false 
}) => {
  const getButtonText = () => {
    switch (perspective) {
      case 'msp': return isDeployed ? 'Deployed to SIs' : 'Deploy to SI';
      case 'si': return isDeployed ? 'Deployed to SMBs' : 'Deploy to SMB';
      case 'smb': return 'Launch Agent';
      default: return isDeployed ? 'Deployed' : 'Deploy Agent';
    }
  };

  const getButtonStyle = () => {
    if (perspective === 'smb') {
      return "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium";
    }
    
    if (isDeployed) {
      return "w-full bg-green-100 border border-green-300 text-green-800 py-2 px-4 rounded-lg cursor-default font-medium";
    }
    
    return "w-full bg-white border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium";
  };

  return (
    <div className="agent-card bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Bot className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-black">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {agent.demoUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(agent.demoUrl, '_blank', 'noopener,noreferrer');
              }}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
            {agent.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">{agent.goal}</p>

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-1">Inputs</h4>
          <p className="text-sm text-gray-600">{agent.inputs}</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-1">Outputs</h4>
          <p className="text-sm text-gray-600">{agent.outputs}</p>
        </div>
      </div>

      {/* Show stats for MSP/SI, hide for SMB to focus on functionality */}
      {perspective !== 'smb' && (
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{agent.usageCount.toLocaleString()} calls</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{agent.adoptionRate}% adoption</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{agent.avgResponseTime}</span>
          </div>
        </div>
      )}

      <button
        onClick={() => onDeploy(agent.id)}
        className={getButtonStyle()}
        disabled={isDeployed && perspective !== 'smb'}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default AgentCard;