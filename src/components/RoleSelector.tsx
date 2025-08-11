import React from 'react';
import { Shield, User, Building, Crown, Settings } from 'lucide-react';

interface Role {
  level: number;
  name: string;
  permissions: string[];
  description: string;
}

interface RoleSelectorProps {
  currentRole: string;
  roles: Record<string, Role>;
  onRoleChange: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, roles, onRoleChange }) => {
  const getRoleIcon = (roleKey: string) => {
    switch (roleKey) {
      case 'msp_admin': return Crown;
      case 'si_admin': return Building;
      case 'smb_owner': return Shield;
      case 'smb_admin': return Settings;
      case 'smb_user': return User;
      default: return User;
    }
  };

  const getRoleColor = (roleKey: string) => {
    switch (roleKey) {
      case 'msp_admin': return 'text-purple-600 bg-purple-100';
      case 'si_admin': return 'text-blue-600 bg-blue-100';
      case 'smb_owner': return 'text-green-600 bg-green-100';
      case 'smb_admin': return 'text-orange-600 bg-orange-100';
      case 'smb_user': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-black mb-3">Switch Role Perspective</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
        {Object.entries(roles).map(([roleKey, role]) => {
          const Icon = getRoleIcon(roleKey);
          const isActive = currentRole === roleKey;
          const colorClasses = getRoleColor(roleKey);
          
          return (
            <button
              key={roleKey}
              onClick={() => onRoleChange(roleKey)}
              className={`p-3 rounded-lg border transition-all text-left ${
                isActive 
                  ? `${colorClasses} border-current` 
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">Level {role.level}</span>
              </div>
              <p className="text-xs font-semibold mb-1">{role.name}</p>
              <p className="text-xs opacity-80 line-clamp-2">{role.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;