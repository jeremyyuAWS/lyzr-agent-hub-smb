import React, { useState } from 'react';
import { 
  Users as UsersIcon, Shield, Settings, Eye, Plus, Search, Filter, MoreVertical,
  CheckCircle, AlertTriangle, Clock, Globe, Key, UserPlus, UserCheck,
  Activity, TrendingUp, Calendar, MapPin, Smartphone
} from 'lucide-react';
import DataTable from '../components/DataTable';
import CardMetric from '../components/CardMetric';
import userManagementData from '../data/user_management.json';

interface UsersProps {
  perspective: string;
}

const Users: React.FC<UsersProps> = ({ perspective }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);

  const getPerspectiveContext = () => {
    const getContextColors = (perspective: string) => {
      switch (perspective) {
        case 'msp':
          return {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-900',
            accent: 'text-purple-700',
            badge: 'bg-purple-100 text-purple-800'
          };
        case 'si':
          return {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-900',
            accent: 'text-blue-700',
            badge: 'bg-blue-100 text-blue-800'
          };
        case 'smb':
          return {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-900',
            accent: 'text-green-700',
            badge: 'bg-green-100 text-green-800'
          };
        default:
          return {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-900',
            accent: 'text-gray-700',
            badge: 'bg-gray-100 text-gray-800'
          };
      }
    };

    const colors = getContextColors(perspective);

    switch (perspective) {
      case 'msp':
        return {
          title: 'MSP User Management - Ecosystem-wide Administration',
          description: 'Manage 1,847 users across 331 tenants with advanced security and SSO configuration',
          badge: 'MSP User Control',
          colors
        };
      case 'si':
        return {
          title: 'SI User Management - CloudPro Services',
          description: 'Manage your team and SMB client users with role-based permissions and white-label branding',
          badge: 'SI User Management',
          colors
        };
      case 'smb':
        return {
          title: 'SMB User Management - Global Dynamics',
          description: 'Manage your 24-person team with department-based roles and agent access controls',
          badge: 'Team Management',
          colors
        };
      default:
        return {
          title: 'User Management',
          description: 'Manage users and permissions across your organization',
          badge: 'User Control',
          colors: getContextColors('default')
        };
    }
  };

  const renderMSPView = () => {
    const overview = userManagementData.ecosystem_overview;
    const mspUsers = userManagementData.msp_users;
    const ssoConfig = userManagementData.sso_configuration;
    const activity = userManagementData.user_activity;
    const security = userManagementData.security_metrics;

    const mspUserColumns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'last_login', label: 'Last Login', render: (value: string) => 
        new Date(value).toLocaleDateString()
      },
      { key: 'login_count', label: 'Total Logins', render: (value: number) => value.toLocaleString() },
      { key: 'mfa_enabled', label: 'MFA', render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Enabled' : 'Disabled'}
        </span>
      )},
      { key: 'status', label: 'Status', render: (value: string) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          Active
        </span>
      )}
    ];

    return (
      <>
        {/* Ecosystem Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <CardMetric
            title="Total Users"
            value={overview.total_users.toLocaleString()}
            change="+15.3%"
            icon={UsersIcon}
            trend="up"
          />
          <CardMetric
            title="Active Users"
            value={overview.active_users.toLocaleString()}
            change="+12.8%"
            icon={UserCheck}
            trend="up"
          />
          <CardMetric
            title="MSP Admins"
            value={overview.msp_admins.toString()}
            icon={Shield}
          />
          <CardMetric
            title="SI Partners"
            value={overview.si_admins.toString()}
            icon={Settings}
          />
          <CardMetric
            title="SMB Customers"
            value={overview.smb_owners.toString()}
            change="+18.4%"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* Security & Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="SSO Adoption"
            value={`${ssoConfig.adoption_rate}%`}
            change="+8.2%"
            icon={Key}
            trend="up"
          />
          <CardMetric
            title="MFA Enabled"
            value={overview.mfa_enabled_users.toString()}
            change="+156"
            icon={Shield}
            trend="up"
          />
          <CardMetric
            title="New Users (Month)"
            value={overview.new_users_this_month.toString()}
            change="+23%"
            icon={UserPlus}
            trend="up"
          />
          <CardMetric
            title="Daily Active"
            value={activity.daily_active_users.toString()}
            change="+5.7%"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* MSP Admin Team */}
        <DataTable
          data={mspUsers}
          columns={mspUserColumns}
          title="MSP Administration Team"
        />

        {/* SSO Configuration Status */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">SSO Configuration Overview</h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {ssoConfig.enabled_tenants}/{ssoConfig.total_tenants} Tenants
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {ssoConfig.providers.map((provider, index) => (
              <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-purple-900">{provider.provider}</h4>
                  <div className="p-2 bg-purple-200 rounded-lg">
                    <Globe className="w-4 h-4 text-purple-700" />
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Tenants:</span>
                    <span className="font-medium text-purple-900">{provider.tenants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Users:</span>
                    <span className="font-medium text-purple-900">{provider.users.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium text-black mb-3">Pending SSO Configurations</h4>
            <div className="space-y-3">
              {ssoConfig.pending_configurations.map((config, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-200 rounded-lg">
                      <Clock className="w-4 h-4 text-yellow-700" />
                    </div>
                    <div>
                      <p className="font-medium text-yellow-900">{config.tenant}</p>
                      <p className="text-sm text-yellow-700">{config.provider} • {config.completion}% complete</p>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-800">
                    ETA: {new Date(config.estimated_completion).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Activity Analytics */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Global User Activity Intelligence</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">Feature Usage Analytics</h4>
              <div className="space-y-3">
                {activity.feature_usage.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">{feature.feature}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${feature.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 min-w-[4rem]">
                        {feature.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-3">Geographic Distribution</h4>
              <div className="space-y-3">
                {activity.login_analytics.countries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{country.country}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{country.users} users</span>
                      <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                        {country.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Dashboard */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Security Metrics Dashboard</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-700">Security Score: 8.4/10</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-medium">MFA Adoption</span>
              </div>
              <p className="text-2xl font-bold">{security.mfa_adoption_rate.toFixed(1)}%</p>
              <p className="text-sm opacity-90">{overview.mfa_enabled_users} users</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Key className="w-5 h-5" />
                <span className="font-medium">Password Policy</span>
              </div>
              <p className="text-2xl font-bold">{security.password_policy_compliance.toFixed(1)}%</p>
              <p className="text-sm opacity-90">Compliance rate</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Security Incidents</span>
              </div>
              <p className="text-2xl font-bold">{security.security_incidents}</p>
              <p className="text-sm opacity-90">This month</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Login Success</span>
              </div>
              <p className="text-2xl font-bold">{activity.login_analytics.success_rate.toFixed(1)}%</p>
              <p className="text-sm opacity-90">{activity.login_analytics.successful_logins.toLocaleString()} logins</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Security Alerts</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Suspicious Logins:</span>
                  <span className="font-medium text-red-900">{security.suspicious_login_attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Blocked IPs:</span>
                  <span className="font-medium text-red-900">{security.blocked_ips}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Weak Passwords:</span>
                  <span className="font-medium text-red-900">{security.users_with_weak_passwords}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Security Health</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Password Strength:</span>
                  <span className="font-medium text-green-900">{security.average_password_strength}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Last Security Scan:</span>
                  <span className="font-medium text-green-900">
                    {new Date(security.last_security_scan).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Compliance:</span>
                  <span className="font-medium text-green-900">SOC 2, GDPR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSIView = () => {
    const siUsers = userManagementData.si_users.find(si => si.si_name === "CloudPro Services");
    
    if (!siUsers) return <div>No data available for this SI</div>;

    const siAdminColumns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'last_login', label: 'Last Login', render: (value: string) => 
        new Date(value).toLocaleDateString()
      },
      { key: 'clients_managed', label: 'Clients Managed', render: (value: number) => 
        value ? value.toString() : 'N/A'
      },
      { key: 'mfa_enabled', label: 'MFA', render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Enabled' : 'Disabled'}
        </span>
      )}
    ];

    return (
      <>
        {/* SI Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="Total Team Members"
            value={siUsers.total_users.toString()}
            change="+3"
            icon={UsersIcon}
            trend="up"
          />
          <CardMetric
            title="SI Admins"
            value={siUsers.admins.length.toString()}
            icon={Shield}
          />
          <CardMetric
            title="SMB Clients Managed"
            value="35"
            change="+8"
            icon={Settings}
            trend="up"
          />
          <CardMetric
            title="Revenue Responsibility"
            value="$18.7K"
            change="+25.2%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* SI Admin Team */}
        <DataTable
          data={siUsers.admins}
          columns={siAdminColumns}
          title="CloudPro Services - Administration Team"
        />

        {/* User Management Tools */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">User Management Tools</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Invite Team Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <UserPlus className="w-5 h-5 text-blue-700" />
                </div>
                <h4 className="font-medium text-blue-900">Invite SMB Admin</h4>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                Grant SMB client admin access to their tenant portal
              </p>
              <button className="text-sm text-blue-700 hover:text-blue-900 font-medium">
                Send Invitation →
              </button>
            </div>

            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-200 rounded-lg">
                  <Settings className="w-5 h-5 text-green-700" />
                </div>
                <h4 className="font-medium text-green-900">Role Management</h4>
              </div>
              <p className="text-sm text-green-800 mb-3">
                Assign agent permissions and access levels
              </p>
              <button className="text-sm text-green-700 hover:text-green-900 font-medium">
                Manage Roles →
              </button>
            </div>

            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-orange-200 rounded-lg">
                  <Key className="w-5 h-5 text-orange-700" />
                </div>
                <h4 className="font-medium text-orange-900">SSO Configuration</h4>
              </div>
              <p className="text-sm text-orange-800 mb-3">
                Set up single sign-on for enterprise clients
              </p>
              <button className="text-sm text-orange-700 hover:text-orange-900 font-medium">
                Configure SSO →
              </button>
            </div>
          </div>
        </div>

        {/* Client User Overview */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">SMB Client User Summary</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Global Dynamics</h4>
                    <p className="text-sm text-gray-600">24 total users, 22 active</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    High Activity
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Owner:</span>
                  <p className="font-medium text-gray-900">Amanda Foster</p>
                </div>
                <div>
                  <span className="text-gray-600">Admins:</span>
                  <p className="font-medium text-gray-900">1</p>
                </div>
                <div>
                  <span className="text-gray-600">Departments:</span>
                  <p className="font-medium text-gray-900">Marketing, Finance, Operations</p>
                </div>
                <div>
                  <span className="text-gray-600">SSO:</span>
                  <p className="font-medium text-green-600">Configured</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <UsersIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Omega Corp</h4>
                    <p className="text-sm text-gray-600">18 total users, 16 active</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    Growing
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Owner:</span>
                  <p className="font-medium text-gray-900">Michael Chen</p>
                </div>
                <div>
                  <span className="text-gray-600">Admins:</span>
                  <p className="font-medium text-gray-900">2</p>
                </div>
                <div>
                  <span className="text-gray-600">Departments:</span>
                  <p className="font-medium text-gray-900">Finance, Operations</p>
                </div>
                <div>
                  <span className="text-gray-600">SSO:</span>
                  <p className="font-medium text-yellow-600">Pending</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UsersIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black">Sigma Systems</h4>
                    <p className="text-sm text-gray-600">11 total users, 9 active</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    Needs Support
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Owner:</span>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                </div>
                <div>
                  <span className="text-gray-600">Admins:</span>
                  <p className="font-medium text-gray-900">1</p>
                </div>
                <div>
                  <span className="text-gray-600">Departments:</span>
                  <p className="font-medium text-gray-900">Operations, Healthcare</p>
                </div>
                <div>
                  <span className="text-gray-600">SSO:</span>
                  <p className="font-medium text-red-600">Not Configured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSMBView = () => {
    const smbUsers = userManagementData.smb_users.find(smb => smb.smb_name === "Global Dynamics");
    
    if (!smbUsers) return <div>No data available for this SMB</div>;

    const teamColumns = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'department', label: 'Department' },
      { key: 'role', label: 'Role' },
      { key: 'last_login', label: 'Last Login', render: (value: string) => 
        new Date(value).toLocaleDateString()
      },
      { key: 'monthly_agent_calls', label: 'Monthly Calls', render: (value: number) => 
        value?.toString() || 'N/A'
      },
      { key: 'productivity_score', label: 'Productivity', render: (value: number) => 
        value ? (
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${value > 90 ? 'bg-green-500' : value > 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-sm font-medium">{value}%</span>
          </div>
        ) : 'N/A'
      }
    ];

    const allUsers = [smbUsers.owner, ...smbUsers.admins, ...smbUsers.users];

    return (
      <>
        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="Team Members"
            value={smbUsers.total_users.toString()}
            change="+3"
            icon={UsersIcon}
            trend="up"
          />
          <CardMetric
            title="Active Users"
            value={smbUsers.active_users.toString()}
            change="+2"
            icon={UserCheck}
            trend="up"
          />
          <CardMetric
            title="Departments"
            value="3"
            icon={Settings}
          />
          <CardMetric
            title="Admin Users"
            value={(smbUsers.admins.length + 1).toString()}
            icon={Shield}
          />
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Department User Distribution</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-green-900">Marketing</h4>
                <div className="p-2 bg-green-200 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-700" />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Active Users:</span>
                  <span className="font-medium text-green-900">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Avg Productivity:</span>
                  <span className="font-medium text-green-900">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Top Performer:</span>
                  <span className="font-medium text-green-900">Sarah Chen</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Agent Access:</span>
                  <span className="font-medium text-green-900">Marketing, Analytics</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-900">Finance</h4>
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Activity className="w-4 h-4 text-blue-700" />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Active Users:</span>
                  <span className="font-medium text-blue-900">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Avg Productivity:</span>
                  <span className="font-medium text-blue-900">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Top Performer:</span>
                  <span className="font-medium text-blue-900">Mike Rodriguez</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Agent Access:</span>
                  <span className="font-medium text-blue-900">Finance, Analytics</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-yellow-900">Operations</h4>
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <Settings className="w-4 h-4 text-yellow-700" />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Active Users:</span>
                  <span className="font-medium text-yellow-900">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Avg Productivity:</span>
                  <span className="font-medium text-yellow-900">76%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Top Performer:</span>
                  <span className="font-medium text-yellow-900">Emily Johnson</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Agent Access:</span>
                  <span className="font-medium text-yellow-900">Operations, Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Directory */}
        <DataTable
          data={allUsers}
          columns={teamColumns}
          title="Global Dynamics - Team Directory"
        />

        {/* Top Performers */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Top Performers & Power Users</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-200 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h4 className="font-medium text-green-900">Sarah Chen</h4>
                  <p className="text-sm text-green-700">Marketing Manager</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly Calls:</span>
                  <span className="font-medium text-green-900">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Favorite Agent:</span>
                  <span className="font-medium text-green-900">Marketing Agent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Outputs Created:</span>
                  <span className="font-medium text-green-900">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Satisfaction:</span>
                  <span className="font-medium text-green-900">5.0/5.0</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Mike Rodriguez</h4>
                  <p className="text-sm text-blue-700">Finance Director</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Monthly Calls:</span>
                  <span className="font-medium text-blue-900">19</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Favorite Agent:</span>
                  <span className="font-medium text-blue-900">Finance Agent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Outputs Created:</span>
                  <span className="font-medium text-blue-900">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Satisfaction:</span>
                  <span className="font-medium text-blue-900">4.9/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Actions */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">User Management Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 border border-green-200 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <UserPlus className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Invite New User</span>
              </div>
              <p className="text-sm text-green-700">Add team members and assign roles</p>
            </button>

            <button className="p-4 border border-blue-200 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <Key className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Agent Permissions</span>
              </div>
              <p className="text-sm text-blue-700">Configure agent access by department</p>
            </button>

            <button className="p-4 border border-purple-200 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <Settings className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">Team Settings</span>
              </div>
              <p className="text-sm text-purple-700">Manage roles and department structure</p>
            </button>
          </div>
        </div>
      </>
    );
  };

  const context = getPerspectiveContext();

  return (
    <div className="space-y-6">
      {/* Perspective Context */}
      <div className={`${context.colors.bg} ${context.colors.border} border rounded-lg p-4 transition-colors duration-200`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-medium ${context.colors.text}`}>{context.title}</h3>
            <p className={`text-sm ${context.colors.accent} mt-1`}>{context.description}</p>
          </div>
          <div className={`px-3 py-1 ${context.colors.badge} rounded-full text-sm font-medium`}>
            {context.badge}
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
            <option value="owner">Owners</option>
          </select>
          <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
        
        <div className="flex space-x-2">
          {perspective === 'msp' && (
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add MSP Admin</span>
            </button>
          )}
          
          {perspective === 'si' && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Invite Team Member</span>
            </button>
          )}
          
          {perspective === 'smb' && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          )}
        </div>
      </div>

      {/* Render perspective-specific content */}
      {perspective === 'msp' && renderMSPView()}
      {perspective === 'si' && renderSIView()}
      {perspective === 'smb' && renderSMBView()}
    </div>
  );
};

export default Users;