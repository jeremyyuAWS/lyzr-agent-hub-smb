import React, { useState } from 'react';
import { 
  CreditCard, TrendingUp, Users, Building, DollarSign, AlertTriangle, 
  CheckCircle, Clock, Target, Zap, ArrowUp, ArrowDown, Plus, Settings,
  Calendar, BarChart3, PieChart, Activity, RefreshCw, Filter
} from 'lucide-react';
import Chart from '../components/Chart';
import DataTable from '../components/DataTable';
import CardMetric from '../components/CardMetric';
import licenseData from '../data/license_management.json';

interface LicensesProps {
  perspective: string;
}

const Licenses: React.FC<LicensesProps> = ({ perspective }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [showBillingDetails, setShowBillingDetails] = useState(false);

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
          title: 'MSP License Management - Global Ecosystem Control',
          description: 'Manage 1,000 license pool across 47 System Integrators with predictive capacity planning',
          badge: 'MSP License Control',
          colors
        };
      case 'si':
        return {
          title: 'SI License Portfolio - CloudPro Services',
          description: 'Manage 35 allocated licenses across your SMB client portfolio with billing optimization',
          badge: 'SI License Management',
          colors
        };
      case 'smb':
        return {
          title: 'SMB License Usage - Global Dynamics',
          description: 'Optimize your 8 allocated licenses across departments for maximum ROI and productivity',
          badge: 'Team License Optimization',
          colors
        };
      default:
        return {
          title: 'License Management',
          description: 'Manage licenses and usage across your organization',
          badge: 'License Control',
          colors: getContextColors('default')
        };
    }
  };

  const renderMSPView = () => {
    const pool = licenseData.msp_license_pool;
    const allocations = licenseData.si_allocations;
    const billing = licenseData.billing_analytics;
    const tokens = licenseData.token_consumption;

    const allocationColumns = [
      { key: 'si_name', label: 'System Integrator' },
      { key: 'allocated', label: 'Allocated', render: (value: number) => value.toString() },
      { key: 'used', label: 'Used', render: (value: number) => value.toString() },
      { key: 'utilization', label: 'Utilization', render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${value > 90 ? 'bg-red-500' : value > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className={`text-sm font-medium ${value > 90 ? 'text-red-600' : value > 80 ? 'text-yellow-600' : 'text-green-600'}`}>
            {value}%
          </span>
        </div>
      )},
      { key: 'monthly_revenue', label: 'Revenue', render: (value: number) => `$${value.toLocaleString()}` },
      { key: 'payment_status', label: 'Status', render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'current' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value === 'current' ? 'Current' : 'Overdue'}
        </span>
      )},
      { key: 'expansion_score', label: 'Expansion Score', render: (value: number) => (
        <div className="flex items-center space-x-1">
          <Target className={`w-4 h-4 ${value > 80 ? 'text-green-500' : value > 50 ? 'text-yellow-500' : 'text-red-500'}`} />
          <span className={`font-medium ${value > 80 ? 'text-green-600' : value > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {value}/100
          </span>
        </div>
      )}
    ];

    return (
      <>
        {/* MSP License Pool Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <CardMetric
            title="Total License Pool"
            value={pool.total_licenses.toLocaleString()}
            change="+15.3%"
            icon={CreditCard}
            trend="up"
          />
          <CardMetric
            title="Allocated Licenses"
            value={pool.allocated_licenses.toLocaleString()}
            change="+23.5%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Available Licenses"
            value={pool.available_licenses.toLocaleString()}
            icon={Building}
          />
          <CardMetric
            title="Utilization Rate"
            value={`${pool.utilization_rate}%`}
            change="+8.2%"
            icon={TrendingUp}
            trend="up"
          />
          <CardMetric
            title="Monthly Revenue"
            value={`$${pool.monthly_revenue.toLocaleString()}`}
            change="+23.5%"
            icon={DollarSign}
            trend="up"
          />
        </div>

        {/* Revenue & Profitability Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="Profit Margin"
            value={`${pool.profit_margin}%`}
            change="+5.1%"
            icon={Target}
            trend="up"
          />
          <CardMetric
            title="ARR"
            value={`$${(billing.annual_recurring_revenue / 1000).toFixed(0)}K`}
            change="+28.3%"
            icon={Zap}
            trend="up"
          />
          <CardMetric
            title="NRR"
            value={`${billing.net_revenue_retention}%`}
            change="+12.5%"
            icon={Activity}
            trend="up"
          />
          <CardMetric
            title="Churn Rate"
            value={`${billing.churn_rate}%`}
            change="-0.8%"
            icon={CheckCircle}
            trend="up"
          />
        </div>

        {/* Capacity Forecasting Chart */}
        <Chart
          data={licenseData.capacity_forecasting}
          type="line"
          xKey="month"
          yKey="demand"
          title="License Demand Forecasting - Next 6 Months"
          color="#8b5cf6"
        />

        {/* Token Consumption Analytics */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Token Consumption Analytics</h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {tokens.total_monthly_tokens.toLocaleString()} tokens/month
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tokens.top_consuming_sis.map((si, index) => (
              <div key={index} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-900">{si.si_name}</h4>
                  <span className="text-sm font-bold text-purple-700">#{index + 1}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Tokens:</span>
                    <span className="font-medium text-purple-900">{(si.tokens / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Cost:</span>
                    <span className="font-medium text-purple-900">${si.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Efficiency:</span>
                    <span className={`font-medium ${si.efficiency > 88 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {si.efficiency}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Growth:</span>
                    <span className="font-medium text-green-600">+{si.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SI Allocation Management Table */}
        <DataTable
          data={allocations}
          columns={allocationColumns}
          title="System Integrator License Allocation & Performance"
        />

        {/* Billing Insights */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Advanced Billing Analytics</h3>
            <button 
              onClick={() => setShowBillingDetails(!showBillingDetails)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showBillingDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">MRR</span>
              </div>
              <p className="text-2xl font-bold">${billing.monthly_recurring_revenue.toLocaleString()}</p>
              <p className="text-sm opacity-90">+23.5% growth</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5" />
                <span className="font-medium">Expansion Revenue</span>
              </div>
              <p className="text-2xl font-bold">${billing.expansion_revenue.toLocaleString()}</p>
              <p className="text-sm opacity-90">This month</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-medium">Customer LTV</span>
              </div>
              <p className="text-2xl font-bold">${(billing.customer_lifetime_value / 1000).toFixed(0)}K</p>
              <p className="text-sm opacity-90">{billing.payback_period} months payback</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Collection Rate</span>
              </div>
              <p className="text-2xl font-bold">{billing.collection_rate}%</p>
              <p className="text-sm opacity-90">${billing.overdue_amount.toLocaleString()} overdue</p>
            </div>
          </div>

          {showBillingDetails && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-3">Revenue Intelligence</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-purple-700 mb-2">Growth Metrics:</p>
                  <ul className="space-y-1 text-purple-800">
                    <li>• Net Revenue Retention: {billing.net_revenue_retention}%</li>
                    <li>• Expansion vs Contraction: +${(billing.expansion_revenue - billing.contraction_revenue).toLocaleString()}</li>
                    <li>• Monthly Churn Rate: {billing.churn_rate}%</li>
                  </ul>
                </div>
                <div>
                  <p className="text-purple-700 mb-2">Financial Health:</p>
                  <ul className="space-y-1 text-purple-800">
                    <li>• ARR Run Rate: ${billing.annual_recurring_revenue.toLocaleString()}</li>
                    <li>• Average Payback: {billing.payback_period} months</li>
                    <li>• Collection Efficiency: {billing.collection_rate}%</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderSIView = () => {
    const siAllocation = licenseData.si_allocations.find(si => si.si_name === "CloudPro Services");
    
    if (!siAllocation) return <div>No data available for this SI</div>;

    return (
      <>
        {/* SI License Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <CardMetric
            title="Allocated Licenses"
            value={siAllocation.allocated.toString()}
            change="+20%"
            icon={CreditCard}
            trend="up"
          />
          <CardMetric
            title="Used Licenses"
            value={siAllocation.used.toString()}
            change="+18%"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Available Licenses"
            value={siAllocation.available.toString()}
            icon={Building}
          />
          <CardMetric
            title="Utilization Rate"
            value={`${siAllocation.utilization}%`}
            change="+12%"
            icon={TrendingUp}
            trend="up"
          />
          <CardMetric
            title="Monthly Revenue"
            value={`$${siAllocation.monthly_revenue.toLocaleString()}`}
            change="+30%"
            icon={DollarSign}
            trend="up"
          />
        </div>

        {/* Profitability & Efficiency */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardMetric
            title="Monthly Profit"
            value={`$${siAllocation.profit.toLocaleString()}`}
            change="+45%"
            icon={Target}
            trend="up"
          />
          <CardMetric
            title="Markup Percentage"
            value={`${siAllocation.markup}%`}
            icon={Zap}
          />
          <CardMetric
            title="Expansion Score"
            value={`${siAllocation.expansion_score}/100`}
            change="+15"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* License Utilization Forecast */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">License Demand Forecasting</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {licenseData.capacity_forecasting.slice(0, 4).map((forecast, index) => (
              <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">{forecast.month} 2024</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Projected Need:</span>
                    <span className="font-medium text-blue-900">{Math.round(forecast.demand * 0.04)} licenses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Confidence:</span>
                    <span className={`font-medium ${forecast.confidence > 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {forecast.confidence}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Revenue:</span>
                    <span className="font-medium text-blue-900">${(forecast.revenue * 0.21).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-blue-700" />
              <span className="font-medium text-blue-900">Capacity Planning Recommendation</span>
            </div>
            <p className="text-sm text-blue-800">
              Based on your 91% utilization rate and growing client demand, we recommend requesting 10 additional 
              licenses from your MSP by March 2024 to avoid capacity constraints.
            </p>
          </div>
        </div>

        {/* Client License Distribution */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">SMB Client License Allocation</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Allocate License</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-green-900">Global Dynamics</h4>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">High Value</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Allocated:</span>
                  <span className="font-medium text-green-900">8 licenses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Utilization:</span>
                  <span className="font-medium text-green-900">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Monthly Value:</span>
                  <span className="font-medium text-green-900">$520</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Contract:</span>
                  <span className="font-medium text-green-900">Jun 2024</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-900">Omega Corp</h4>
                <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">Growing</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Allocated:</span>
                  <span className="font-medium text-blue-900">6 licenses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Utilization:</span>
                  <span className="font-medium text-blue-900">83%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Monthly Value:</span>
                  <span className="font-medium text-blue-900">$390</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Contract:</span>
                  <span className="font-medium text-blue-900">Jul 2024</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-yellow-900">Sigma Systems</h4>
                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">Needs Support</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-700">Allocated:</span>
                  <span className="font-medium text-yellow-900">4 licenses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Utilization:</span>
                  <span className="font-medium text-yellow-900">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Monthly Value:</span>
                  <span className="font-medium text-yellow-900">$260</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-700">Contract:</span>
                  <span className="font-medium text-yellow-900">Aug 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Optimization */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Revenue Optimization Opportunities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="p-2 bg-green-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-900 mb-1">High-Value Client Expansion</h4>
                <p className="text-sm text-green-800 mb-2">Global Dynamics is ready for additional agent licenses</p>
                <div className="text-sm text-green-700">
                  <strong>Opportunity:</strong> +$200/month revenue with 2 additional licenses
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="p-2 bg-blue-200 rounded-lg">
                <Users className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-1">Portfolio Capacity Expansion</h4>
                <p className="text-sm text-blue-800 mb-2">Request additional license allocation from MSP</p>
                <div className="text-sm text-blue-700">
                  <strong>Opportunity:</strong> Support 5 new SMB prospects in pipeline
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderSMBView = () => {
    return (
      <>
        {/* SMB License Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardMetric
            title="Total Licenses"
            value="8"
            change="+2"
            icon={CreditCard}
            trend="up"
          />
          <CardMetric
            title="Active Users"
            value="6/8"
            change="+1"
            icon={Users}
            trend="up"
          />
          <CardMetric
            title="Utilization Rate"
            value="75%"
            change="+12%"
            icon={TrendingUp}
            trend="up"
          />
          <CardMetric
            title="Monthly Cost"
            value="$520"
            icon={DollarSign}
          />
        </div>

        {/* ROI & Value Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardMetric
            title="ROI per License"
            value="$420"
            change="+18%"
            icon={Target}
            trend="up"
          />
          <CardMetric
            title="Cost per User"
            value="$21.67"
            change="-8%"
            icon={Zap}
            trend="up"
          />
          <CardMetric
            title="Efficiency Score"
            value="87%"
            change="+15%"
            icon={Activity}
            trend="up"
          />
        </div>

        {/* Department License Allocation */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">Department License Allocation</h3>
            <div className="flex space-x-2">
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Quarter</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-200 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Marketing Department</h4>
                    <p className="text-sm text-green-700">8 users, 3 licenses</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-900">100%</div>
                  <div className="text-sm text-green-700">Utilization</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-700">Primary Agents:</span>
                  <p className="font-medium text-green-900">Marketing Agent, Analytics Agent</p>
                </div>
                <div>
                  <span className="text-green-700">Monthly Value:</span>
                  <p className="font-medium text-green-900">$1,800</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-200 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Finance Department</h4>
                    <p className="text-sm text-blue-700">6 users, 2 licenses</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-900">100%</div>
                  <div className="text-sm text-blue-700">Utilization</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Primary Agents:</span>
                  <p className="font-medium text-blue-900">Finance Agent</p>
                </div>
                <div>
                  <span className="text-blue-700">Monthly Value:</span>
                  <p className="font-medium text-blue-900">$1,400</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-200 rounded-lg">
                    <Settings className="w-5 h-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-900">Operations Department</h4>
                    <p className="text-sm text-yellow-700">5 users, 2 licenses</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-900">50%</div>
                  <div className="text-sm text-yellow-700">Utilization</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-yellow-700">Primary Agents:</span>
                  <p className="font-medium text-yellow-900">Operations Agent</p>
                </div>
                <div>
                  <span className="text-yellow-700">Monthly Value:</span>
                  <p className="font-medium text-yellow-900">$600</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Admin</h4>
                    <p className="text-sm text-gray-700">Executive level, 1 license</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">0%</div>
                  <div className="text-sm text-gray-700">Utilization</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-700">Primary Agents:</span>
                  <p className="font-medium text-gray-900">Support Agent</p>
                </div>
                <div>
                  <span className="text-gray-700">Monthly Value:</span>
                  <p className="font-medium text-gray-900">$0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* License Optimization Recommendations */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">License Optimization Opportunities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="p-2 bg-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-red-900 mb-1">Underutilized Operations License</h4>
                <p className="text-sm text-red-800 mb-2">Operations team using only 1 of 2 allocated licenses (50% utilization)</p>
                <div className="text-sm text-red-700">
                  <strong>Recommendation:</strong> Train 2 more operations users to reach +$800/month value
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="p-2 bg-orange-200 rounded-lg">
                <Clock className="w-5 h-5 text-orange-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-orange-900 mb-1">Unused Admin License</h4>
                <p className="text-sm text-orange-800 mb-2">Admin license allocated but never used (0% utilization)</p>
                <div className="text-sm text-orange-700">
                  <strong>Recommendation:</strong> Deploy Support Agent for customer service (+$1,200/month potential)
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="p-2 bg-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-900 mb-1">Expansion Opportunity</h4>
                <p className="text-sm text-green-800 mb-2">Marketing and Finance teams at 100% utilization - ready for growth</p>
                <div className="text-sm text-green-700">
                  <strong>Recommendation:</strong> Request 2 additional licenses to support team expansion
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Renewal Analysis */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">License Renewal Analysis</h3>
          <div className="p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold">Contract Renewal Due</h4>
                <p className="text-green-100">June 20, 2024</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-green-100">Renewal Probability</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-green-100 mb-1">Annual Value:</p>
                <p className="font-bold">$7,440</p>
              </div>
              <div>
                <p className="text-green-100 mb-1">Satisfaction Score:</p>
                <p className="font-bold">4.8/5.0</p>
              </div>
              <div>
                <p className="text-green-100 mb-1">Usage Trend:</p>
                <p className="font-bold">Growing (+15%)</p>
              </div>
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

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
        
        {perspective === 'msp' && (
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Purchase Licenses</span>
          </button>
        )}
        
        {perspective === 'si' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Request Licenses</span>
          </button>
        )}
        
        {perspective === 'smb' && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Optimize Usage</span>
          </button>
        )}
      </div>

      {/* Render perspective-specific content */}
      {perspective === 'msp' && renderMSPView()}
      {perspective === 'si' && renderSIView()}
      {perspective === 'smb' && renderSMBView()}
    </div>
  );
};

export default Licenses;