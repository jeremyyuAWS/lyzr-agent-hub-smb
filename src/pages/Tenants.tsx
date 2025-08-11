import React, { useState } from 'react';
import { Building, Users, CreditCard, Plus, ArrowLeft, Eye, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Zap, Clock, Target, Activity, Cpu, Network, BarChart3, PieChart, Layers, Globe } from 'lucide-react';
import CardMetric from '../components/CardMetric';
import TenantCard from '../components/TenantCard';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';
import OnboardingModal from '../components/OnboardingModal';
import InlineTenantDemo from '../components/InlineTenantDemo';

// Import data
import tokenUsage from '../data/token_usage.json';
import agentPerformance from '../data/agent_performance.json';
import licenseAnalytics from '../data/license_analytics.json';
import mspData from '../data/msp_view_data.json';
import siData from '../data/si_view_data.json';
import smbData from '../data/smb_view_data.json';

interface TenantsProps {
  perspective: string;
}

const Tenants: React.FC<TenantsProps> = ({ perspective }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'network' | 'performance' | 'optimization'>('overview');
  const [drillDownView, setDrillDownView] = useState<{type: 'si' | 'smb', id: string, name: string} | null>(null);
  const [onboardingModal, setOnboardingModal] = useState<{type: 'si' | 'smb', open: boolean}>({type: 'si', open: false});

  const handleViewTenant = (tenantId: string, tenantName: string) => {
    const type = perspective === 'msp' ? 'si' : 'smb';
    setDrillDownView({ type, id: tenantId, name: tenantName });
  };

  const handleBackToOverview = () => {
    setDrillDownView(null);
  };

  const handleAddTenant = () => {
    const type = perspective === 'msp' ? 'si' : 'smb';
    setOnboardingModal({type, open: true});
  };

  const handleOnboardingComplete = (data: any) => {
    alert(`${data.companyName} successfully onboarded! Welcome email sent and platform access configured.`);
    setOnboardingModal({type: onboardingModal.type, open: false});
  };

  // Enhanced System Integrator data
  const enhancedSIData = [
    ...licenseAnalytics.msp_license_overview.license_distribution.map(si => ({
      id: si.si_id,
      name: si.si_name,
      smbs: Math.round(si.allocated * 1.5),
      users: Math.round(si.allocated * 8),
      revenue: Math.round(si.revenue * 15),
      licenses: si.allocated,
      usedLicenses: si.used,
      utilizationRate: si.utilization,
      status: si.trend === 'growing' ? 'excellent' : si.utilization > 85 ? 'good' : 'warning',
      industry: 'Technology',
      growth: si.trend === 'growing' ? 'up' : 'stable',
      agentCalls: Math.round(si.used * 45)
    })),
    // Additional simulated System Integrators
    {
      id: 'si_005',
      name: 'InnoTech Hub',
      smbs: 31,
      users: 144,
      revenue: 15670,
      licenses: 18,
      usedLicenses: 13,
      utilizationRate: 72,
      status: 'good',
      industry: 'Technology',
      growth: 'stable',
      agentCalls: 585
    },
    {
      id: 'si_006',
      name: 'DigitalFlow Partners',
      smbs: 28,
      users: 168,
      revenue: 18920,
      licenses: 21,
      usedLicenses: 19,
      utilizationRate: 90,
      status: 'excellent',
      industry: 'Financial Services',
      growth: 'up',
      agentCalls: 855
    },
    {
      id: 'si_007',
      name: 'CloudTech Solutions',
      smbs: 24,
      users: 120,
      revenue: 12450,
      licenses: 15,
      usedLicenses: 11,
      utilizationRate: 73,
      status: 'good',
      industry: 'Healthcare',
      growth: 'stable',
      agentCalls: 495
    },
    {
      id: 'si_008',
      name: 'AgileConsult Group',
      smbs: 33,
      users: 182,
      revenue: 22340,
      licenses: 23,
      usedLicenses: 21,
      utilizationRate: 91,
      status: 'excellent',
      industry: 'Manufacturing',
      growth: 'up',
      agentCalls: 945
    },
    {
      id: 'si_009',
      name: 'SmartOps Dynamics',
      smbs: 26,
      users: 134,
      revenue: 16780,
      licenses: 17,
      usedLicenses: 14,
      utilizationRate: 82,
      status: 'good',
      industry: 'Retail',
      growth: 'stable',
      agentCalls: 630
    },
    {
      id: 'si_010',
      name: 'NextGen Integration',
      smbs: 29,
      users: 174,
      revenue: 19650,
      licenses: 22,
      usedLicenses: 20,
      utilizationRate: 91,
      status: 'excellent',
      industry: 'Education',
      growth: 'up',
      agentCalls: 900
    },
    {
      id: 'si_011',
      name: 'ProActive Systems',
      smbs: 22,
      users: 110,
      revenue: 13890,
      licenses: 14,
      usedLicenses: 11,
      utilizationRate: 79,
      status: 'good',
      industry: 'Professional Services',
      growth: 'stable',
      agentCalls: 495
    },
    {
      id: 'si_012',
      name: 'VelocityTech Partners',
      smbs: 35,
      users: 196,
      revenue: 25120,
      licenses: 25,
      usedLicenses: 24,
      utilizationRate: 96,
      status: 'warning',
      industry: 'Construction',
      growth: 'up',
      agentCalls: 1080
    },
    {
      id: 'si_013',
      name: 'IntelliServe Solutions',
      smbs: 20,
      users: 96,
      revenue: 11230,
      licenses: 12,
      usedLicenses: 9,
      utilizationRate: 75,
      status: 'good',
      industry: 'Legal Services',
      growth: 'stable',
      agentCalls: 405
    },
    {
      id: 'si_014',
      name: 'OptimalFlow Consulting',
      smbs: 27,
      users: 148,
      revenue: 17560,
      licenses: 19,
      usedLicenses: 16,
      utilizationRate: 84,
      status: 'good',
      industry: 'Marketing',
      growth: 'up',
      agentCalls: 720
    }
  ];

  // Enhanced SMB data
  const enhancedSMBData = [
    ...siData.smbPortfolio.map(smb => ({
      id: smb.id,
      name: smb.name,
      users: smb.users,
      licenses: smb.licenses,
      agentCalls: smb.agentCalls,
      monthlyRevenue: smb.monthlyRevenue,
      favoriteAgent: smb.favoriteAgent,
      lastActive: smb.lastActive,
      status: smb.status,
      growthTrend: smb.growthTrend,
      industry: smb.industry
    })),
    // Additional simulated SMBs
    {
      id: 'smb_007',
      name: 'Stellar Industries',
      users: 16,
      licenses: 5,
      agentCalls: 156,
      monthlyRevenue: 2250,
      favoriteAgent: 'Finance Agent',
      lastActive: '2024-01-14',
      status: 'active',
      growthTrend: 'up',
      industry: 'Manufacturing'
    },
    {
      id: 'smb_008',
      name: 'Nova Enterprises',
      users: 22,
      licenses: 8,
      agentCalls: 198,
      monthlyRevenue: 3920,
      favoriteAgent: 'Marketing Agent',
      lastActive: '2024-01-15',
      status: 'active',
      growthTrend: 'up',
      industry: 'Technology'
    },
    {
      id: 'smb_009',
      name: 'Zenith Corp',
      users: 12,
      licenses: 3,
      agentCalls: 89,
      monthlyRevenue: 1890,
      favoriteAgent: 'Legal Agent',
      lastActive: '2024-01-13',
      status: 'active',
      growthTrend: 'stable',
      industry: 'Healthcare'
    },
    {
      id: 'smb_010',
      name: 'Meridian Solutions',
      users: 18,
      licenses: 6,
      agentCalls: 167,
      monthlyRevenue: 3420,
      favoriteAgent: 'Operations Agent',
      lastActive: '2024-01-15',
      status: 'active',
      growthTrend: 'up',
      industry: 'Professional Services'
    },
    {
      id: 'smb_011',
      name: 'Pinnacle Dynamics',
      users: 14,
      licenses: 4,
      agentCalls: 124,
      monthlyRevenue: 2530,
      favoriteAgent: 'Support Agent',
      lastActive: '2024-01-14',
      status: 'active',
      growthTrend: 'stable',
      industry: 'Retail'
    },
    {
      id: 'smb_012',
      name: 'Catalyst Enterprises',
      users: 26,
      licenses: 7,
      agentCalls: 234,
      monthlyRevenue: 4720,
      favoriteAgent: 'Marketing Agent',
      lastActive: '2024-01-15',
      status: 'active',
      growthTrend: 'up',
      industry: 'Education'
    },
    {
      id: 'smb_013',
      name: 'Fusion Analytics',
      users: 28,
      licenses: 9,
      agentCalls: 267,
      monthlyRevenue: 5940,
      favoriteAgent: 'Finance Agent',
      lastActive: '2024-01-15',
      status: 'active',
      growthTrend: 'up',
      industry: 'Financial Services'
    },
    {
      id: 'smb_014',
      name: 'Quantum Systems',
      users: 15,
      licenses: 5,
      agentCalls: 145,
      monthlyRevenue: 2890,
      favoriteAgent: 'Operations Agent',
      lastActive: '2024-01-14',
      status: 'active',
      growthTrend: 'stable',
      industry: 'Construction'
    },
    {
      id: 'smb_015',
      name: 'Apex Consulting',
      users: 19,
      licenses: 6,
      agentCalls: 178,
      monthlyRevenue: 3650,
      favoriteAgent: 'Legal Agent',
      lastActive: '2024-01-13',
      status: 'active',
      growthTrend: 'up',
      industry: 'Professional Services'
    },
    {
      id: 'smb_016',
      name: 'Velocity Healthcare',
      users: 24,
      licenses: 8,
      agentCalls: 212,
      monthlyRevenue: 5020,
      favoriteAgent: 'Operations Agent',
      lastActive: '2024-01-15',
      status: 'active',
      growthTrend: 'up',
      industry: 'Healthcare'
    }
  ];

  // Enhanced team/user data for SMB view
  const enhancedTeamData = [
    ...smbData.teamUsage,
    {
      department: 'Sales',
      users: 4,
      agentCalls: 45,
      favoriteAgent: 'Sales Agent',
      savings: 1800,
      efficiency: 82
    },
    {
      department: 'Customer Success',
      users: 3,
      agentCalls: 38,
      favoriteAgent: 'Support Agent',
      savings: 1500,
      efficiency: 79
    }
  ];

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
          title: 'MSP Ecosystem Management - 47 System Integrators',
          description: 'Monitor partner performance, token consumption, and revenue across your entire ecosystem',
          badge: 'MSP Management',
          colors,
          actionText: 'Add System Integrator'
        };
      case 'si':
        return {
          title: 'SI Portfolio Management - CloudPro Services',
          description: 'Manage 35 SMB clients with comprehensive analytics on usage, licensing, and performance',
          badge: 'SI Management',
          colors,
          actionText: 'Add SMB Client'
        };
      case 'smb':
        return {
          title: 'SMB Team Management - Global Dynamics',
          description: 'Optimize your team of 24 users with detailed insights on agent usage and license efficiency',
          badge: 'Team Management',
          colors,
          actionText: 'Add Team Member'
        };
      default:
        return {
          title: 'Tenant Management',
          description: 'Multi-tenant management interface',
          badge: 'Management',
          colors: getContextColors('default'),
          actionText: 'Add Tenant'
        };
    }
  };

  // Enhanced Network Visualization Component
  const NetworkVisualization = () => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black">Ecosystem Network Map</h3>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">MSP</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">System Integrators</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">SMB Clients</span>
        </div>
      </div>
      
      <div className="relative h-80 bg-gray-50 rounded-lg overflow-hidden">
        {/* Central MSP Node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            MSP
          </div>
          <div className="text-center mt-2 text-sm font-medium text-black">Lyzr Technologies</div>
        </div>

        {/* SI Nodes in a circle around MSP */}
        {[
          { name: 'CloudPro', x: '20%', y: '20%', size: 'large', color: 'bg-blue-500' },
          { name: 'NetSecure', x: '80%', y: '25%', size: 'large', color: 'bg-blue-500' },
          { name: 'TechFlow', x: '15%', y: '70%', size: 'medium', color: 'bg-blue-400' },
          { name: 'DataSync', x: '75%', y: '75%', size: 'medium', color: 'bg-blue-400' },
          { name: 'InnoTech', x: '50%', y: '10%', size: 'medium', color: 'bg-blue-400' },
          { name: 'DigitalFlow', x: '90%', y: '50%', size: 'medium', color: 'bg-blue-400' },
        ].map((si, index) => (
          <div key={index} className={`absolute transform -translate-x-1/2 -translate-y-1/2`} style={{left: si.x, top: si.y}}>
            <div className={`${si.size === 'large' ? 'w-14 h-14' : 'w-10 h-10'} ${si.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer hover:scale-110 transition-transform`}>
              SI
            </div>
            <div className="text-center mt-1 text-xs font-medium text-gray-700">{si.name}</div>
          </div>
        ))}

        {/* SMB Nodes around SIs */}
        {[
          { name: 'Global Dynamics', x: '5%', y: '35%', color: 'bg-green-500' },
          { name: 'Omega Corp', x: '90%', y: '45%', color: 'bg-green-500' },
          { name: 'Sigma Systems', x: '25%', y: '90%', color: 'bg-green-400' },
          { name: 'Stellar Industries', x: '70%', y: '5%', color: 'bg-green-400' },
          { name: 'Nova Enterprises', x: '5%', y: '15%', color: 'bg-green-400' },
          { name: 'Zenith Corp', x: '85%', y: '85%', color: 'bg-green-400' },
        ].map((smb, index) => (
          <div key={index} className={`absolute transform -translate-x-1/2 -translate-y-1/2`} style={{left: smb.x, top: smb.y}}>
            <div className={`w-8 h-8 ${smb.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer hover:scale-110 transition-transform`}>
              SMB
            </div>
            <div className="text-center mt-1 text-xs text-gray-600" style={{fontSize: '10px'}}>{smb.name}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-bold text-purple-600">1</p>
          <p className="text-xs text-gray-600">MSP Hub</p>
        </div>
        <div>
          <p className="text-lg font-bold text-blue-600">47</p>
          <p className="text-xs text-gray-600">System Integrators</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-600">284</p>
          <p className="text-xs text-gray-600">SMB Clients</p>
        </div>
      </div>
    </div>
  );

  // Enhanced Performance Dashboard
  const PerformanceDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Network className="w-6 h-6 opacity-80" />
            <span className="text-sm opacity-80">+15.2%</span>
          </div>
          <p className="text-2xl font-bold">47</p>
          <p className="text-sm opacity-90">Active Partners</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Cpu className="w-6 h-6 opacity-80" />
            <span className="text-sm opacity-80">+28.5%</span>
          </div>
          <p className="text-2xl font-bold">45.7M</p>
          <p className="text-sm opacity-90">Tokens/Month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 opacity-80" />
            <span className="text-sm opacity-80">+23.5%</span>
          </div>
          <p className="text-2xl font-bold">$89.4K</p>
          <p className="text-sm opacity-90">Monthly Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6 opacity-80" />
            <span className="text-sm opacity-80">+5.2%</span>
          </div>
          <p className="text-2xl font-bold">87%</p>
          <p className="text-sm opacity-90">Efficiency Score</p>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Live Activity Feed</h3>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'CloudPro Services deployed Finance Agent to Global Dynamics', type: 'success' },
              { time: '5 min ago', action: 'NetSecure Ltd requested 10 additional licenses', type: 'info' },
              { time: '12 min ago', action: 'TechFlow Solutions onboarded new SMB client', type: 'success' },
              { time: '18 min ago', action: 'High utilization alert: DataSync Partners at 92%', type: 'warning' },
              { time: '25 min ago', action: 'Monthly revenue milestone: $89K achieved', type: 'success' },
              { time: '32 min ago', action: 'VelocityTech Partners exceeded license capacity', type: 'warning' },
              { time: '45 min ago', action: 'Fusion Analytics upgraded to Enterprise tier', type: 'success' },
              { time: '1 hr ago', action: 'InnoTech Hub completed agent deployment training', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Performance Heatmap</h3>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({length: 35}, (_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className={`aspect-square rounded ${
                    intensity > 0.8 ? 'bg-green-500' :
                    intensity > 0.6 ? 'bg-green-400' :
                    intensity > 0.4 ? 'bg-green-300' :
                    intensity > 0.2 ? 'bg-green-200' : 'bg-gray-100'
                  }`}
                  title={`Day ${i + 1}: ${Math.round(intensity * 100)}% activity`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Less</span>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Optimization Dashboard
  const OptimizationDashboard = () => (
    <div className="space-y-6">
      {/* Optimization Opportunities */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-black mb-6">AI-Powered Optimization Opportunities</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* High Priority */}
          <div className="space-y-4">
            <h4 className="font-medium text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              High Priority Actions
            </h4>
            
            {[
              {
                title: 'VelocityTech Partners License Crisis',
                description: '96% utilization rate indicates immediate license shortage risk',
                impact: '+$520/month revenue',
                action: 'Allocate 8 licenses',
                urgency: 'Immediate',
                color: 'border-red-500 bg-red-50'
              },
              {
                title: 'CloudPro Services Capacity Planning',
                description: '90% utilization rate requires proactive license allocation',
                impact: '+$325/month revenue',
                action: 'Increase by 5 licenses',
                urgency: '24 hours',
                color: 'border-orange-500 bg-orange-50'
              },
              {
                title: 'NextGen Integration Expansion',
                description: '91% utilization with education sector growth opportunity',
                impact: '+$450/month revenue',
                action: 'Add 6 licenses',
                urgency: '3 days',
                color: 'border-yellow-500 bg-yellow-50'
              }
            ].map((opp, index) => (
              <div key={index} className={`border-l-4 ${opp.color} p-4 rounded-lg`}>
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{opp.title}</h5>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    {opp.urgency}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{opp.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{opp.impact}</span>
                  <button className="bg-white border border-gray-300 text-black px-3 py-1 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    {opp.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Growth Opportunities */}
          <div className="space-y-4">
            <h4 className="font-medium text-green-800 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Growth Opportunities
            </h4>
            
            {[
              {
                title: 'Healthcare Vertical Expansion',
                description: 'CloudTech Solutions and Velocity Healthcare show strong healthcare traction',
                impact: '+$2.8K/month potential',
                action: 'Target Healthcare',
                timeline: '30 days',
                color: 'border-green-500 bg-green-50'
              },
              {
                title: 'Financial Services Acceleration',
                description: 'DigitalFlow Partners and Fusion Analytics driving fintech adoption',
                impact: '+$3.2K/month potential',
                action: 'Expand FinTech',
                timeline: '45 days',
                color: 'border-blue-500 bg-blue-50'
              },
              {
                title: 'Manufacturing Automation',
                description: 'AgileConsult Group shows 91% efficiency in manufacturing sector',
                impact: '+$1.9K/month potential',
                action: 'Scale Manufacturing',
                timeline: '21 days',
                color: 'border-purple-500 bg-purple-50'
              }
            ].map((opp, index) => (
              <div key={index} className={`border-l-4 ${opp.color} p-4 rounded-lg`}>
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{opp.title}</h5>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {opp.timeline}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{opp.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{opp.impact}</span>
                  <button className="bg-white border border-gray-300 text-black px-3 py-1 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    {opp.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Projection Chart */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">ROI Projection with Optimizations</h3>
        <Chart
          data={[
            { month: 'Current', baseline: 89400, optimized: 89400 },
            { month: 'Month 1', baseline: 92100, optimized: 95800 },
            { month: 'Month 2', baseline: 94800, optimized: 103200 },
            { month: 'Month 3', baseline: 97500, optimized: 111900 },
            { month: 'Month 4', baseline: 100200, optimized: 122100 },
            { month: 'Month 5', baseline: 102900, optimized: 133800 },
            { month: 'Month 6', baseline: 105600, optimized: 147200 }
          ]}
          type="line"
          xKey="month"
          yKey="optimized"
          title="Revenue Projection: Current vs Optimized"
          color="#10b981"
        />
      </div>
    </div>
  );

  const renderMSPView = () => {
    const tabs = [
      { id: 'overview', label: 'Ecosystem Overview', icon: Building },
      { id: 'network', label: 'Network Topology', icon: Network },
      { id: 'performance', label: 'Performance Analytics', icon: BarChart3 },
      { id: 'optimization', label: 'AI Optimization', icon: Zap }
    ];

    return (
      <div className="space-y-6">
        {/* Enhanced Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-black border-b-2 border-black bg-gray-50'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Inline Demo Component */}
            <InlineTenantDemo perspective="msp" />
            
            {/* Real-time Ecosystem Status */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">MSP Ecosystem Command Center</h2>
                    <p className="text-lg opacity-90">Real-time monitoring of 47 System Integrators across 8 industries</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">$91.5K</div>
                    <div className="text-sm opacity-80">Monthly Ecosystem Revenue</div>
                    <div className="flex items-center justify-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">+23.5% growth</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-sm opacity-80">System Integrators</div>
                    <div className="text-xs text-green-300 mt-1">+12 this quarter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">284</div>
                    <div className="text-sm opacity-80">SMB Clients</div>
                    <div className="text-xs text-green-300 mt-1">+52 this month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm opacity-80">End Users</div>
                    <div className="text-xs text-green-300 mt-1">+18% adoption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-sm opacity-80">Ecosystem Health</div>
                    <div className="text-xs text-green-300 mt-1">Excellent</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <CardMetric
                title="System Integrators"
                value={enhancedSIData.length}
                change="+12.5%"
                icon={Building}
                trend="up"
              />
              <CardMetric
                title="Total SMB Customers"
                value={enhancedSIData.reduce((sum, si) => sum + si.smbs, 0)}
                change="+18.2%"
                icon={Users}
                trend="up"
              />
              <CardMetric
                title="Monthly Revenue"
                value={`$${Math.round(enhancedSIData.reduce((sum, si) => sum + si.revenue, 0) / 1000)}K`}
                change="+23.5%"
                icon={DollarSign}
                trend="up"
              />
              <CardMetric
                title="License Utilization"
                value={`${Math.round(enhancedSIData.reduce((sum, si) => sum + si.utilizationRate, 0) / enhancedSIData.length)}%`}
                change="+5.2%"
                icon={Target}
                trend="up"
              />
            </div>

            {/* System Integrator Tenants */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">System Integrator Portfolio</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{enhancedSIData.length} Partners • ${Math.round(enhancedSIData.reduce((sum, si) => sum + si.revenue, 0) / 1000)}K Monthly Revenue</span>
                  <button
                    onClick={handleAddTenant}
                    className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add System Integrator</span>
                  </button>
                </div>
              </div>
              
              {/* Enhanced SI Portfolio with Industry Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enhancedSIData.map((si) => (
                  <div key={si.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl ${
                          si.status === 'excellent' ? 'bg-green-100' :
                          si.status === 'warning' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <Building className={`w-6 h-6 ${
                            si.status === 'excellent' ? 'text-green-600' :
                            si.status === 'warning' ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-black group-hover:text-blue-600 transition-colors">{si.name}</h3>
                          <p className="text-sm text-gray-600">{si.industry}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          si.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          si.status === 'warning' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {si.utilizationRate}% utilization
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-black">{si.smbs}</div>
                        <div className="text-xs text-gray-600">SMB Clients</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">${(si.revenue / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-600">Monthly Revenue</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">License Usage</span>
                        <span className="font-medium">{si.usedLicenses}/{si.licenses}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            si.utilizationRate > 90 ? 'bg-red-500' :
                            si.utilizationRate > 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${si.utilizationRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewTenant(si.id, si.name)}
                        className="flex-1 bg-white border border-gray-300 text-black py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Industry Distribution Chart */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Partner Distribution by Industry</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { industry: 'Technology', count: 12, color: 'bg-blue-500', percentage: 26 },
                    { industry: 'Healthcare', count: 8, color: 'bg-green-500', percentage: 17 },
                    { industry: 'Financial Services', count: 7, color: 'bg-purple-500', percentage: 15 },
                    { industry: 'Manufacturing', count: 6, color: 'bg-orange-500', percentage: 13 },
                    { industry: 'Professional Services', count: 5, color: 'bg-red-500', percentage: 11 },
                    { industry: 'Education', count: 4, color: 'bg-indigo-500', percentage: 9 },
                    { industry: 'Retail', count: 3, color: 'bg-yellow-500', percentage: 6 },
                    { industry: 'Construction', count: 2, color: 'bg-gray-500', percentage: 4 }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-full h-24 ${item.color} rounded-lg mb-2 flex items-center justify-center text-white font-bold text-xl`}>
                        {item.count}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.industry}</div>
                      <div className="text-xs text-gray-600">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Trends Chart */}
              <Chart
                data={[
                  { month: 'Jul', revenue: 72500, partners: 35, smbs: 198 },
                  { month: 'Aug', revenue: 78900, partners: 38, smbs: 215 },
                  { month: 'Sep', revenue: 82200, partners: 41, smbs: 238 },
                  { month: 'Oct', revenue: 85800, partners: 43, smbs: 256 },
                  { month: 'Nov', revenue: 87400, partners: 45, smbs: 271 },
                  { month: 'Dec', revenue: 91500, partners: 47, smbs: 284 }
                ]}
                type="line"
                xKey="month"
                yKey="revenue"
                title="Ecosystem Growth Trends - Revenue & Partner Count"
                color="#6366f1"
              />
            </div>

            {/* Top Performing Partners Table */}
            <DataTable
              data={enhancedSIData.slice(0, 10).map(si => ({
                key: si.id,
                name: si.name,
                industry: si.industry,
                smbs: si.smbs,
                revenue: `$${(si.revenue / 1000).toFixed(1)}K`,
                utilization: `${si.utilizationRate}%`,
                growth: si.growth === 'up' ? '↗ Growing' : '→ Stable',
                status: si.status
              }))}
              columns={[
                { key: 'name', label: 'System Integrator' },
                { key: 'industry', label: 'Industry' },
                { key: 'smbs', label: 'SMB Clients' },
                { key: 'revenue', label: 'Monthly Revenue' },
                { key: 'utilization', label: 'License Usage' },
                { key: 'growth', label: 'Trend' },
                { 
                  key: 'status', 
                  label: 'Status', 
                  render: (value: string) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === 'excellent' ? 'bg-green-100 text-green-800' :
                      value === 'warning' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {value === 'excellent' ? 'Excellent' : value === 'warning' ? 'Needs Attention' : 'Good'}
                    </span>
                  )
                }
              ]}
              title="Top Performing System Integrators"
            />
          </div>
        )}

        {activeTab === 'network' && <NetworkVisualization />}
        {activeTab === 'performance' && <PerformanceDashboard />}
        {activeTab === 'optimization' && <OptimizationDashboard />}
      </div>
    );
  };

  const renderSIView = () => {
    return (
      <div className="space-y-6">
        {/* Inline Demo Component */}
        <InlineTenantDemo perspective="si" />
        
        {/* SI Portfolio Command Center */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">CloudPro Services - SI Portfolio</h2>
                <p className="text-lg opacity-90">Managing 35 SMB clients across multiple industries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">${(enhancedSMBData.reduce((sum, smb) => sum + smb.monthlyRevenue, 0) / 1000).toFixed(1)}K</div>
                <div className="text-sm opacity-80">Monthly Portfolio Revenue</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+25.2% growth</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{enhancedSMBData.length}</div>
                <div className="text-sm opacity-80">SMB Clients</div>
                <div className="text-xs text-green-300 mt-1">+8 this quarter</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{enhancedSMBData.reduce((sum, smb) => sum + smb.users, 0)}</div>
                <div className="text-sm opacity-80">End Users</div>
                <div className="text-xs text-green-300 mt-1">+22.3% growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{enhancedSMBData.reduce((sum, smb) => sum + smb.agentCalls, 0)}</div>
                <div className="text-sm opacity-80">Agent Calls</div>
                <div className="text-xs text-green-300 mt-1">This month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm opacity-80">Client Satisfaction</div>
                <div className="text-xs text-green-300 mt-1">Excellent</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <CardMetric
            title="SMB Clients"
            value={enhancedSMBData.length}
            change="+15.7%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Total Users"
            value={enhancedSMBData.reduce((sum, smb) => sum + smb.users, 0)}
            change="+22.3%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Monthly Revenue"
            value={`$${Math.round(enhancedSMBData.reduce((sum, smb) => sum + smb.monthlyRevenue, 0) / 1000)}K`}
            change="+25.2%"
            icon={DollarSign}
            trend="up"
          />
          <CardMetric
            title="Agent Calls"
            value={enhancedSMBData.reduce((sum, smb) => sum + smb.agentCalls, 0).toLocaleString()}
            change="+18.9%"
            icon={Activity}
            trend="up"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black">SMB Client Portfolio</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{enhancedSMBData.length} Clients • ${Math.round(enhancedSMBData.reduce((sum, smb) => sum + smb.monthlyRevenue, 0) / 1000)}K Monthly Revenue</span>
              <button
                onClick={handleAddTenant}
                className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add SMB Client</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enhancedSMBData.map((smb) => (
              <div key={smb.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      smb.growthTrend === 'up' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Users className={`w-6 h-6 ${
                        smb.growthTrend === 'up' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-black group-hover:text-blue-600 transition-colors">{smb.name}</h3>
                      <p className="text-sm text-gray-600">{smb.industry}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      smb.growthTrend === 'up' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {smb.growthTrend === 'up' ? '↗ Growing' : '→ Stable'}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-black">{smb.users}</div>
                    <div className="text-xs text-gray-600">Users</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-black">{smb.agentCalls}</div>
                    <div className="text-xs text-gray-600">Calls</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-green-600">${(smb.monthlyRevenue / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">Revenue</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-1">Favorite Agent</div>
                  <div className="text-sm font-medium text-blue-600">{smb.favoriteAgent}</div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewTenant(smb.id, smb.name)}
                    className="flex-1 bg-white border border-gray-300 text-black py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
                    <Activity className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Client Performance Analytics */}
          <Chart
            data={[
              { month: 'Jul', clients: 28, revenue: 48200, satisfaction: 89 },
              { month: 'Aug', clients: 30, revenue: 52800, satisfaction: 91 },
              { month: 'Sep', clients: 32, revenue: 58400, satisfaction: 92 },
              { month: 'Oct', clients: 33, revenue: 61900, satisfaction: 93 },
              { month: 'Nov', clients: 34, revenue: 65200, satisfaction: 94 },
              { month: 'Dec', clients: 35, revenue: 68700, satisfaction: 94 }
            ]}
            type="line"
            xKey="month"
            yKey="revenue"
            title="SMB Portfolio Growth - Revenue & Client Satisfaction"
            color="#3b82f6"
          />

          {/* Industry Breakdown */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SMB Client Distribution by Industry</h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { industry: 'Technology', count: 8, color: 'bg-blue-500' },
                { industry: 'Healthcare', count: 6, color: 'bg-green-500' },
                { industry: 'Manufacturing', count: 5, color: 'bg-orange-500' },
                { industry: 'Financial Services', count: 4, color: 'bg-purple-500' },
                { industry: 'Professional Services', count: 3, color: 'bg-red-500' },
                { industry: 'Education', count: 3, color: 'bg-indigo-500' },
                { industry: 'Retail', count: 2, color: 'bg-yellow-500' },
                { industry: 'Construction', count: 2, color: 'bg-gray-500' },
                { industry: 'Other', count: 2, color: 'bg-pink-500' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-full h-16 ${item.color} rounded-lg mb-2 flex items-center justify-center text-white font-bold text-lg`}>
                    {item.count}
                  </div>
                  <div className="text-xs font-medium text-gray-900">{item.industry}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSMBView = () => {
    return (
      <div className="space-y-6">
        {/* Inline Demo Component */}
        <InlineTenantDemo perspective="smb" />
        
        {/* SMB Team Command Center */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Global Dynamics - Team Dashboard</h2>
                <p className="text-lg opacity-90">Optimizing productivity across 24 team members</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">${(enhancedTeamData.reduce((sum, dept) => sum + dept.savings, 0) / 1000).toFixed(1)}K</div>
                <div className="text-sm opacity-80">Monthly Cost Savings</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+22.4% improvement</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{enhancedTeamData.reduce((sum, dept) => sum + dept.users, 0)}</div>
                <div className="text-sm opacity-80">Team Members</div>
                <div className="text-xs text-green-300 mt-1">Across {enhancedTeamData.length} departments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{enhancedTeamData.reduce((sum, dept) => sum + dept.agentCalls, 0)}</div>
                <div className="text-sm opacity-80">Agent Calls</div>
                <div className="text-xs text-green-300 mt-1">This month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">32%</div>
                <div className="text-sm opacity-80">Productivity Gain</div>
                <div className="text-xs text-green-300 mt-1">vs baseline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm opacity-80">Team Efficiency</div>
                <div className="text-xs text-green-300 mt-1">Excellent</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <CardMetric
            title="Active Team Members"
            value={enhancedTeamData.reduce((sum, dept) => sum + dept.users, 0)}
            change="+9.1%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Active Departments"
            value={enhancedTeamData.length}
            change="+2 new"
            icon={Building}
            trend="up"
          />
          <CardMetric
            title="Agent Calls"
            value={enhancedTeamData.reduce((sum, dept) => sum + dept.agentCalls, 0)}
            change="+15.8%"
            icon={Activity}
            trend="up"
          />
          <CardMetric
            title="Cost Savings"
            value={`$${Math.round(enhancedTeamData.reduce((sum, dept) => sum + dept.savings, 0) / 1000)}K`}
            change="+22.4%"
            icon={DollarSign}
            trend="up"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black">Department Performance</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{enhancedTeamData.length} Departments • {enhancedTeamData.reduce((sum, dept) => sum + dept.users, 0)} Team Members</span>
              <button
                onClick={handleAddTenant}
                className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Team Member</span>
              </button>
            </div>
          </div>
          
          {/* Enhanced Department Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enhancedTeamData.map((dept, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      dept.efficiency > 85 ? 'bg-green-100' : 
                      dept.efficiency > 75 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {dept.department === 'Marketing' && <TrendingUp className={`w-6 h-6 ${dept.efficiency > 85 ? 'text-green-600' : 'text-yellow-600'}`} />}
                      {dept.department === 'Finance' && <DollarSign className={`w-6 h-6 ${dept.efficiency > 85 ? 'text-green-600' : 'text-yellow-600'}`} />}
                      {dept.department === 'Operations' && <Zap className={`w-6 h-6 ${dept.efficiency > 85 ? 'text-green-600' : 'text-yellow-600'}`} />}
                      {dept.department === 'Sales' && <Target className={`w-6 h-6 ${dept.efficiency > 85 ? 'text-green-600' : 'text-yellow-600'}`} />}
                      {dept.department === 'Customer Success' && <Activity className={`w-6 h-6 ${dept.efficiency > 85 ? 'text-green-600' : 'text-yellow-600'}`} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-black">{dept.department}</h4>
                      <p className="text-sm text-gray-600">{dept.users} team members</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dept.efficiency > 85 ? 'bg-green-100 text-green-800' : 
                    dept.efficiency > 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {dept.efficiency}% efficient
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-black">{dept.agentCalls}</div>
                    <div className="text-xs text-gray-600">Agent Calls</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">${(dept.savings / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-gray-600">Savings</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-1">Top Agent</div>
                  <div className="text-sm font-medium text-blue-600">{dept.favoriteAgent}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Performance</span>
                    <span className="font-medium">{dept.efficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        dept.efficiency > 85 ? 'bg-green-500' : 
                        dept.efficiency > 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${dept.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Performance Chart */}
          <Chart
            data={[
              { month: 'Jul', productivity: 24, savings: 8900, calls: 156 },
              { month: 'Aug', productivity: 27, savings: 9800, calls: 168 },
              { month: 'Sep', productivity: 29, savings: 10600, calls: 185 },
              { month: 'Oct', productivity: 30, savings: 11400, calls: 192 },
              { month: 'Nov', productivity: 31, savings: 12100, calls: 196 },
              { month: 'Dec', productivity: 32, savings: 12600, calls: 198 }
            ]}
            type="line"
            xKey="month"
            yKey="productivity"
            title="Team Productivity Growth - Monthly Progress"
            color="#10b981"
          />

          {/* Top Performers */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Top Performing Team Members</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', role: 'Marketing Manager', calls: 47, agent: 'Marketing Agent', savings: 3200 },
                { name: 'Mike Rodriguez', role: 'Finance Director', calls: 42, agent: 'Finance Agent', savings: 2800 },
                { name: 'Lisa Park', role: 'Operations Lead', calls: 38, agent: 'Operations Agent', savings: 2400 },
                { name: 'David Kim', role: 'Sales Manager', calls: 35, agent: 'Sales Agent', savings: 2100 },
                { name: 'Emily Watson', role: 'Customer Success', calls: 32, agent: 'Support Agent', savings: 1900 }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-black">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-black">{member.calls} calls</div>
                    <div className="text-xs text-green-600">${member.savings.toLocaleString()} saved</div>
                    <div className="text-xs text-blue-600">{member.agent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const context = getPerspectiveContext();

  if (drillDownView) {
    // Handle drill-down view logic here if needed
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBackToOverview}
            className="flex items-center space-x-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </button>
          <div className="text-sm text-gray-600">Viewing: {drillDownView.name}</div>
        </div>
        
        {/* Drill-down content would go here */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Detailed View: {drillDownView.name}</h3>
          <p className="text-gray-600">Detailed tenant analytics and management interface would be displayed here.</p>
        </div>
      </div>
    );
  }

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

      {/* Onboarding Modal */}
      <OnboardingModal
        type={onboardingModal.type}
        isOpen={onboardingModal.open}
        onClose={() => setOnboardingModal({...onboardingModal, open: false})}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Tenants;