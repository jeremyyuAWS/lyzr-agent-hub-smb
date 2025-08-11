import React from 'react';
import { TrendingUp, Users, Headphones, UserCheck, DollarSign, Megaphone } from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, activeTab, onTabChange }) => {
  const categories = [
    { id: 'sales', label: 'Sales', icon: TrendingUp, color: 'text-blue-600' },
    { id: 'marketing', label: 'Marketing', icon: Megaphone, color: 'text-green-600' },
    { id: 'customer-service', label: 'Customer Service', icon: Headphones, color: 'text-purple-600' },
    { id: 'hr', label: 'HR', icon: UserCheck, color: 'text-orange-600' },
    { id: 'finance', label: 'Finance', icon: DollarSign, color: 'text-red-600' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    onTabChange('agents'); // Always go to agents view when clicking category
  };

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen p-4">
      <div className="mb-8">
        <div className="flex items-center space-x-3">
          <img 
            src="/Lyzr-logo cropped.webp" 
            alt="Lyzr Logo" 
            className="w-20 h-20 object-contain"
          />
          <div>
            <h2 className="text-xl font-bold text-black">AI Agent Hub</h2>
            <p className="text-xs text-gray-500 mt-1">SMB Business Automation</p>
          </div>
        </div>
      </div>
      
      <nav className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                activeCategory === category.id && activeTab === 'agents'
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeCategory === category.id ? category.color : 'text-gray-500'}`} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;