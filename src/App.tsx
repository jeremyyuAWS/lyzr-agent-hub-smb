import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AgentGallery from './pages/AgentGallery';
import AdminSettings from './pages/AdminSettings';

function App() {
  const [activeCategory, setActiveCategory] = useState('sales');
  const [activeTab, setActiveTab] = useState('agents');

  const getCurrentPage = () => {
    switch (activeTab) {
      case 'agents': return <AgentGallery category={activeCategory} />;
      case 'admin': return <AdminSettings />;
      default: return <AgentGallery category={activeCategory} />;
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
          onTabChange={setActiveTab}
        />
        
        <div className="flex-1">
          <Header 
            title={getPageTitle()}
            onAdminClick={() => setActiveTab('admin')}
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