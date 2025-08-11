import React, { useState, useEffect } from 'react';
import { X, Clock, Download, Eye, Bot, Search } from 'lucide-react';

interface AgentExecution {
  id: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  inputs: Record<string, any>;
  results: string;
  status: 'completed' | 'failed' | 'running';
}

interface AgentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewExecution: (execution: AgentExecution) => void;
}

const AgentHistoryModal: React.FC<AgentHistoryModalProps> = ({ isOpen, onClose, onViewExecution }) => {
  const [executions, setExecutions] = useState<AgentExecution[]>([]);
  const [filteredExecutions, setFilteredExecutions] = useState<AgentExecution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAgent, setFilterAgent] = useState('all');

  useEffect(() => {
    if (isOpen) {
      const history = JSON.parse(localStorage.getItem('agentHistory') || '[]');
      setExecutions(history);
      setFilteredExecutions(history);
    }
  }, [isOpen]);

  useEffect(() => {
    let filtered = executions;
    
    if (searchTerm) {
      filtered = filtered.filter(exec =>
        exec.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(exec.inputs).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterAgent !== 'all') {
      filtered = filtered.filter(exec => exec.agentId === filterAgent);
    }
    
    setFilteredExecutions(filtered);
  }, [executions, searchTerm, filterAgent]);

  const uniqueAgents = Array.from(new Set(executions.map(e => e.agentId)))
    .map(id => executions.find(e => e.agentId === id))
    .filter(Boolean) as AgentExecution[];

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredExecutions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent_history_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-black">Agent Execution History</h2>
            <p className="text-sm text-gray-600">{filteredExecutions.length} executions found</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Export History"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search executions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterAgent}
                onChange={(e) => setFilterAgent(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Agents</option>
                {uniqueAgents.map(agent => (
                  <option key={agent.agentId} value={agent.agentId}>
                    {agent.agentName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Execution List */}
        <div className="flex-1 overflow-y-auto">
          {filteredExecutions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Bot className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No executions found</p>
              <p className="text-sm">Start using agents to see execution history here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredExecutions.map((execution) => (
                <div key={execution.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-black">{execution.agentName}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(execution.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                        {execution.status}
                      </span>
                      <button
                        onClick={() => onViewExecution(execution)}
                        className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Input Summary */}
                  <div className="ml-11">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Inputs:</span>
                      {Object.entries(execution.inputs).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="ml-2">
                          {key}: <span className="font-medium">{String(value).substring(0, 50)}...</span>
                        </span>
                      ))}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {execution.results.substring(0, 150)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentHistoryModal;