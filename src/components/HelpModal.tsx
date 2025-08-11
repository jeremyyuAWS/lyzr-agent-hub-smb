import React, { useState } from 'react';
import { X, HelpCircle, BookOpen, TrendingUp, Users, Zap, ChevronDown, ChevronRight, Lightbulb, Target } from 'lucide-react';
import helpContent from '../data/help_content.json';

interface HelpModalProps {
  perspective: 'msp' | 'si' | 'smb';
  currentTab: string;
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ perspective, currentTab, isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('features');
  
  if (!isOpen) return null;

  const tabHelp = helpContent.help[currentTab as keyof typeof helpContent.help]?.[perspective];
  
  if (!tabHelp) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-black">Help Not Available</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600">Help content is not available for this section yet.</p>
        </div>
      </div>
    );
  }

  const getPerspectiveColor = () => {
    switch (perspective) {
      case 'msp': return 'from-purple-500 to-purple-600';
      case 'si': return 'from-blue-500 to-blue-600';
      case 'smb': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPerspectiveIcon = () => {
    switch (perspective) {
      case 'msp': return TrendingUp;
      case 'si': return Users;
      case 'smb': return Zap;
      default: return HelpCircle;
    }
  };

  const Icon = getPerspectiveIcon();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getPerspectiveColor()} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{tabHelp.title}</h2>
                <p className="text-sm opacity-90 mt-1">{tabHelp.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Features Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('features')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-black">Key Features & Capabilities</span>
                </div>
                {expandedSection === 'features' ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              {expandedSection === 'features' && (
                <div className="p-4 space-y-4">
                  {tabHelp.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className={`w-8 h-8 bg-gradient-to-br ${getPerspectiveColor()} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">{feature.name}</h4>
                        <p className="text-sm text-blue-800">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('tips')}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-black">Pro Tips & Best Practices</span>
                </div>
                {expandedSection === 'tips' ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              {expandedSection === 'tips' && (
                <div className="p-4 space-y-3">
                  {tabHelp.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Target className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800 font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-gray-600" />
                <span>Quick Actions for This Tab</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="p-3 bg-white border border-gray-200 rounded-lg text-left hover:border-gray-300 transition-colors">
                  <p className="font-medium text-gray-900 text-sm">View Documentation</p>
                  <p className="text-xs text-gray-600">Detailed guides and tutorials</p>
                </button>
                <button className="p-3 bg-white border border-gray-200 rounded-lg text-left hover:border-gray-300 transition-colors">
                  <p className="font-medium text-gray-900 text-sm">Contact Support</p>
                  <p className="text-xs text-gray-600">Get help from our team</p>
                </button>
                <button className="p-3 bg-white border border-gray-200 rounded-lg text-left hover:border-gray-300 transition-colors">
                  <p className="font-medium text-gray-900 text-sm">Video Tutorials</p>
                  <p className="text-xs text-gray-600">Watch step-by-step guides</p>
                </button>
                <button className="p-3 bg-white border border-gray-200 rounded-lg text-left hover:border-gray-300 transition-colors">
                  <p className="font-medium text-gray-900 text-sm">Best Practices</p>
                  <p className="text-xs text-gray-600">Learn from success stories</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Need more help? Visit our knowledge base or contact support.
            </p>
            <button
              onClick={onClose}
              className={`bg-gradient-to-r ${getPerspectiveColor()} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium`}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;