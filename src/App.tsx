import React, { useState } from 'react';
import { TrendingUp, Users, Headphones, UserCheck, DollarSign, Megaphone } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AgentGallery from './pages/AgentGallery';
import AdminSettings from './pages/AdminSettings';

interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const defaultCategories: Category[] = [
  { id: 'sales', label: 'Sales', icon: 'TrendingUp', color: 'text-blue-600' },
  { id: 'marketing', label: 'Marketing', icon: 'Megaphone', color: 'text-green-600' },
  { id: 'customer-service', label: 'Customer Service', icon: 'Headphones', color: 'text-purple-600' },
  { id: 'hr', label: 'HR', icon: 'UserCheck', color: 'text-orange-600' },
  { id: 'finance', label: 'Finance', icon: 'DollarSign', color: 'text-red-600' },
];

const iconMap = {
  TrendingUp,
  Users,
  Headphones,
  UserCheck,
  DollarSign,
  Megaphone
};

function App() {
  const [activeCategory, setActiveCategory] = useState('sales');
  const [activeTab, setActiveTab] = useState('agents');
  const [agentRefreshKey, setAgentRefreshKey] = useState(0);
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('sidebarCategories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const updateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem('sidebarCategories', JSON.stringify(newCategories));
    // If current active category was deleted, switch to first available
    if (!newCategories.find(cat => cat.id === activeCategory)) {
      setActiveCategory(newCategories[0]?.id || 'sales');
    }
  };

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    // Force refresh of agent gallery when switching to agents tab
    if (newTab === 'agents') {
      setAgentRefreshKey(prev => prev + 1);
    }
  };

  const getCurrentPage = () => {
    switch (activeTab) {
      case 'agents': return <AgentGallery category={activeCategory} refreshKey={agentRefreshKey} />;
      case 'admin': return (
        <AdminSettings 
          categories={categories}
          onUpdateCategories={updateCategories}
          iconMap={iconMap}
        />
      );
      default: return <AgentGallery category={activeCategory} refreshKey={agentRefreshKey} />;
    }
  };

  const getPageTitle = () => {
    if (activeTab === 'admin') return 'Admin Settings';
    return `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Agents`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          categories={categories}
          iconMap={iconMap}
        />
        
        <div className="flex-1">
          <Header 
            title={getPageTitle()}
            onAdminClick={() => handleTabChange('admin')}
          />
          
          <main className="p-6">
            {getCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;