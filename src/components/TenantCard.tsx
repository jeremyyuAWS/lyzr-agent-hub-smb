import React from 'react';
import { Building, Users, CreditCard, TrendingUp, AlertTriangle, CheckCircle, Eye, Settings } from 'lucide-react';

interface TenantCardProps {
  tenant: any;
  type: 'si' | 'smb';
  onViewDetails: (tenantId: string, tenantName: string) => void;
  onManage: (tenantId: string) => void;
  perspective: string;
}

const TenantCard: React.FC<TenantCardProps> = ({ tenant, type, onViewDetails, onManage, perspective }) => {
  const getHealthStatus = () => {
    if (type === 'si') {
      const utilizationRate = (tenant.usedLicenses / tenant.licenses) * 100;
      if (utilizationRate > 90) return { status: 'warning', color: 'text-orange-600 bg-orange-100', text: 'High Utilization' };
      if (utilizationRate > 80) return { status: 'good', color: 'text-yellow-600 bg-yellow-100', text: 'Good' };
      return { status: 'excellent', color: 'text-green-600 bg-green-100', text: 'Excellent' };
    } else {
      const activity = tenant.agentCalls;
      if (activity > 150) return { status: 'excellent', color: 'text-green-600 bg-green-100', text: 'Very Active' };
      if (activity > 100) return { status: 'good', color: 'text-blue-600 bg-blue-100', text: 'Active' };
      return { status: 'warning', color: 'text-gray-600 bg-gray-100', text: 'Low Activity' };
    }
  };

  const health = getHealthStatus();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${type === 'si' ? 'bg-blue-100' : 'bg-green-100'}`}>
            {type === 'si' ? <Building className="w-5 h-5 text-blue-600" /> : <Users className="w-5 h-5 text-green-600" />}
          </div>
          <div>
            <h3 className="font-semibold text-black">{tenant.name}</h3>
            {type === 'si' && <p className="text-sm text-gray-600">{tenant.smbs} SMBs • {tenant.users} Users</p>}
            {type === 'smb' && <p className="text-sm text-gray-600">{tenant.users} Users • {tenant.agentCalls} Calls</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${health.color}`}>
            {health.text}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {type === 'si' ? (
          <>
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="font-semibold text-black">${tenant.revenue?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">License Usage</p>
              <p className="font-semibold text-black">{tenant.usedLicenses}/{tenant.licenses}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm text-gray-600">Agent Calls</p>
              <p className="font-semibold text-black">{tenant.agentCalls}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Favorite Agent</p>
              <p className="font-semibold text-black text-xs">{tenant.favoriteAgent?.replace(' Agent', '')}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(tenant.id, tenant.name)}
          className="flex-1 bg-white border border-gray-300 text-black py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>View as {tenant.name}</span>
        </button>
        
        <button
          onClick={() => onManage(tenant.id)}
          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TenantCard;