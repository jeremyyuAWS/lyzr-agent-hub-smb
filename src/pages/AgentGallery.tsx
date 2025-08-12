import React, { useState, useEffect } from 'react';
import { ExternalLink, Bot, Tag, Search, Loader2 } from 'lucide-react';
import { agentsApi, Agent } from '../lib/supabase';

interface AgentGalleryProps {
  category: string;
  refreshKey?: number; // Add refresh key to force re-render
}

const AgentGallery: React.FC<AgentGalleryProps> = ({ category, refreshKey }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [allAgents, setAllAgents] = useState<Agent[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAgents();
  }, [category, refreshKey]); // Add refreshKey as dependency

  const loadAgents = async () => {
    setLoading(true);
    
    if (category === 'all') {
      // Load all agents and group by category
      const allData = await agentsApi.getAllAgents();
      setAllAgents(allData);
      
      // Get categories from localStorage or defaults
      const savedCategories = localStorage.getItem('sidebarCategories');
      const categoryList = savedCategories ? JSON.parse(savedCategories) : [
        { id: 'sales', label: 'Sales', icon: 'TrendingUp', color: 'text-blue-600' },
        { id: 'marketing', label: 'Marketing', icon: 'Megaphone', color: 'text-green-600' },
        { id: 'customer-service', label: 'Customer Service', icon: 'Headphones', color: 'text-purple-600' },
        { id: 'hr', label: 'HR', icon: 'UserCheck', color: 'text-orange-600' },
        { id: 'finance', label: 'Finance', icon: 'DollarSign', color: 'text-red-600' },
      ];
      setCategories(categoryList);
      setAgents([]);
    } else {
      // Load agents for specific category
      const data = await agentsApi.getAgentsByCategory(category);
      
      // Apply custom ordering if it exists
      const orderedAgents = getCustomAgentOrder(data, category);
      setAgents(orderedAgents);
      setAllAgents([]);
    }
    
    setLoading(false);
  };

  const getCustomAgentOrder = (agents: Agent[], category: string): Agent[] => {
    const savedOrders = localStorage.getItem('agentOrders');
    if (!savedOrders) return agents;
    
    try {
      const orders = JSON.parse(savedOrders);
      const customOrder = orders[category];
      if (!customOrder || !Array.isArray(customOrder)) return agents;
      
      const orderedAgents = [];
      // First add agents in the custom order
      for (const agentId of customOrder) {
        const agent = agents.find(a => a.id === agentId);
        if (agent) orderedAgents.push(agent);
      }
      // Then add any new agents not in the custom order
      for (const agent of agents) {
        if (!customOrder.includes(agent.id)) {
          orderedAgents.push(agent);
        }
      }
      return orderedAgents;
    } catch {
      return agents;
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFilteredAgentsByCategory = () => {
    if (category !== 'all') return { [category]: filteredAgents };
    
    const agentsByCategory: Record<string, Agent[]> = {};
    
    categories.forEach(cat => {
      const categoryAgents = allAgents.filter(agent => 
        agent.category === cat.id &&
        (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      
      // Apply custom ordering for this category
      const orderedAgents = getCustomAgentOrder(categoryAgents, cat.id);
      if (orderedAgents.length > 0) {
        agentsByCategory[cat.id] = orderedAgents;
      }
    });
    
    return agentsByCategory;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'coming_soon': return 'bg-yellow-100 text-yellow-800';
      case 'optional': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live';
      case 'coming_soon': return 'Coming Soon';
      case 'optional': return 'Optional';
      default: return status;
    }
  };

  const getCategoryTitle = (category: string) => {
    if (category === 'all') return 'All Agent Categories';
    switch (category) {
      case 'sales': return 'Sales Automation Agents';
      case 'marketing': return 'Marketing Content Agents';
      case 'customer-service': return 'Customer Service Agents';
      case 'hr': return 'Human Resources Agents';
      case 'finance': return 'Finance & Accounting Agents';
      default: return 'AI Agents';
    }
  };

  const getCategoryDescription = (category: string) => {
    if (category === 'all') return 'Browse all available agents organized by business function';
    switch (category) {
      case 'sales': return 'Automate your sales process from lead generation to closing deals';
      case 'marketing': return 'Create compelling content and manage your marketing campaigns';
      case 'customer-service': return 'Provide exceptional customer support and service';
      case 'hr': return 'Streamline HR processes and employee management';
      case 'finance': return 'Manage finances, accounting, and financial analysis';
      default: return 'AI-powered agents for business automation';
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    const categoryData = categories.find(cat => cat.id === categoryId);
    return categoryData || { label: categoryId, color: 'text-gray-600' };
  };

  const renderAllCategoriesView = () => {
    const agentsByCategory = getFilteredAgentsByCategory();
    const hasResults = Object.values(agentsByCategory).some(agents => agents.length > 0);
    
    if (!hasResults && !loading) {
      return (
        <div className="text-center py-12">
          <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-600">Try adjusting your search terms or check back later for new agents.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        {categories.map(categoryData => {
          const categoryAgents = agentsByCategory[categoryData.id];
          if (!categoryAgents || categoryAgents.length === 0) return null;
          
          return (
            <div key={categoryData.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center space-x-3 pb-2 border-b border-gray-200">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${categoryData.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <div className={`w-3 h-3 rounded ${categoryData.color.replace('text-', 'bg-')}`}></div>
                </div>
                <h3 className="text-xl font-bold text-black">{categoryData.label}</h3>
                <span className="text-sm text-gray-500">({categoryAgents.length} agents)</span>
              </div>
              
              {/* Category Agents */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Bot className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-black">{agent.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                            {getStatusText(agent.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{agent.description}</p>

                    {/* Demo URL for live agents */}
                    {agent.status === 'live' && agent.demo_url && (
                      <div className="mb-4">
                        <a
                          href={agent.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="max-w-[200px] truncate">{agent.demo_url}</span>
                        </a>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex space-x-2">
                      {agent.status === 'live' ? (
                        <button 
                          onClick={() => handleLaunchAgent(agent)}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Launch Demo
                        </button>
                      ) : agent.status === 'coming_soon' ? (
                        <button className="w-full bg-yellow-100 border border-yellow-300 text-yellow-800 py-2 px-4 rounded-lg cursor-not-allowed font-medium">
                          Coming Soon
                        </button>
                      ) : (
                        <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                          Request Access
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSingleCategoryView = () => {
    if (filteredAgents.length === 0 && !loading) {
      return (
        <div className="text-center py-12">
          <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-600">Try adjusting your search terms or check back later for new agents.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Bot className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black">{agent.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {getStatusText(agent.status)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{agent.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {agent.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <div className="flex space-x-2">
              {agent.status === 'live' ? (
                <button 
                  onClick={() => handleLaunchAgent(agent)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Launch Demo
                </button>
              ) : agent.status === 'coming_soon' ? (
                <button className="w-full bg-yellow-100 border border-yellow-300 text-yellow-800 py-2 px-4 rounded-lg cursor-not-allowed font-medium">
                  Coming Soon
                </button>
              ) : (
                <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Request Access
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleLaunchAgent = (agent: Agent) => {
    if (agent.demo_url) {
      window.open(agent.demo_url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`${agent.name} demo is not available yet. Check back soon!`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading agents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">{getCategoryTitle(category)}</h2>
          <p className="text-gray-600 mt-1">{getCategoryDescription(category)}</p>
        </div>
        <div className="text-sm text-gray-500">
          {filteredAgents.length} agents available
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Render appropriate view */}
      {category === 'all' ? renderAllCategoriesView() : renderSingleCategoryView()}
    </div>
  );
};

export default AgentGallery;