import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onAdminClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            AI-powered automation agents for your business
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={onAdminClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Admin Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;