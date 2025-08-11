import React from 'react';
import { Users, Bot, TrendingUp, DollarSign, Building, Phone, CreditCard, Target, Award, Briefcase } from 'lucide-react';
import CardMetric from '../components/CardMetric';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';

// Import role-specific data
import mspData from '../data/msp_view_data.json';
import siData from '../data/si_view_data.json';
import smbData from '../data/smb_view_data.json';

interface DashboardProps {
  perspective: string;
}

const Dashboard: React.FC<DashboardProps> = ({ perspective }) => {
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
          title: 'MSP Command Center - Managing 47 System Integrators',
          description: 'Oversee your entire partner ecosystem with aggregate metrics and performance insights',
          badge: 'MSP View',
          colors
        };
      case 'si':
        return {
          title: 'SI Dashboard - CloudPro Services Managing 35 SMB Clients',
          description: 'Monitor your SMB portfolio performance, license utilization, and revenue growth',
          badge: 'SI View',
          colors
        };
      case 'smb':
        return {
          title: 'SMB Portal - Global Dynamics Team Dashboard', 
          description: 'Track your organization\'s AI agent usage, productivity gains, and cost savings',
          badge: 'SMB View',
          colors
        };
      default:
        return {
          title: 'Control Tower Dashboard',
          description: 'Multi-tenant AI management platform',
          badge: 'Default View',
          colors: getContextColors('default')
        };
    }
  };

  const renderMSPView = () => {
    const tableColumns = [
      { key: 'name', label: 'System Integrator' },
      { key: 'smbs', label: 'SMBs', render: (value: number) => value.toString() },
      { key: 'revenue', label: 'Revenue', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'licenses', label: 'Licenses', render: (value: number) => value.toString() },
      { key: 'utilizationRate', label: 'Utilization', render: (value: number) => `${value}%` },
      { key: 'growthRate', label: 'Growth', render: (value: number) => (
        <span className={`font-medium ${value > 20 ? 'text-green-600' : value > 10 ? 'text-blue-600' : 'text-gray-600'}`}>
          +{value}%
        </span>
      )}
    ];

    return (
      <>
        {/* MSP Key Metrics */}
        <div className="metrics-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="Total System Integrators"
            value={mspData.metrics.totalSIs}
            change="+12.5%"
            icon={Building}
            trend="up"
          />
          <CardMetric
            title="Total SMB Customers" 
            value={mspData.metrics.totalSMBs}
            change="+18.2%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Monthly Revenue"
            value={`$${mspData.metrics.totalRevenue.toLocaleString()}`}
            change="+23.5%"
            icon={DollarSign}
            trend="up"
          />
          <CardMetric
            title="License Utilization"
            value={`${Math.round((mspData.metrics.usedLicenses / mspData.metrics.totalLicenses) * 100)}%`}
            change="+5.2%"
            icon={CreditCard}
            trend="up"
          />
        </div>

        {/* MSP Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CardMetric
            title="Available Licenses"
            value={mspData.metrics.availableLicenses}
            icon={CreditCard}
          />
          <CardMetric
            title="Avg Revenue per SI"
            value={`$${mspData.metrics.avgRevenuePerSI.toLocaleString()}`}
            change="+8.7%"
            icon={TrendingUp}
            trend="up"
          />
          <CardMetric
            title="Ecosystem Growth Rate"
            value={`${mspData.metrics.growthRate}%`}
            change="+3.1%"
            icon={Target}
            trend="up"
          />
        </div>

        {/* Revenue Trend Chart */}
        <Chart
          data={mspData.revenueDistribution}
          type="line"
          xKey="month"
          yKey="revenue"
          title="Ecosystem Revenue Trends"
          color="#374151"
        />

        {/* SI Performance Table */}
        <DataTable
          data={mspData.siPerformance}
          columns={tableColumns}
          title="System Integrator Performance"
        />
      </>
    );
  };

  const renderSIView = () => {
    const smbColumns = [
      { key: 'name', label: 'SMB Client' },
      { key: 'industry', label: 'Industry' },
      { key: 'users', label: 'Users', render: (value: number) => value.toString() },
      { key: 'agentCalls', label: 'Agent Calls', render: (value: number) => value.toLocaleString() },
      { key: 'monthlyRevenue', label: 'Revenue', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'growthTrend', label: 'Trend', render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'up' ? 'bg-green-100 text-green-800' : 
          value === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {value === 'up' ? '↗ Growth' : value === 'down' ? '↘ Decline' : '→ Stable'}
        </span>
      )}
    ];

    return (
      <>
        {/* SI Key Metrics */}
        <div className="metrics-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="SMB Clients"
            value={siData.metrics.smbClients}
            change="+15.7%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="License Utilization"
            value={`${siData.metrics.usedLicenses}/${siData.metrics.allocatedLicenses}`}
            change="+8.3%"
            icon={CreditCard}
            trend="up"
          />
          <CardMetric
            title="Monthly Revenue"
            value={`$${siData.metrics.monthlyRevenue.toLocaleString()}`}
            change="+25.2%"
            icon={DollarSign}
            trend="up"
          />
          <CardMetric
            title="Portfolio Growth"
            value={`${siData.metrics.growthRate}%`}
            change="+12.1%"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* SI Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CardMetric
            title="Available Licenses"
            value={siData.metrics.availableLicenses}
            icon={CreditCard}
          />
          <CardMetric
            title="Avg Revenue per SMB"
            value={`$${siData.metrics.avgRevenuePerSMB}`}
            change="+18.4%"
            icon={DollarSign}
            trend="up"
          />
          <CardMetric
            title="Utilization Rate"
            value={`${siData.metrics.utilizationRate}%`}
            change="+6.8%"
            icon={Target}
            trend="up"
          />
        </div>

        {/* SI Revenue Chart */}
        <Chart
          data={siData.agentUsageByClients}
          type="line"
          xKey="month"
          yKey="revenue"
          title="SMB Client Revenue Growth"
          color="#374151"
        />

        {/* SMB Portfolio Table */}
        <DataTable
          data={siData.smbPortfolio}
          columns={smbColumns}
          title="SMB Client Portfolio"
        />
      </>
    );
  };

  const renderSMBView = () => {
    const departmentColumns = [
      { key: 'department', label: 'Department' },
      { key: 'users', label: 'Users', render: (value: number) => value.toString() },
      { key: 'agentCalls', label: 'Agent Calls', render: (value: number) => value.toString() },
      { key: 'favoriteAgent', label: 'Top Agent' },
      { key: 'savings', label: 'Cost Savings', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'efficiency', label: 'Efficiency', render: (value: number) => (
        <span className={`font-medium ${value > 85 ? 'text-green-600' : value > 75 ? 'text-blue-600' : 'text-gray-600'}`}>
          {value}%
        </span>
      )}
    ];

    return (
      <>
        {/* SMB Key Metrics */}
        <div className="metrics-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="Active Users"
            value={`${smbData.metrics.activeUsers}/${smbData.metrics.totalUsers}`}
            change="+9.1%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Agent Calls This Month"
            value={smbData.metrics.monthlyAgentCalls}
            change="+15.8%"
            icon={Bot}
            trend="up"
          />
          <CardMetric
            title="Cost Savings"
            value={`$${smbData.metrics.costSavings.toLocaleString()}`}
            change="+22.4%"
            icon={DollarSign}
            trend="up"
          />
          <CardMetric
            title="Productivity Gain"
            value={`${smbData.metrics.productivityGain}%`}
            change="+7.3%"
            icon={Award}
            trend="up"
          />
        </div>

        {/* SMB Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CardMetric
            title="License Usage"
            value={`${smbData.metrics.usedLicenses}/${smbData.metrics.allocatedLicenses}`}
            icon={CreditCard}
          />
          <CardMetric
            title="Time Reduction"
            value={`${smbData.metrics.timeReduction}%`}
            change="+12.6%"
            icon={TrendingUp}
            trend="up"
          />
          <CardMetric
            title="Partner"
            value={smbData.companyInfo.siPartner}
            icon={Briefcase}
          />
        </div>

        {/* SMB Usage Chart */}
        <Chart
          data={smbData.usageTrends}
          type="line"
          xKey="month"
          yKey="calls"
          title="Your Team's Agent Usage Trends"
          color="#374151"
        />

        {/* Department Usage Table */}
        <DataTable
          data={smbData.teamUsage}
          columns={departmentColumns}
          title="Department Usage Breakdown"
        />
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
      {perspective === 'msp' && renderMSPView()}
      {perspective === 'si' && renderSIView()}
      {perspective === 'smb' && renderSMBView()}
    </div>
  );
};

export default Dashboard;