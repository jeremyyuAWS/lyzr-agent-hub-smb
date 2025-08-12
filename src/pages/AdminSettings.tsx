import React, { useState, useEffect } from 'react';
import { 
  Settings, Plus, Edit, Trash2, Save, X, GripVertical, 
  TrendingUp, Users, Headphones, UserCheck, DollarSign, Megaphone,
  Bot, Building, FileText, Globe, Shield, Zap, RotateCcw
} from 'lucide-react';
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

const AdminSettings: React.FC<AdminSettingsProps> = ({ 
  categories, 
  onUpdateCategories, 
  iconMap 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [isCategoryReorderMode, setIsCategoryReorderMode] = useState(false);
  const [draggedCategoryIndex, setDraggedCategoryIndex] = useState<number | null>(null);
  const [draggedAgentIndex, setDraggedAgentIndex] = useState<number | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: 'Bot',
    color: 'text-blue-600'
  });
  const [agentForm, setAgentForm] = useState({
    name: '',
    description: '',
    category: 'sales',
    tags: '',
    demo_url: '',
    status: 'coming_soon'
  });

  // Available icons for selection
  const availableIcons = [
    'TrendingUp', 'Users', 'Headphones', 'UserCheck', 'DollarSign', 'Megaphone',
    'Bot', 'Building', 'FileText', 'Globe', 'Shield', 'Zap', 'RotateCcw'
  ];

  // Color options
  const colorOptions = [
    { value: 'text-blue-600', label: 'Blue', bg: 'bg-blue-100' },
    { value: 'text-green-600', label: 'Green', bg: 'bg-green-100' },
    { value: 'text-purple-600', label: 'Purple', bg: 'bg-purple-100' },
    { value: 'text-orange-600', label: 'Orange', bg: 'bg-orange-100' },
    { value: 'text-red-600', label: 'Red', bg: 'bg-red-100' },
    { value: 'text-yellow-600', label: 'Yellow', bg: 'bg-yellow-100' },
    { value: 'text-indigo-600', label: 'Indigo', bg: 'bg-indigo-100' },
    { value: 'text-pink-600', label: 'Pink', bg: 'bg-pink-100' }
  ];

  // Load agents when category changes
  useEffect(() => {
    if (selectedCategory !== 'all') {
      loadAgents();
    } else {
      setAgents([]);
    }
  }, [selectedCategory]);

  const loadAgents = async () => {
    setLoading(true);
    const data = await agentsApi.getAgentsByCategory(selectedCategory);
    
    // Apply custom ordering if it exists
    const savedOrders = localStorage.getItem('agentOrders');
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        const customOrder = orders[selectedCategory];
        if (customOrder && Array.isArray(customOrder)) {
          const orderedAgents = [];
          // First add agents in the custom order
          for (const agentId of customOrder) {
            const agent = data.find(a => a.id === agentId);
            if (agent) orderedAgents.push(agent);
          }
          // Then add any new agents not in the custom order
          for (const agent of data) {
            if (!customOrder.includes(agent.id)) {
              orderedAgents.push(agent);
            }
          }
          setAgents(orderedAgents);
        } else {
          setAgents(data);
        }
      } catch {
        setAgents(data);
      }
    } else {
      setAgents(data);
    }
    setLoading(false);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      icon: 'Bot',
      color: 'text-blue-600'
    });
    setEditingCategory(null);
  };

  const resetAgentForm = () => {
    setAgentForm({
      name: '',
      description: '',
      category: selectedCategory !== 'all' ? selectedCategory : 'sales',
      tags: '',
      demo_url: '',
      status: 'coming_soon'
    });
    setEditingAgent(null);
  };

  const handleAddCategory = () => {
    resetCategoryForm();
    setShowCategoryForm(true);
  };

  const handleAddAgent = () => {
    if (selectedCategory === 'all') {
      alert('Please select a specific category first');
      return;
    }
    resetAgentForm();
    setShowAgentForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.label,
      icon: category.icon,
      color: category.color
    });
    setShowCategoryForm(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name,
      description: agent.description,
      category: agent.category,
      tags: agent.tags.join(', '),
      demo_url: agent.demo_url || '',
      status: agent.status
    });
    setShowAgentForm(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categories.length <= 1) {
      alert('Cannot delete the last category');
      return;
    }
    
    if (confirm('Are you sure you want to delete this category?')) {
      const newCategories = categories.filter(cat => cat.id !== categoryId);
      onUpdateCategories(newCategories);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      const success = await agentsApi.deleteAgent(agentId);
      if (success) {
        loadAgents(); // Reload the list
      } else {
        alert('Failed to delete agent');
      }
    }
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name.trim()) {
      alert('Category name is required');
      return;
    }

    const categoryId = categoryForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Check for duplicates (excluding current category if editing)
    const existingCategory = categories.find(cat => 
      cat.id === categoryId && (!editingCategory || cat.id !== editingCategory.id)
    );
    
    if (existingCategory) {
      alert('A category with this name already exists');
      return;
    }

    const newCategory: Category = {
      id: categoryId,
      label: categoryForm.name.trim(),
      icon: categoryForm.icon,
      color: categoryForm.color
    };

    let newCategories;
    if (editingCategory) {
      // Update existing category
      newCategories = categories.map(cat => 
        cat.id === editingCategory.id ? newCategory : cat
      );
    } else {
      // Add new category
      newCategories = [...categories, newCategory];
    }

    onUpdateCategories(newCategories);
    setShowCategoryForm(false);
    resetCategoryForm();
  };

  const handleSaveAgent = async () => {
    if (!agentForm.name.trim() || !agentForm.description.trim()) {
      alert('Agent name and description are required');
      return;
    }

    const agentData = {
      name: agentForm.name.trim(),
      description: agentForm.description.trim(),
      category: agentForm.category as 'sales' | 'marketing' | 'customer-service' | 'hr' | 'finance',
      tags: agentForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      demo_url: agentForm.demo_url.trim() || null,
      status: agentForm.status as 'live' | 'coming_soon' | 'optional'
    };

    let success = false;
    if (editingAgent) {
      success = !!(await agentsApi.updateAgent(editingAgent.id, agentData));
    } else {
      success = !!(await agentsApi.createAgent(agentData));
    }

    if (success) {
      setShowAgentForm(false);
      resetAgentForm();
      loadAgents(); // Reload the list
    } else {
      alert('Failed to save agent');
    }
  };

  const handleCancelCategory = () => {
    setShowCategoryForm(false);
    resetCategoryForm();
  };

  const handleCancelAgent = () => {
    setShowAgentForm(false);
    resetAgentForm();
  };

  const toggleCategoryReorderMode = () => {
    setIsCategoryReorderMode(!isCategoryReorderMode);
    if (isCategoryReorderMode) {
      // Save the current order when exiting reorder mode
      console.log('Category order saved');
    }
  };

  const toggleReorderMode = () => {
    if (selectedCategory === 'all') {
      alert('Please select a specific category to reorder agents');
      return;
    }
    
    if (isReorderMode) {
      // Save the current order when exiting reorder mode
      saveAgentOrder();
      alert('Agent order saved successfully!');
    }
    setIsReorderMode(!isReorderMode);
  };

  const saveAgentOrder = () => {
    // Save the actual current agent order
    const currentAgentOrder = agents.map(agent => agent.id);
    
    const savedOrders = localStorage.getItem('agentOrders');
    let orders = {};
    
    try {
      orders = savedOrders ? JSON.parse(savedOrders) : {};
    } catch {
      orders = {};
    }
    
    orders[selectedCategory] = currentAgentOrder;
    localStorage.setItem('agentOrders', JSON.stringify(orders));
  };

  const handleCategoryDragStart = (e: React.DragEvent, index: number) => {
    setDraggedCategoryIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCategoryDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedCategoryIndex === null) return;

    const newCategories = [...categories];
    const draggedCategory = newCategories[draggedCategoryIndex];
    newCategories.splice(draggedCategoryIndex, 1);
    newCategories.splice(dropIndex, 0, draggedCategory);

    onUpdateCategories(newCategories);
    setDraggedCategoryIndex(null);
  };

  const handleAgentDragStart = (e: React.DragEvent, index: number) => {
    setDraggedAgentIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleAgentDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedAgentIndex === null) return;

    const newAgents = [...agents];
    const draggedAgent = newAgents[draggedAgentIndex];
    newAgents.splice(draggedAgentIndex, 1);
    newAgents.splice(dropIndex, 0, draggedAgent);

    setAgents(newAgents);
    setDraggedAgentIndex(null);
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

  const renderCategoryForm = () => {
    if (!showCategoryForm) return null;

    const PreviewIcon = iconMap[categoryForm.icon] || Bot;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-black">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <button onClick={handleCancelCategory} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Customer Service"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <select
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableIcons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setCategoryForm(prev => ({ ...prev, color: color.value }))}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      categoryForm.color === color.value
                        ? 'border-gray-400 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${color.bg}`}
                  >
                    <span className={`text-sm font-medium ${color.value}`}>
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <PreviewIcon className={`w-5 h-5 ${categoryForm.color}`} />
                  <span className="font-medium text-gray-900">
                    {categoryForm.name || 'Category Name'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleCancelCategory}
              className="flex-1 bg-white border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCategory}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAgentForm = () => {
    if (!showAgentForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-black">
              {editingAgent ? 'Edit Agent' : 'Add New Agent'}
            </h3>
            <button onClick={handleCancelAgent} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Agent Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agent Name *
              </label>
              <input
                type="text"
                value={agentForm.name}
                onChange={(e) => setAgentForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Customer Support Agent"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={agentForm.description}
                onChange={(e) => setAgentForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of what this agent does..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={agentForm.category}
                onChange={(e) => setAgentForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                value={agentForm.tags}
                onChange={(e) => setAgentForm(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="automation, customer service, AI (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Demo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Demo URL
              </label>
              <input
                type="url"
                value={agentForm.demo_url}
                onChange={(e) => setAgentForm(prev => ({ ...prev, demo_url: e.target.value }))}
                placeholder="https://example.com/demo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={agentForm.status}
                onChange={(e) => setAgentForm(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="live">Live</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="optional">Optional</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleCancelAgent}
              className="flex-1 bg-white border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAgent}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingAgent ? 'Update Agent' : 'Add Agent'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Admin Settings</h2>
          <p className="text-gray-600 mt-1">Manage categories and configure agent organization</p>
        </div>
      </div>

      {/* Category Management Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-black">Category Management</h3>
            <p className="text-sm text-gray-600 mt-1">Organize your agents by business function</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleCategoryReorderMode}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isCategoryReorderMode ? 'Exit Reorder' : 'Reorder Categories'}
            </button>
            <button 
              onClick={handleAddCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Bot;
            
            return (
              <div
                key={category.id}
                draggable={isCategoryReorderMode}
                onDragStart={(e) => handleCategoryDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleCategoryDrop(e, index)}
                className={`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg transition-all ${
                  isCategoryReorderMode 
                    ? 'hover:bg-gray-50 cursor-move hover:scale-105 hover:shadow-md' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {isCategoryReorderMode && (
                  <GripVertical className="w-4 h-4 text-gray-400" />
                )}
                
                <div className={`p-2 rounded-lg ${colorOptions.find(c => c.value === category.color)?.bg || 'bg-gray-100'}`}>
                  <Icon className={`w-5 h-5 ${category.color}`} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-black">{category.label}</h4>
                  <p className="text-sm text-gray-600">Icon: {category.icon} • Color: {category.color}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent Management Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-black">Agent Management</h3>
            <p className="text-sm text-gray-600 mt-1">Configure agent visibility and ordering</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={toggleReorderMode}
              disabled={selectedCategory === 'all'}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isReorderMode
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white border border-gray-300 text-black hover:bg-gray-50'
              }`}
            >
              {isReorderMode ? 'Save Order & Exit' : 'Reorder Agents'}
            </button>
            <button 
              onClick={handleAddAgent}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Agent</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
          {selectedCategory === 'all' && (
            <p className="text-sm text-gray-500 mt-1">
              Select a specific category to enable agent reordering
            </p>
          )}
          {selectedCategory !== 'all' && !isReorderMode && (
            <p className="text-sm text-blue-600 mt-1">
              💡 Click "Reorder Agents" to customize the order agents appear in the {categories.find(c => c.id === selectedCategory)?.label} gallery
            </p>
          )}
          {isReorderMode && (
            <p className="text-sm text-green-600 mt-1">
              🔄 Reorder mode active - drag agents to change their display order, then click "Save Order & Exit"
            </p>
          )}
        </div>

        {/* Agents List */}
        {selectedCategory === 'all' ? (
          <div className="text-center py-8 text-gray-500">
            <Bot className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Select a category to view and manage agents</p>
          </div>
        ) : loading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span>Loading agents...</span>
            </div>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bot className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No agents found in {categories.find(c => c.id === selectedCategory)?.label}</p>
            <button 
              onClick={handleAddAgent}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add First Agent
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                draggable={isReorderMode}
                onDragStart={(e) => handleAgentDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleAgentDrop(e, index)}
                className={`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg transition-all ${
                  isReorderMode 
                    ? 'hover:bg-gray-50 cursor-move hover:scale-105 hover:shadow-md' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {isReorderMode && (
                  <GripVertical className="w-4 h-4 text-gray-400" />
                )}
                
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Bot className="w-5 h-5 text-gray-700" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-black">{agent.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {getStatusText(agent.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{agent.description}</p>
                  {agent.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                      {agent.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{agent.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAgent(agent)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAgent(agent.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render Category Form Modal */}
      {renderCategoryForm()}
      {/* Render Agent Form Modal */}
      {renderAgentForm()}
    </div>
  );
};

export default AdminSettings;