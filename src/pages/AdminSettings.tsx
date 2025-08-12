import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Save, X, Loader2, AlertCircle, CheckCircle, Search, Filter, Tag, Eye, ArrowUp, ArrowDown, GripVertical, Palette, Type } from 'lucide-react';
import { agentsApi, Agent } from '../lib/supabase';

interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface AdminSettingsProps {
  categories: Category[];
  onUpdateCategories: (categories: Category[]) => void;
  iconMap: Record<string, React.ComponentType<{ className?: string }>>;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ categories, onUpdateCategories, iconMap }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [managementTab, setManagementTab] = useState<'agents' | 'categories'>('agents');
  const [customOrder, setCustomOrder] = useState<Record<string, string[]>>({});
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [isCategoryReorderMode, setIsCategoryReorderMode] = useState(false);
  const [draggedAgent, setDraggedAgent] = useState<string | null>(null);
  const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddingAgent, setIsAddingAgent] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [currentTagInput, setCurrentTagInput] = useState('');
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    label: '',
    icon: 'TrendingUp',
    color: 'text-blue-600'
  });
  const [newAgent, setNewAgent] = useState<Partial<Agent>>({
    name: '',
    category: 'sales',
    description: '',
    tags: [],
    demo_url: null,
    status: 'coming_soon'
  });

  const availableIcons = Object.keys(iconMap);
  const colorOptions = [
    { value: 'text-blue-600', label: 'Blue' },
    { value: 'text-green-600', label: 'Green' },
    { value: 'text-purple-600', label: 'Purple' },
    { value: 'text-orange-600', label: 'Orange' },
    { value: 'text-red-600', label: 'Red' },
    { value: 'text-indigo-600', label: 'Indigo' },
    { value: 'text-pink-600', label: 'Pink' },
    { value: 'text-yellow-600', label: 'Yellow' }
  ];

  const statusOptions = [
    { id: 'live', label: 'Live' },
    { id: 'coming_soon', label: 'Coming Soon' },
    { id: 'optional', label: 'Optional' }
  ];

  useEffect(() => {
    loadAgents();
    loadCustomOrder();
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

    // Apply custom ordering if available and in reorder mode
    if (isReorderMode && filterCategory !== 'all' && customOrder[filterCategory]) {
      const orderMap = customOrder[filterCategory];
      filtered.sort((a, b) => {
        const indexA = orderMap.indexOf(a.id);
        const indexB = orderMap.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    } else {
      // Default alphabetical sorting
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredAgents(filtered);
  }, [agents, searchTerm, filterCategory, filterStatus, isReorderMode, customOrder]);

  const loadAgents = async () => {
    setLoading(true);
    const data = await agentsApi.getAllAgents();
    setAgents(data);
    setLoading(false);
  };

  const loadCustomOrder = () => {
    const savedOrder = localStorage.getItem('agentCustomOrder');
    if (savedOrder) {
      setCustomOrder(JSON.parse(savedOrder));
    }
  };

  const saveCustomOrder = (newOrder: Record<string, string[]>) => {
    setCustomOrder(newOrder);
    localStorage.setItem('agentCustomOrder', JSON.stringify(newOrder));
  };

  const handleDragStart = (e: React.DragEvent, agentId: string) => {
    setDraggedAgent(agentId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', agentId);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedAgent || filterCategory === 'all') return;
    
    const categoryAgents = filteredAgents.map(agent => agent.id);
    const draggedIndex = categoryAgents.indexOf(draggedAgent);
    
    if (draggedIndex === -1) return;
    
    // Reorder the array
    const newOrder = [...categoryAgents];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    
    // Update custom order
    const updatedCustomOrder = {
      ...customOrder,
      [filterCategory]: newOrder
    };
    
    saveCustomOrder(updatedCustomOrder);
    setDraggedAgent(null);
    setDragOverIndex(null);
    
    showNotification('success', 'Agent order updated successfully!');
  };

  const resetToAlphabetical = () => {
    if (filterCategory === 'all') return;
    
    const updatedCustomOrder = { ...customOrder };
    delete updatedCustomOrder[filterCategory];
    saveCustomOrder(updatedCustomOrder);
    
    showNotification('success', 'Reset to alphabetical order!');
  };

  const toggleReorderMode = () => {
    setIsReorderMode(!isReorderMode);
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
          <h2 className="text-2xl font-bold text-black">Platform Administration</h2>
          <p className="text-gray-600 mt-1">Manage agents, categories, and platform configuration</p>
        </div>
        <div className="flex space-x-2">
          {managementTab === 'agents' && (
            <button
              onClick={() => setIsAddingAgent(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Agent</span>
            </button>
          )}
          {managementTab === 'categories' && (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Management Tabs */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setManagementTab('agents')}
            className={`px-6 py-4 font-medium transition-colors ${
              managementTab === 'agents'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Agent Management ({agents.length})
          </button>
          <button
            onClick={() => setManagementTab('categories')}
            className={`px-6 py-4 font-medium transition-colors ${
              managementTab === 'categories'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Category Management ({categories.length})
          </button>
        </div>
      </div>

      {/* Category Management Tab */}
      {managementTab === 'categories' && (
        <>
          {/* Category Controls */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-black">Sidebar Categories</h3>
                <p className="text-sm text-gray-600">Manage the category tabs shown in the left sidebar</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsCategoryReorderMode(!isCategoryReorderMode)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    isCategoryReorderMode 
                      ? 'bg-green-600 text-white' 
                      : 'bg-white border border-gray-300 text-black hover:bg-gray-50'
                  }`}
                >
                  {isCategoryReorderMode ? 'Exit Reorder' : 'Reorder Categories'}
                </button>
              </div>
            </div>
            
            {isCategoryReorderMode && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Reorder Mode:</strong> Drag and drop categories to change their order in the sidebar
                </p>
              </div>
            )}
          </div>

          {/* Add New Category Form */}
          {isAddingCategory && (
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-black">Add New Category</h3>
                <button
                  onClick={() => {
                    setIsAddingCategory(false);
                    setNewCategory({
                      label: '',
                      icon: 'TrendingUp',
                      color: 'text-blue-600'
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderCategoryForm(newCategory)}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsAddingCategory(false);
                    setNewCategory({
                      label: '',
                      icon: 'TrendingUp',
                      color: 'text-blue-600'
                    });
                  }}
                  className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  disabled={saving}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? 'Adding...' : 'Add Category'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Edit Category Modal */}
          {editingCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-black">Edit Category: {editingCategory.label}</h3>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {renderCategoryForm(editingCategory, true)}
                </div>

                <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditCategory}
                    disabled={saving}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || iconMap.TrendingUp;
              const agentCount = agents.filter(agent => agent.category === category.id).length;
              
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-2xl p-6 shadow-md border transition-all ${
                    isCategoryReorderMode
                      ? 'border-green-200 hover:border-green-400 cursor-move hover:shadow-lg'
                      : 'border-gray-100 hover:shadow-lg'
                  } ${
                    dragOverIndex === index ? 'border-green-500 bg-green-50 scale-105' : ''
                  } ${
                    draggedCategory === category.id ? 'opacity-50 scale-95' : ''
                  }`}
                  draggable={isCategoryReorderMode}
                  onDragStart={(e) => handleCategoryDragStart(e, category.id)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleCategoryDrop(e, index)}
                >
                  {/* Drag Handle */}
                  {isCategoryReorderMode && (
                    <div className="flex items-center justify-center mb-3 text-gray-400">
                      <GripVertical className="w-5 h-5" />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <IconComponent className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black">{category.label}</h4>
                        <p className="text-sm text-gray-600">{agentCount} agents</p>
                      </div>
                    </div>
                    
                    {!isCategoryReorderMode && (
                      <button
                        onClick={() => handleDeleteCategory(category.id, category.label)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Icon:</span>
                      <span className="font-medium">{category.icon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Color:</span>
                      <span className={`font-medium ${category.color}`}>
                        {colorOptions.find(c => c.value === category.color)?.label}
                      </span>
                    </div>
                  </div>

                  {/* Position indicator in reorder mode */}
                  {isCategoryReorderMode && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <p className="text-sm text-green-800 font-medium">
                        Position #{index + 1}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {!isCategoryReorderMode && (
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="w-full bg-white border border-gray-300 text-black py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Category</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Agent Management Tab */}
      {managementTab === 'agents' && (
        <>
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
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleReorderMode}
              disabled={filterCategory === 'all'}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isReorderMode 
                  ? 'bg-blue-600 text-white' 
                  : filterCategory === 'all'
                    ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-black hover:bg-gray-50'
              }`}
            >
              {isReorderMode ? 'Exit Reorder' : 'Reorder Agents'}
            </button>
            
            {isReorderMode && filterCategory !== 'all' && customOrder[filterCategory] && (
              <button
                onClick={resetToAlphabetical}
                className="px-3 py-1 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Reset to Alphabetical
              </button>
            )}
            
            {filterCategory === 'all' && (
              <p className="text-sm text-gray-500 italic">
                Select a specific category to enable agent reordering
              </p>
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            <span>Showing {filteredAgents.length} of {agents.length} agents</span>
          </div>
        </div>
        
        {isReorderMode && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Reorder Mode:</strong> {filterCategory === 'all' 
                ? 'Category automatically selected for reordering' 
                : 'Drag and drop agents to reorder them within this category'}
            </p>
          </div>
        )}
        
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <span></span>
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
        {filteredAgents.map((agent, index) => (
          <div 
            key={agent.id}
            className={`bg-white rounded-2xl p-6 shadow-md border transition-all ${
              isReorderMode && filterCategory !== 'all'
                ? 'border-blue-200 hover:border-blue-400 cursor-move hover:shadow-lg'
                : 'border-gray-100 hover:shadow-lg'
            } ${
              dragOverIndex === index ? 'border-blue-500 bg-blue-50 scale-105' : ''
            } ${
              draggedAgent === agent.id ? 'opacity-50 scale-95' : ''
            }`}
            draggable={isReorderMode && filterCategory !== 'all'}
            onDragStart={(e) => handleDragStart(e, agent.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
          >
            {/* Drag Handle */}
            {isReorderMode && filterCategory !== 'all' && (
              <div className="flex items-center justify-center mb-2 text-gray-400">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div>
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
                  {isReorderMode && filterCategory !== 'all' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      #{index + 1}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-2">
                {!isReorderMode && (
                  <button
                    onClick={() => handleDeleteAgent(agent.id, agent.name)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Agent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
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
            {!isReorderMode && (
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
            )}
            
            {/* Reorder Mode Instructions */}
            {isReorderMode && filterCategory !== 'all' && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-sm text-blue-800 font-medium">
                  Drag to reorder • Position #{index + 1}
                </p>
              </div>
            )}
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
        </>
      )}
    </div>
  );
};

export default AdminSettings;