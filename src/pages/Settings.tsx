import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Palette, Key, Shield, Globe, Bell, 
  Monitor, Database, Download, Upload, RefreshCw, CheckCircle,
  AlertTriangle, Copy, Eye, EyeOff, Plus, Trash2, Edit3, ExternalLink
} from 'lucide-react';
import settingsData from '../data/settings_config.json';

interface SettingsProps {
  perspective: string;
}

const Settings: React.FC<SettingsProps> = ({ perspective }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [newApiKeyName, setNewApiKeyName] = useState('');

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
          title: 'MSP Platform Configuration - Global System Management',
          description: 'Configure platform-wide settings, API management, security policies, and system integrations',
          badge: 'MSP System Control',
          colors
        };
      case 'si':
        return {
          title: 'SI Configuration - CloudPro Services Settings',
          description: 'Manage white-label branding, API integrations, and client-facing configurations',
          badge: 'SI Configuration',
          colors
        };
      case 'smb':
        return {
          title: 'SMB Settings - Global Dynamics Configuration',
          description: 'Manage team settings, integrations, and organizational preferences',
          badge: 'Team Configuration',
          colors
        };
      default:
        return {
          title: 'Settings & Configuration',
          description: 'Manage system settings and configurations',
          badge: 'Settings',
          colors: getContextColors('default')
        };
    }
  };

  const renderMSPSettings = () => {
    const platform = settingsData.platform_configuration;
    const apiMgmt = settingsData.api_management;
    const security = settingsData.security_policies;
    const notifications = settingsData.system_notifications;
    const integrations = settingsData.integration_settings;
    const maintenance = settingsData.maintenance_schedules;

    const tabs = [
      { id: 'general', label: 'Platform', icon: Monitor },
      { id: 'api', label: 'API Management', icon: Key },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'integrations', label: 'Integrations', icon: Globe },
      { id: 'maintenance', label: 'Maintenance', icon: SettingsIcon }
    ];

    return (
      <>
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-700 bg-purple-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform Configuration */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Platform Status & Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Monitor className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Platform Version</span>
                  </div>
                  <p className="text-lg font-bold text-purple-900">{platform.version}</p>
                  <p className="text-sm text-purple-700">{platform.environment}</p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">System Uptime</span>
                  </div>
                  <p className="text-lg font-bold text-green-900">{platform.uptime}</p>
                  <p className="text-sm text-green-700">Last 30 days</p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Region</span>
                  </div>
                  <p className="text-lg font-bold text-blue-900">{platform.region}</p>
                  <p className="text-sm text-blue-700">Primary deployment</p>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Compliance</span>
                  </div>
                  <p className="text-lg font-bold text-orange-900">{platform.compliance.length}</p>
                  <p className="text-sm text-orange-700">Certifications</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">System Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Data Retention:</span>
                    <span className="ml-2 font-medium text-gray-900">{platform.data_retention}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Backup Frequency:</span>
                    <span className="ml-2 font-medium text-gray-900">{platform.backup_frequency}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Encryption:</span>
                    <span className="ml-2 font-medium text-gray-900">{platform.encryption}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Maintenance Window:</span>
                    <span className="ml-2 font-medium text-gray-900">{platform.maintenance_window}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Management */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">API Key Management</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Generate API Key</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-lg font-bold text-purple-900">{apiMgmt.total_api_keys}</p>
                  <p className="text-sm text-purple-700">Total API Keys</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-lg font-bold text-green-900">{apiMgmt.active_keys}</p>
                  <p className="text-sm text-green-700">Active Keys</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-lg font-bold text-blue-900">{(apiMgmt.calls_this_month / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-blue-700">API Calls (Month)</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-lg font-bold text-orange-900">{apiMgmt.api_versions.length}</p>
                  <p className="text-sm text-orange-700">API Versions</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Generated API Keys</h4>
                {apiMgmt.generated_keys.map((key, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-black">{key.name}</h5>
                        <p className="text-sm text-gray-600">Tenant: {key.tenant} • Created: {new Date(key.created).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {key.status}
                        </span>
                        <button
                          onClick={() => setShowApiKey(prev => ({ ...prev, [key.key_id]: !prev[key.key_id] }))}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {showApiKey[key.key_id] ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    
                    {showApiKey[key.key_id] && (
                      <div className="mb-3 p-3 bg-gray-100 rounded-lg">
                        <code className="text-sm font-mono">{key.key_id}...{key.key_id.slice(-8)}</code>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Rate Limit:</span>
                        <p className="font-medium text-gray-900">{key.rate_limit}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Calls This Month:</span>
                        <p className="font-medium text-gray-900">{key.calls_this_month.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Used:</span>
                        <p className="font-medium text-gray-900">{new Date(key.last_used).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-gray-600 text-sm">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {key.permissions.map((permission, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">API Usage Analytics</h3>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Top Endpoints</h4>
                {apiMgmt.top_endpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-black">{endpoint.endpoint}</p>
                      <p className="text-sm text-gray-600">{endpoint.calls.toLocaleString()} calls</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-black">{endpoint.avg_response}s</p>
                      <p className="text-sm text-gray-600">avg response</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Security Policies */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Password & Authentication Policies</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Password Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-green-700">Minimum Length</span>
                      <span className="font-medium text-green-900">{security.password_requirements.min_length} characters</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-blue-700">Complexity Score</span>
                      <span className="font-medium text-blue-900">{security.password_requirements.complexity_score}/10</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <span className="text-purple-700">Password History</span>
                      <span className="font-medium text-purple-900">{security.password_requirements.password_history} passwords</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <span className="text-orange-700">Max Age</span>
                      <span className="font-medium text-orange-900">{security.password_requirements.max_age_days} days</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Session Management</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Session Timeout</span>
                      <span className="font-medium text-gray-900">{security.session_management.session_timeout} minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Max Concurrent Sessions</span>
                      <span className="font-medium text-gray-900">{security.session_management.max_concurrent_sessions}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Idle Timeout</span>
                      <span className="font-medium text-gray-900">{security.session_management.idle_timeout} minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Remember Me Duration</span>
                      <span className="font-medium text-gray-900">{security.session_management.remember_me_duration} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Access Controls & Data Protection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Access Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Failed Login Threshold:</span>
                      <span className="font-medium text-gray-900">{security.access_controls.failed_login_threshold} attempts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Account Lockout Duration:</span>
                      <span className="font-medium text-gray-900">{security.access_controls.account_lockout_duration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Geo-blocking:</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">VPN Detection:</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Data Protection</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Encryption at Rest:</span>
                      <span className="font-medium text-gray-900">{security.data_protection.encryption_at_rest}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Encryption in Transit:</span>
                      <span className="font-medium text-gray-900">{security.data_protection.encryption_in_transit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Key Rotation:</span>
                      <span className="font-medium text-gray-900">{security.data_protection.key_rotation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">GDPR Compliance:</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Notifications */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">System Alert Configuration</h3>
              
              <div className="space-y-4">
                {notifications.enabled_alerts.map((alert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-black capitalize">{alert.type.replace('_', ' ')}</h5>
                        <p className="text-sm text-gray-600">Threshold: {alert.threshold}% • Frequency: {alert.frequency}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.severity}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <SettingsIcon className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Recipients:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {alert.recipients.map((recipient, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            {recipient}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Notification Channels</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {notifications.notification_channels.map((channel, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-black capitalize">{channel.channel}</h5>
                      <div className={`w-3 h-3 rounded-full ${channel.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <p className="text-sm text-gray-600">
                      Status: {channel.enabled ? 'Active' : 'Disabled'}
                      {channel.verified && ' • Verified'}
                      {channel.webhook && ' • Configured'}
                      {channel.endpoints && ` • ${channel.endpoints} endpoints`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Webhook Endpoints</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Webhook</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {integrations.webhook_endpoints.map((webhook, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-black">{webhook.name}</h5>
                        <p className="text-sm text-gray-600">{webhook.url}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {webhook.status}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{webhook.success_rate}%</span>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit3 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Events:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {webhook.events.map((event, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Last delivery: {new Date(webhook.last_delivery).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">OAuth Applications</h3>
              
              <div className="space-y-4">
                {integrations.oauth_applications.map((app, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-black">{app.name}</h5>
                        <p className="text-sm text-gray-600">Client ID: {app.client_id} • Tenant: {app.tenant}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {app.scopes.map((scope, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {scope}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <SettingsIcon className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Maintenance */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Scheduled Maintenance</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Schedule Maintenance</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {maintenance.map((maint, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-black">{maint.title}</h5>
                        <p className="text-sm text-gray-600">Type: {maint.type} • Frequency: {maint.frequency}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          maint.type === 'security' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {maint.type}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit3 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Next Scheduled:</span>
                        <p className="font-medium text-gray-900">{new Date(maint.next_scheduled).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-medium text-gray-900">{maint.duration} minutes</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Notification Advance:</span>
                        <p className="font-medium text-gray-900">{maint.notification_advance} hours</p>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-gray-600 text-sm">Affected Services:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {maint.affected_services.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderSISettings = () => {
    const branding = settingsData.white_label_branding.find(b => b.tenant_name === "CloudPro Services");
    
    if (!branding) return <div>No branding configuration found</div>;

    const tabs = [
      { id: 'branding', label: 'White-Label', icon: Palette },
      { id: 'api', label: 'API Keys', icon: Key },
      { id: 'integrations', label: 'Integrations', icon: Globe },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ];

    return (
      <>
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-700 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* White-Label Branding */}
        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Brand Configuration</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                    <input
                      type="text"
                      value={branding.branding.platform_name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Domain</label>
                    <input
                      type="text"
                      value={branding.custom_domain}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                    <textarea
                      rows={3}
                      value={branding.branding.welcome_message}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={branding.branding.primary_color}
                        className="w-12 h-10 border border-gray-300 rounded-lg"
                        readOnly
                      />
                      <input
                        type="text"
                        value={branding.branding.primary_color}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={branding.branding.secondary_color}
                        className="w-12 h-10 border border-gray-300 rounded-lg"
                        readOnly
                      />
                      <input
                        type="text"
                        value={branding.branding.secondary_color}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={branding.branding.accent_color}
                        className="w-12 h-10 border border-gray-300 rounded-lg"
                        readOnly
                      />
                      <input
                        type="text"
                        value={branding.branding.accent_color}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Configuration Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-blue-800">Branding: Complete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-blue-800">SSL: Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-blue-800">Email Templates: Partial</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Email Template Configuration</h3>
              
              <div className="space-y-3">
                {Object.entries(branding.email_templates).map(([template, status]) => (
                  <div key={template} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900 capitalize">{template.replace('_', ' ')}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === 'custom' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {status === 'custom' ? 'Edit' : 'Customize'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SI API Keys - Similar structure but filtered for SI */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">API Integration Keys</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Generate API Key</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-lg font-bold text-blue-900">2</p>
                  <p className="text-sm text-blue-700">Active API Keys</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-lg font-bold text-green-900">124.5K</p>
                  <p className="text-sm text-green-700">API Calls (Month)</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-lg font-bold text-orange-900">10K/hr</p>
                  <p className="text-sm text-orange-700">Rate Limit</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-black">Production API Key</h5>
                      <p className="text-sm text-gray-600">For client portal integration</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Created: Jan 1, 2024 • Last used: Today • 45.6K calls this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SI Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Third-Party Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <Globe className="w-5 h-5 text-green-700" />
                    </div>
                    <h4 className="font-medium text-green-900">CRM Integration</h4>
                  </div>
                  <p className="text-sm text-green-800 mb-2">Connected to Salesforce</p>
                  <button className="text-sm text-green-700 hover:text-green-900 font-medium">
                    Configure →
                  </button>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <Database className="w-5 h-5 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-blue-900">Billing System</h4>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">Connected to QuickBooks</p>
                  <button className="text-sm text-blue-700 hover:text-blue-900 font-medium">
                    Configure →
                  </button>
                </div>

                <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <Plus className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">Add Integration</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Connect more services</p>
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                    Browse →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderSMBSettings = () => {
    const tabs = [
      { id: 'general', label: 'General', icon: SettingsIcon },
      { id: 'integrations', label: 'Integrations', icon: Globe },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'security', label: 'Security', icon: Shield }
    ];

    return (
      <>
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-700 bg-green-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value="Global Dynamics"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <input
                      type="text"
                      value="Manufacturing"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Small (11-50 employees)</option>
                      <option>Medium (51-250 employees)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Pacific Time (PT)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Agent Usage Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-green-900">Auto-save Agent Outputs</h5>
                    <p className="text-sm text-green-700">Automatically save all generated content</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Usage Analytics</h5>
                    <p className="text-sm text-gray-600">Collect usage statistics for optimization</p>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">Email Notifications</h5>
                    <p className="text-sm text-gray-600">Receive updates about agent usage and performance</p>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMB Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Business Tool Integrations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-700" />
                    </div>
                    <h4 className="font-medium text-green-900">Google Workspace</h4>
                  </div>
                  <p className="text-sm text-green-800 mb-2">Connected • SSO Enabled</p>
                  <button className="text-sm text-green-700 hover:text-green-900 font-medium">
                    Manage →
                  </button>
                </div>

                <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-200 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-700" />
                    </div>
                    <h4 className="font-medium text-blue-900">Microsoft 365</h4>
                  </div>
                  <p className="text-sm text-blue-800 mb-2">Connected • Outlook Sync</p>
                  <button className="text-sm text-blue-700 hover:text-blue-900 font-medium">
                    Configure →
                  </button>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-yellow-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-700" />
                    </div>
                    <h4 className="font-medium text-yellow-900">Slack</h4>
                  </div>
                  <p className="text-sm text-yellow-800 mb-2">Setup Required</p>
                  <button className="text-sm text-yellow-700 hover:text-yellow-900 font-medium">
                    Connect →
                  </button>
                </div>

                <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <Plus className="w-5 h-5 text-gray-700" />
                    </div>
                    <h4 className="font-medium text-gray-900">Add Integration</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Connect more business tools</p>
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                    Browse →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SMB Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Team Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Multi-Factor Authentication</h4>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-900">MFA Status: Enabled</p>
                        <p className="text-sm text-green-700">18 of 22 active users have MFA enabled</p>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Manage MFA
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Password Policy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Minimum Length:</span>
                      <span className="ml-2 font-medium text-gray-900">8 characters</span>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Password Expiry:</span>
                      <span className="ml-2 font-medium text-gray-900">90 days</span>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Complexity:</span>
                      <span className="ml-2 font-medium text-gray-900">Required</span>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Password History:</span>
                      <span className="ml-2 font-medium text-gray-900">5 passwords</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Session Management</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Auto-logout after inactivity</span>
                      <select className="px-3 py-1 border border-gray-300 rounded-lg">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>2 hours</option>
                        <option>Never</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <span className="text-gray-700">Maximum concurrent sessions</span>
                      <select className="px-3 py-1 border border-gray-300 rounded-lg">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>Unlimited</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

      {/* Render perspective-specific content */}
      {perspective === 'msp' && renderMSPSettings()}
      {perspective === 'si' && renderSISettings()}
      {perspective === 'smb' && renderSMBSettings()}
    </div>
  );
};

export default Settings;