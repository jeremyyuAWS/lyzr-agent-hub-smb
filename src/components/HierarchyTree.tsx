import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Building, Users, Bot, CreditCard, Plus, Settings } from 'lucide-react';

interface HierarchyNode {
  si: {
    id: string;
    name: string;
    licenses: number;
    usedLicenses: number;
    smbs: number;
    users: number;
    revenue: number;
    status: string;
  };
  smbList: Array<{
    id: string;
    name: string;
    licenses: number;
    users: number;
    agentCalls: number;
    favoriteAgent: string;
    lastActive: string;
    status: string;
  }>;
}

interface HierarchyTreeProps {
  data: HierarchyNode[];
  onAddSI: () => void;
  onAddSMB: (siId: string) => void;
  onManageLicenses: (siId: string) => void;
}

const HierarchyTree: React.FC<HierarchyTreeProps> = ({ 
  data, 
  onAddSI, 
  onAddSMB, 
  onManageLicenses 
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-black">3-Tier Ecosystem Hierarchy</h3>
          <p className="text-sm text-gray-600 mt-1">MSP → System Integrators → SMB Customers</p>
        </div>
        <button 
          onClick={onAddSI}
          className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add SI</span>
        </button>
      </div>

      <div className="p-6">
        {/* MSP Level */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Building className="w-6 h-6 text-blue-600" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900">Lyzr Technologies (MSP)</h4>
              <p className="text-sm text-blue-700">47 SIs • 284 SMBs • 1,247 Users • 850/1000 Licenses</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-900">$89,450</p>
              <p className="text-xs text-blue-700">Monthly Revenue</p>
            </div>
          </div>
        </div>

        {/* SI Level */}
        <div className="space-y-3">
          {data.map((node) => {
            const isExpanded = expandedNodes.has(node.si.id);
            const utilizationRate = (node.si.usedLicenses / node.si.licenses) * 100;
            
            return (
              <div key={node.si.id} className="border border-gray-200 rounded-lg">
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toggleNode(node.si.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-black">{node.si.name}</h5>
                          <p className="text-sm text-gray-600">
                            {node.si.smbs} SMBs • {node.si.users} Users • 
                            {node.si.usedLicenses}/{node.si.licenses} Licenses
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-black">${node.si.revenue.toLocaleString()}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  utilizationRate > 80 ? 'bg-red-500' : 
                                  utilizationRate > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${utilizationRate}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{utilizationRate.toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onManageLicenses(node.si.id)}
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                        title="Manage Licenses"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAddSMB(node.si.id)}
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                        title="Add SMB"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SMB Level */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <div className="space-y-2">
                      {node.smbList.map((smb) => (
                        <div key={smb.id} className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 rounded-lg ml-6">
                              <Users className="w-4 h-4 text-purple-600" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h6 className="font-medium text-black">{smb.name}</h6>
                                  <p className="text-xs text-gray-600">
                                    {smb.users} Users • {smb.licenses} Licenses • 
                                    {smb.agentCalls} Calls • Prefers {smb.favoriteAgent}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    smb.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {smb.status}
                                  </span>
                                  <p className="text-xs text-gray-500 mt-1">Last: {smb.lastActive}</p>
                                </div>
                              </div>
                            </div>
                            
                            <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HierarchyTree;