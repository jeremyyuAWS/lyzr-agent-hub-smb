import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Save, X, Loader2, AlertCircle, CheckCircle, Search, Filter, Tag, Eye } from 'lucide-react';
import { agentsApi, Agent } from '../lib/supabase';

const AdminSettings: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [currentTagInput, setCurrentTagInput] = useState('');
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: '',
    category: 'sales',
    description: '',
    tags: [],
    demo_url: null,
    status: 'coming_soon'
  });

  const categories = [
    { id: 'sales', label: 'Sales' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'customer-service', label: 'Customer Service' },
    { id: 'hr', label: 'HR' },
    { id: 'finance', label: 'Finance' }
  ];

  const statusOptions = [
    { id: 'live', label: 'Live' },
    { id: 'coming_soon', label: 'Coming Soon' },
    { id: 'optional', label: 'Optional' }
  ];

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    let filtered = agents;

    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(agent => agent.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(agent => agent.status === filterStatus);
    }

    setFilteredAgents(filtered);
  }, [agents, searchTerm, filterCategory, filterStatus]);

  const loadAgents = async () => {
    setLoading(true);
    const data = await agentsApi.getAllAgents();
    setAgents(data);
    setLoading(false);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const resetForm = () => {
    setNewAgent({
      name: '',
      category: 'sales',
      description: '',
      tags: [],
      demo_url: null,
      status: 'coming_soon'
    });
    setCurrentTagInput('');
  };

  const handleAddAgent = async () => {
    // Only enforce required fields for Live agents
    if (newAgent.status === 'live' && (!newAgent.name?.trim() || !newAgent.description?.trim() || !newAgent.demo_url?.trim())) {
      showNotification('error', 'Name, description, and demo link are required for Live agents');
      return;
    }
    
    // Name is always required regardless of status
    if (!newAgent.name?.trim()) {
      showNotification('error', 'Agent name is required');
      return;
    }

    setSaving(true);
    const agent = await agentsApi.createAgent({
      name: newAgent.name.trim(),
      category: newAgent.category as Agent['category'],
      description: newAgent.description.trim(),
      tags: newAgent.tags || [],
      demo_url: newAgent.demo_url?.trim() || null,
      status: newAgent.status as Agent['status']
    });

    if (agent) {
      setAgents([agent, ...agents]);
      showNotification('success', `${agent.name} added successfully!`);
      resetForm();
      setIsAddingAgent(false);
    } else {
      showNotification('error', 'Failed to add agent. Please try again.');
    }
    setSaving(false);
  };

  const handleEditAgent = async () => {
    // Only enforce required fields for Live agents
    if (editingAgent?.status === 'live' && (!editingAgent?.name?.trim() || !editingAgent?.description?.trim() || !editingAgent?.demo_url?.trim())) {
      showNotification('error', 'Name, description, and demo link are required for Live agents');
      return;
    }
    
    // Name is always required regardless of status
    if (!editingAgent?.name?.trim()) {
      showNotification('error', 'Agent name is required');
      return;
    }

    setSaving(true);
    const updatedAgent = await agentsApi.updateAgent(editingAgent.id, {
      name: editingAgent.name.trim(),
      category: editingAgent.category,
      description: editingAgent.description.trim(),
      tags: editingAgent.tags || [],
      demo_url: editingAgent.demo_url?.trim() || null,
      status: editingAgent.status
    });

    if (updatedAgent) {
      setAgents(agents.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent));
      showNotification('success', `${updatedAgent.name} updated successfully!`);
      setEditingAgent(null);
      setCurrentTagInput('');
    } else {
      showNotification('error', 'Failed to update agent. Please try again.');
    }
    setSaving(false);
  };

  const handleDeleteAgent = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      const success = await agentsApi.deleteAgent(id);
      if (success) {
        setAgents(agents.filter(agent => agent.id !== id));
        showNotification('success', `${name} deleted successfully!`);
      } else {
        showNotification('error', 'Failed to delete agent. Please try again.');
      }
    }
  };

  const addTag = (tagText: string, isEditing = false) => {
    const trimmedTag = tagText.trim();
    if (!trimmedTag) return;

    const currentAgent = isEditing ? editingAgent : newAgent;
    const currentTags = currentAgent?.tags || [];
    
    if (!currentTags.includes(trimmedTag)) {
      const newTags = [...currentTags, trimmedTag];
      if (isEditing && editingAgent) {
        setEditingAgent({ ...editingAgent, tags: newTags });
      } else {
        setNewAgent({ ...newAgent, tags: newTags });
      }
    }
    setCurrentTagInput('');
  };

  const removeTag = (tagToRemove: string, isEditing = false) => {
    const currentAgent = isEditing ? editingAgent : newAgent;
    const currentTags = currentAgent?.tags || [];
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    
    if (isEditing && editingAgent) {
      setEditingAgent({ ...editingAgent, tags: newTags });
    } else {
      setNewAgent({ ...newAgent, tags: newTags });
    }
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent, isEditing = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(currentTagInput, isEditing);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'coming_soon': return 'bg-yellow-100 text-yellow-800';
      case 'optional': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-blue-100 text-blue-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'customer-service': return 'bg-purple-100 text-purple-800';
      case 'hr': return 'bg-orange-100 text-orange-800';
      case 'finance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAgentForm = (agent: Partial<Agent>, isEditing = false) => {
    const currentAgent = isEditing ? editingAgent : newAgent;
    const updateAgent = isEditing ? setEditingAgent : setNewAgent;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Agent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentAgent?.name || ''}
              onChange={(e) => updateAgent({ ...currentAgent, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Lead Scoring Agent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={currentAgent?.category || 'sales'}
              onChange={(e) => updateAgent({ ...currentAgent, category: e.target.value as Agent['category'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description {currentAgent?.status === 'live' && <span className="text-red-500">*</span>}
          </label>
          <textarea
            value={currentAgent?.description || ''}
            onChange={(e) => updateAgent({ ...currentAgent, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Describe what this agent does and its key benefits..."
          />
          {currentAgent?.status !== 'live' && (
            <p className="text-xs text-gray-500 mt-1">Required only for Live agents</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              value={currentTagInput}
              onChange={(e) => setCurrentTagInput(e.target.value)}
              onKeyPress={(e) => handleTagInputKeyPress(e, isEditing)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a tag and press Enter to add"
            />
            <p className="text-xs text-gray-500 mt-1">Press Enter to add each tag</p>
            
            {/* Display Tags */}
            {currentAgent?.tags && currentAgent.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {currentAgent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full group"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag, isEditing)}
                      className="ml-2 text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={currentAgent?.status || 'coming_soon'}
              onChange={(e) => updateAgent({ ...currentAgent, status: e.target.value as Agent['status'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Demo Link {currentAgent?.status === 'live' && <span className="text-red-500">*</span>}
          </label>
          <input
            type="url"
            value={currentAgent?.demo_url || ''}
            onChange={(e) => updateAgent({ ...currentAgent, demo_url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/demo"
          />
          <p className="text-xs text-gray-500 mt-1">
            {currentAgent?.status === 'live' 
              ? 'Required for Live agents - link to working demo' 
              : 'Optional for Coming Soon/Optional agents'
            }
          </p>
        </div>
      </div>
    );
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
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border flex items-center space-x-2 ${
          notification.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Agent Management</h2>
          <p className="text-gray-600 mt-1">Add, edit, and manage AI agents in your showcase</p>
        </div>
        <button
          onClick={() => setIsAddingAgent(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Agent</span>
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status.id} value={status.id}>{status.label}</option>
            ))}
          </select>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredAgents.length} of {agents.length} agents</span>
          <div className="flex items-center space-x-4">
            <span>Live: {agents.filter(a => a.status === 'live').length}</span>
            <span>Coming Soon: {agents.filter(a => a.status === 'coming_soon').length}</span>
            <span>Optional: {agents.filter(a => a.status === 'optional').length}</span>
          </div>
        </div>
      </div>

      {/* Add New Agent Form */}
      {isAddingAgent && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Add New Agent</h3>
            <button
              onClick={() => {
                setIsAddingAgent(false);
                resetForm();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {renderAgentForm(newAgent)}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setIsAddingAgent(false);
                resetForm();
              }}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAgent}
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Adding...' : 'Add Agent'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {editingAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-black">Edit Agent: {editingAgent.name}</h3>
              <button
                onClick={() => {
                  setEditingAgent(null);
                  setCurrentTagInput('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {renderAgentForm(editingAgent, true)}
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setEditingAgent(null);
                  setCurrentTagInput('');
                }}
                className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditAgent}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agents Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-black text-lg">{agent.name}</h4>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(agent.category)}`}>
                    {categories.find(c => c.id === agent.category)?.label}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {statusOptions.find(s => s.id === agent.status)?.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => handleDeleteAgent(agent.id, agent.name)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Agent"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">{agent.description}</p>

            {/* Tags */}
            {agent.tags && agent.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {agent.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {agent.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{agent.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Demo URL */}
            {agent.demo_url && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Live Demo Available</span>
                </div>
                <a
                  href={agent.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline break-all"
                >
                  {agent.demo_url}
                </a>
              </div>
            )}

            {/* Metadata */}
            <div className="text-xs text-gray-500 space-y-1">
              <div>Created: {new Date(agent.created_at).toLocaleDateString()}</div>
              <div>Updated: {new Date(agent.updated_at).toLocaleDateString()}</div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setEditingAgent(agent)}
                className="flex-1 bg-white border border-gray-300 text-black py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              
              {agent.demo_url && (
                <button
                  onClick={() => window.open(agent.demo_url!, '_blank')}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center space-x-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' ? (
              <>
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No agents match your filters</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                    setFilterStatus('all');
                  }}
                  className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            ) : (
              <>
                <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No agents configured</h3>
                <p className="text-gray-600 mb-4">Get started by adding your first AI agent to the showcase.</p>
                <button
                  onClick={() => setIsAddingAgent(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add First Agent
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {agents.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-black mb-4">Agent Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(category => {
              const count = agents.filter(agent => agent.category === category.id).length;
              const liveCount = agents.filter(agent => agent.category === category.id && agent.status === 'live').length;
              
              return (
                <div key={category.id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 text-sm">{category.label}</h4>
                  <p className="text-2xl font-bold text-black mt-1">{count}</p>
                  <p className="text-xs text-gray-600">{liveCount} live</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;