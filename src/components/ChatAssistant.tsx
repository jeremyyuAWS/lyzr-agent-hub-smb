import React, { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';

interface ChatAssistantProps {
  tab: string;
  perspective: string;
  isVisible: boolean;
  onToggle: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ tab, perspective, isVisible, onToggle }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'ai'}>>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text: message, sender: 'user' }]);
    
    // Simulate AI response based on tab
    setTimeout(() => {
      let response = '';
      
      // Generate perspective-aware responses
      const key = `${tab}_${perspective}`;
      switch (key) {
        case 'dashboard_msp':
          response = 'MSP Control Tower: You manage 47 SIs with 284 SMBs generating $89K monthly. NetSecure Ltd shows highest growth at +31.4%. CloudPro Services is your top revenue SI at $18.7K. License utilization is 85%.';
          break;
        case 'dashboard_si':
          response = 'SI Dashboard: CloudPro Services manages 35 SMBs with 90% license utilization. Global Dynamics is your top client at $4.9K monthly. Portfolio growth is +25.2% with 2 available licenses to allocate.';
          break;
        case 'dashboard_smb':
          response = 'SMB Portal: Global Dynamics has 22/24 active users with 198 agent calls this month. Marketing team leads usage with Finance close behind. You\'ve achieved $12.6K in cost savings and 32% productivity gain.';
          break;
        case 'agents_msp':
          response = 'Agent Analytics: Support Agent has 94% adoption across ecosystem. Finance Agent drives most revenue. Consider expanding Analytics Agent (65% adoption) to underperforming SIs for growth opportunities.';
          break;
        case 'agents_si':
          response = 'Client Agent Usage: Your SMBs prefer Finance and Marketing agents. Global Dynamics uses Marketing Agent most (89 calls). Recommend Operations Agent to Sigma Systems for their healthcare workflows.';
          break;
        case 'agents_smb':
          response = 'Your Agent Hub: Finance Agent has 94% satisfaction rating with 2.1s response time. Marketing Agent generated your team\'s best content last month. Try Operations Agent for workflow automation.';
          break;
        case 'tenants_msp':
          response = 'Ecosystem Management: 5 top SIs manage your 284 SMBs. License pool is 85% utilized. CloudPro Services needs more licenses (90% utilized). TechFlow Solutions has expansion capacity (80% utilized).';
          break;
        case 'tenants_si':
          response = 'SMB Portfolio: You manage 35 clients across Manufacturing, Technology, and Healthcare. Global Dynamics shows strongest growth trend. Sigma Systems needs attention - stable but not growing.';
          break;
        case 'tenants_smb':
          response = 'Team Management: 24 total users, 22 active. Finance (6 users) and Marketing (8 users) are your most active departments. Operations team (5 users) has growth potential with more agent adoption.';
          break;
        default:
          response = `Control Tower AI Assistant ready! I can help with ${perspective.toUpperCase()} level insights for ${tab}. What specific metrics or trends would you like to explore?`;
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'ai' }]);
    }, 1000);
    
    setMessage('');
  };

  if (!isVisible) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6 text-gray-700" />
      </button>
    );
  }

  return (
    <div className="chat-panel fixed bottom-6 right-6 w-80 h-96 bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-black">AI Assistant</h3>
        <button onClick={onToggle} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm">
            Ask me about your {perspective.toUpperCase()} {tab} data...
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-2 rounded-lg max-w-xs ${
              msg.sender === 'user' 
                ? 'bg-gray-100 text-black' 
                : 'bg-gray-50 text-gray-800 border border-gray-200'
            }`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your data..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;