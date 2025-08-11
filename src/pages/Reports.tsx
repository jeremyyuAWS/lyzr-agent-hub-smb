import React from 'react';
import { Download, FileText, BarChart3, PieChart, TrendingUp, Users, Building } from 'lucide-react';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';
import agentCatalogue from '../data/agent_catalogue.json';
import roiMetrics from '../data/roi_metrics.json';
import mspData from '../data/msp_view_data.json';
import siData from '../data/si_view_data.json';
import smbData from '../data/smb_view_data.json';

interface ReportsProps {
  perspective: string;
}

const Reports: React.FC<ReportsProps> = ({ perspective }) => {
  const handleExport = (type: string, reportName: string) => {
    alert(`Exporting ${reportName} as ${type}... This is a demo simulation.`);
  };

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
          title: 'MSP Executive Reports - Ecosystem Performance',
          description: 'Comprehensive reports and analytics across your entire partner ecosystem',
          badge: 'MSP Reports',
          colors
        };
      case 'si':
        return {
          title: 'SI Portfolio Reports - CloudPro Services',
          description: 'Detailed reports on your SMB client portfolio performance and revenue metrics',
          badge: 'SI Reports',
          colors
        };
      case 'smb':
        return {
          title: 'SMB Team Reports - Global Dynamics',
          description: 'Team productivity reports and agent usage analytics for optimization',
          badge: 'Team Reports',
          colors
        };
      default:
        return {
          title: 'Control Tower Reports',
          description: 'Comprehensive reports and data exports',
          badge: 'Reports',
          colors: getContextColors('default')
        };
    }
  };

  const renderMSPReports = () => {
    const siTableColumns = [
      { key: 'name', label: 'System Integrator' },
      { key: 'smbs', label: 'SMBs', render: (value: number) => value.toString() },
      { key: 'revenue', label: 'Revenue', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'utilizationRate', label: 'License Usage', render: (value: number) => `${value}%` },
      { key: 'growthRate', label: 'Growth Rate', render: (value: number) => (
        <span className={`font-medium ${value > 25 ? 'text-green-600' : value > 15 ? 'text-blue-600' : 'text-gray-600'}`}>
          +{value}%
        </span>
      )},
      { key: 'status', label: 'Status', render: (value: string) => (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium capitalize">
          {value}
        </span>
      )}
    ];

    return (
      <>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-black">MSP Executive Dashboard Reports</h2>
            <p className="text-gray-600 text-sm mt-1">
              Strategic reports for ecosystem management and partner performance analysis
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleExport('PDF', 'MSP Executive Summary')}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Executive Summary</span>
            </button>
            <button 
              onClick={() => handleExport('CSV', 'SI Performance Data')}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Revenue Trends */}
        <Chart
          data={mspData.revenueDistribution}
          type="line"
          xKey="month"
          yKey="revenue"
          title="Ecosystem Revenue Trends"
          color="#374151"
        />

        {/* Profit Analysis */}
        <Chart
          data={mspData.revenueDistribution}
          type="bar"
          xKey="month"
          yKey="profit"
          title="Monthly Profit Analysis"
          color="#6b7280"
        />

        {/* SI Performance Table */}
        <DataTable
          data={mspData.siPerformance}
          columns={siTableColumns}
          title="System Integrator Performance Report"
        />

        {/* Executive Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-black mb-4">Executive Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Top Performing Partners</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>1. NetSecure Ltd (+31.4% growth)</li>
                <li>2. CloudPro Services (+25.2% growth)</li>
                <li>3. InnoTech Hub (+19.7% growth)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Key Metrics</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Total Revenue: $89,450</li>
                <li>Ecosystem ROI: 340%</li>
                <li>License Utilization: 85%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Strategic Actions</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Expand NetSecure allocation</li>
                <li>Support CloudPro capacity</li>
                <li>Target healthcare verticals</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSIReports = () => {
    const smbTableColumns = [
      { key: 'name', label: 'SMB Client' },
      { key: 'industry', label: 'Industry' },
      { key: 'users', label: 'Users', render: (value: number) => value.toString() },
      { key: 'agentCalls', label: 'Agent Calls', render: (value: number) => value.toString() },
      { key: 'monthlyRevenue', label: 'Monthly Revenue', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'growthTrend', label: 'Trend', render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'up' ? 'bg-green-100 text-green-800' : 
          value === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
        }`}>
          {value === 'up' ? '↗ Growth' : value === 'down' ? '↘ Decline' : '→ Stable'}
        </span>
      )}
    ];

    return (
      <>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-black">SI Portfolio Management Reports</h2>
            <p className="text-gray-600 text-sm mt-1">
              Comprehensive reports on your 35 SMB clients and portfolio performance
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleExport('PDF', 'Portfolio Performance Report')}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Portfolio Report</span>
            </button>
            <button 
              onClick={() => handleExport('CSV', 'SMB Client Data')}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Clients</span>
            </button>
          </div>
        </div>

        {/* Revenue Growth */}
        <Chart
          data={siData.agentUsageByClients}
          type="line"
          xKey="month"
          yKey="revenue"
          title="Portfolio Revenue Growth"
          color="#374151"
        />

        {/* Client Distribution */}
        <Chart
          data={siData.smbPortfolio.map(smb => ({
            name: smb.name.replace(' Dynamics', '').replace(' Corp', ''),
            revenue: smb.monthlyRevenue,
            users: smb.users
          }))}
          type="bar"
          xKey="name"
          yKey="revenue"
          title="Client Revenue Distribution"
          color="#6b7280"
        />

        {/* SMB Client Table */}
        <DataTable
          data={siData.smbPortfolio}
          columns={smbTableColumns}
          title="SMB Client Portfolio Analysis"
        />

        {/* Portfolio Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-black mb-4">Portfolio Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Top Performing Clients</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>1. Global Dynamics ($4.9K revenue)</li>
                <li>2. Omega Corp ($4.2K revenue)</li>
                <li>3. Sigma Systems ($3.4K revenue)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Portfolio Health</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Total Clients: 35 SMBs</li>
                <li>Avg Revenue: $536/client</li>
                <li>Growth Rate: +25.2%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Action Items</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Upsell Global Dynamics</li>
                <li>Support Sigma Systems</li>
                <li>Request more licenses</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSMBReports = () => {
    const deptTableColumns = [
      { key: 'department', label: 'Department' },
      { key: 'users', label: 'Users', render: (value: number) => value.toString() },
      { key: 'agentCalls', label: 'Agent Calls', render: (value: number) => value.toString() },
      { key: 'savings', label: 'Cost Savings', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'efficiency', label: 'Efficiency Score', render: (value: number) => (
        <span className={`font-medium ${value > 85 ? 'text-green-600' : value > 75 ? 'text-blue-600' : 'text-gray-600'}`}>
          {value}%
        </span>
      )},
      { key: 'favoriteAgent', label: 'Top Agent', render: (value: string) => value.replace(' Agent', '') }
    ];

    return (
      <>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-black">SMB Team Productivity Reports</h2>
            <p className="text-gray-600 text-sm mt-1">
              Comprehensive analytics for your team of 24 users across 3 departments
            </p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleExport('PDF', 'Team Productivity Report')}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Team Report</span>
            </button>
            <button 
              onClick={() => handleExport('CSV', 'Usage Analytics')}
              className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Team Usage Trends */}
        <Chart
          data={smbData.usageTrends}
          type="line"
          xKey="month"
          yKey="calls"
          title="Team Agent Usage Trends"
          color="#374151"
        />

        {/* Savings Growth */}
        <Chart
          data={smbData.usageTrends}
          type="bar"
          xKey="month"
          yKey="savings"
          title="Monthly Cost Savings Analysis"
          color="#6b7280"
        />

        {/* Department Table */}
        <DataTable
          data={smbData.teamUsage}
          columns={deptTableColumns}
          title="Department Performance Analysis"
        />

        {/* Team Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-black mb-4">Team Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Top Performing Teams</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>1. Marketing (89% efficiency)</li>
                <li>2. Finance (89% efficiency)</li>
                <li>3. Operations (76% efficiency)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Key Achievements</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Total Savings: $12.6K</li>
                <li>Productivity Gain: 32%</li>
                <li>Time Reduction: 45%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Optimization Opportunities</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Expand Operations team usage</li>
                <li>Add 2 more licenses</li>
                <li>Cross-train on agents</li>
              </ul>
            </div>
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

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
          <BarChart3 className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h3 className="font-semibold text-black">Performance</h3>
          <p className="text-xs text-gray-600 mt-1">
            {perspective === 'msp' ? 'Partner performance' : perspective === 'si' ? 'Client metrics' : 'Team productivity'}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
          <PieChart className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h3 className="font-semibold text-black">Financial</h3>
          <p className="text-xs text-gray-600 mt-1">
            {perspective === 'msp' ? 'Revenue & costs' : perspective === 'si' ? 'Revenue analysis' : 'Cost savings'}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
          {perspective === 'msp' ? <Building className="w-8 h-8 text-gray-600 mx-auto mb-2" /> : <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />}
          <h3 className="font-semibold text-black">
            {perspective === 'msp' ? 'Partners' : perspective === 'si' ? 'Clients' : 'Users'}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {perspective === 'msp' ? 'SI ecosystem' : perspective === 'si' ? 'SMB portfolio' : 'Team analytics'}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 text-center">
          <TrendingUp className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <h3 className="font-semibold text-black">Trends</h3>
          <p className="text-xs text-gray-600 mt-1">
            {perspective === 'msp' ? 'Ecosystem trends' : perspective === 'si' ? 'Portfolio trends' : 'Usage patterns'}
          </p>
        </div>
      </div>

      {/* Render perspective-specific reports */}
      {perspective === 'msp' && renderMSPReports()}
      {perspective === 'si' && renderSIReports()}
      {perspective === 'smb' && renderSMBReports()}
    </div>
  );
};

export default Reports;