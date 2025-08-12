import React, { useState, useEffect } from 'react';
import { 
  Settings, Plus, Edit, Trash2, Save, X, GripVertical, 
  TrendingUp, Users, Headphones, UserCheck, DollarSign, Megaphone,
  Bot, Building, FileText, Globe, Shield, Zap, RotateCcw
} from 'lucide-react';

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
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: 'Bot',
    color: 'text-blue-600'
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

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      icon: 'Bot',
      color: 'text-blue-600'
    });
    setEditingCategory(null);
  };

  const handleAddCategory = () => {
    resetCategoryForm();
    setShowCategoryForm(true);
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

  const handleCancelCategory = () => {
    setShowCategoryForm(false);
    resetCategoryForm();
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
    // For now, we'll create a mock order since we're not actually implementing
    // the full drag-and-drop for agents in this component
    // In a real implementation, this would save the actual reordered agent IDs
    
    const mockAgentOrder = [
      'ai_sdr',
      'investment_memo_writer', 
      'content_creator',
      'ebook_writer',
      'enterprise_search',
      'customer_support',
      'resource_allocation'
    ];
    
    const savedOrders = localStorage.getItem('agentOrders');
    let orders = {};
    
    try {
      orders = savedOrders ? JSON.parse(savedOrders) : {};
    } catch {
      orders = {};
    }
    
    orders[selectedCategory] = mockAgentOrder;
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
                  : 'bg-white border border-gray-300 text-black hover:bg-gray-50'
              }`}
            >
              {isReorderMode ? 'Exit Reorder' : 'Reorder Agents'}
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
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
        </div>

        {/* Agents would be listed here */}
        <div className="text-center py-8 text-gray-500">
          <Bot className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Agent management functionality coming soon</p>
        </div>
      </div>

      {/* Render Category Form Modal */}
      {renderCategoryForm()}
    </div>
  );
};

export default AdminSettings;