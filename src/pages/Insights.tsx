import React, { useState } from 'react';
import { TrendingUp, DollarSign, Clock, Target, Award, Zap, Users, Building, Bot, Cpu, Activity, AlertCircle, CheckCircle, ArrowUp, ArrowDown, Minus, Brain, Sparkles, Rocket, Eye, Filter, Calendar, Download, Share, AlertTriangle } from 'lucide-react';
import CardMetric from '../components/CardMetric';
import Chart from '../components/Chart';

// Import rich data
import tokenUsage from '../data/token_usage.json';
import agentPerformance from '../data/agent_performance.json';
import licenseAnalytics from '../data/license_analytics.json';

interface InsightsProps {
  perspective: string;
}

const Insights: React.FC<InsightsProps> = ({ perspective }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showPredictions, setShowPredictions] = useState(true);

  const getPerspectiveContext = () => {
    const getContextColors = (perspective: string) => {
      switch (perspective) {
        case 'msp':
          return {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-900',
            accent: 'text-purple-700',
            badge: 'bg-purple-100 text-purple-800',
            gradient: 'from-purple-600 to-indigo-600'
          };
        case 'si':
          return {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-900',
            accent: 'text-blue-700',
            badge: 'bg-blue-100 text-blue-800',
            gradient: 'from-blue-600 to-cyan-600'
          };
        case 'smb':
          return {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-900',
            accent: 'text-green-700',
            badge: 'bg-green-100 text-green-800',
            gradient: 'from-green-600 to-emerald-600'
          };
        default:
          return {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-900',
            accent: 'text-gray-700',
            badge: 'bg-gray-100 text-gray-800',
            gradient: 'from-gray-600 to-slate-600'
          };
      }
    };

    const colors = getContextColors(perspective);

    switch (perspective) {
      case 'msp':
        return {
          title: 'MSP AI Intelligence Center - Predictive Ecosystem Analytics',
          description: 'Advanced AI-powered insights across 47 partners with predictive modeling and strategic recommendations',
          badge: 'MSP Intelligence Hub',
          colors,
          icon: Brain
        };
      case 'si':
        return {
          title: 'SI Portfolio Intelligence - CloudPro Advanced Analytics',
          description: 'Machine learning insights for your 35 SMB clients with predictive growth modeling and optimization',
          badge: 'SI Intelligence',
          colors,
          icon: Sparkles
        };
      case 'smb':
        return {
          title: 'SMB AI Productivity Intelligence - Global Dynamics Optimization',
          description: 'AI-driven team performance insights with predictive productivity modeling for 24 users',
          badge: 'Team Intelligence',
          colors,
          icon: Rocket
        };
      default:
        return {
          title: 'AI Intelligence Center',
          description: 'Advanced analytics and predictive insights',
          badge: 'Intelligence Hub',
          colors: getContextColors('default'),
          icon: Brain
        };
    }
  };

  // AI-Powered Insights Header Component
  const AIInsightsHeader = ({ context }: { context: any }) => (
    <div className={`bg-gradient-to-br ${context.colors.gradient} rounded-2xl p-8 text-white relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24 animate-pulse delay-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              <context.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{context.title}</h1>
              <p className="text-lg opacity-90">{context.description}</p>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg p-1 backdrop-blur-sm">
            {[
              { id: '1m', label: '1M' },
              { id: '3m', label: '3M' },
              { id: '6m', label: '6M' },
              { id: '1y', label: '1Y' }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setSelectedTimeRange(range.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  selectedTimeRange === range.id 
                    ? 'bg-white text-gray-900 shadow-md' 
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time AI Status */}
        <div className="flex items-center space-x-6 text-white opacity-90">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">AI Models: Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span className="text-sm">Last Analysis: 23 seconds ago</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Prediction Accuracy: 94.2%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced AI Insights Dashboard
  const AIInsightsDashboard = ({ perspective }: { perspective: string }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* AI Predictions Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Predictive Analytics Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-blue-600" />
                AI Predictive Models
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPredictions(!showPredictions)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    showPredictions ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {showPredictions ? 'Hide Predictions' : 'Show Predictions'}
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Multi-metric Prediction Chart */}
            <div className="mb-6">
              <div className="flex space-x-2 mb-4">
                {[
                  { id: 'revenue', label: 'Revenue', color: 'bg-green-500' },
                  { id: 'tokens', label: 'Token Usage', color: 'bg-blue-500' },
                  { id: 'efficiency', label: 'Efficiency', color: 'bg-purple-500' }
                ].map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedMetric === metric.id 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                    <span>{metric.label}</span>
                  </button>
                ))}
              </div>
              
              <Chart
                data={[
                  { month: 'Jan', actual: 89400, predicted: 92100, confidence: 94 },
                  { month: 'Feb', actual: 94800, predicted: 98200, confidence: 92 },
                  { month: 'Mar', actual: null, predicted: 105800, confidence: 89 },
                  { month: 'Apr', actual: null, predicted: 114200, confidence: 87 },
                  { month: 'May', actual: null, predicted: 123900, confidence: 85 },
                  { month: 'Jun', actual: null, predicted: 135100, confidence: 83 }
                ]}
                type="line"
                xKey="month"
                yKey="predicted"
                title="Revenue Prediction with Confidence Intervals"
                color="#10b981"
              />
            </div>

            {/* AI Confidence Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-700 mb-1">94.2%</div>
                <div className="text-xs text-green-600">Prediction Accuracy</div>
                <div className="w-full bg-green-200 rounded-full h-1 mt-2">
                  <div className="bg-green-500 h-1 rounded-full" style={{width: '94%'}}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700 mb-1">127</div>
                <div className="text-xs text-blue-600">Data Points</div>
                <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                  <div className="bg-blue-500 h-1 rounded-full" style={{width: '89%'}}></div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-700 mb-1">23s</div>
                <div className="text-xs text-purple-600">Last Update</div>
                <div className="w-full bg-purple-200 rounded-full h-1 mt-2">
                  <div className="bg-purple-500 h-1 rounded-full animate-pulse" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Pattern Recognition */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-purple-600" />
              Pattern Recognition Engine
            </h3>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
              12 patterns detected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                pattern: 'Seasonal Revenue Spike',
                description: 'Q4 typically shows 35% higher revenue',
                confidence: 96,
                impact: 'High',
                color: 'from-green-400 to-emerald-500'
              },
              {
                pattern: 'Weekend Usage Drop',
                description: 'Token consumption drops 60% on weekends',
                confidence: 89,
                impact: 'Medium',
                color: 'from-blue-400 to-cyan-500'
              },
              {
                pattern: 'License Expansion Cycle',
                description: 'Partners request expansion every 4.2 months',
                confidence: 92,
                impact: 'High',
                color: 'from-purple-400 to-violet-500'
              },
              {
                pattern: 'Agent Adoption Curve',
                description: 'New agents reach 50% adoption in 6 weeks',
                confidence: 87,
                impact: 'Medium',
                color: 'from-orange-400 to-red-500'
              }
            ].map((pattern, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{pattern.pattern}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pattern.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pattern.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Confidence</span>
                  <span className="text-xs font-medium text-gray-700">{pattern.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`bg-gradient-to-r ${pattern.color} h-2 rounded-full transition-all duration-500`}
                    style={{width: `${pattern.confidence}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Insights Sidebar */}
      <div className="space-y-6">
        {/* Live AI Recommendations */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-bold">AI Recommendations</h3>
          </div>
          
          <div className="space-y-4">
            {[
              {
                priority: 'Critical',
                action: 'Expand CloudPro licenses by 40%',
                impact: '+$12.4K/month',
                confidence: 96
              },
              {
                priority: 'High',
                action: 'Deploy Support Agent to 12 underperforming SIs',
                impact: '+18% efficiency',
                confidence: 89
              },
              {
                priority: 'Medium',
                action: 'Optimize token allocation during peak hours',
                impact: '+$2.8K savings',
                confidence: 84
              }
            ].map((rec, index) => (
              <div key={index} className="p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    rec.priority === 'Critical' ? 'bg-red-500 text-white' :
                    rec.priority === 'High' ? 'bg-yellow-500 text-black' :
                    'bg-green-500 text-white'
                  }`}>
                    {rec.priority}
                  </span>
                  <span className="text-xs opacity-80">{rec.confidence}% confident</span>
                </div>
                <p className="text-sm font-medium mb-1">{rec.action}</p>
                <p className="text-xs opacity-90">{rec.impact}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-medium py-2 px-4 rounded-lg transition-all">
            View All Recommendations
          </button>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Anomaly Detection
            </h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-orange-600 font-medium">3 alerts</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              {
                type: 'Token Spike',
                description: 'NetSecure Ltd: 340% above normal',
                severity: 'high',
                time: '12 minutes ago'
              },
              {
                type: 'License Starvation',
                description: 'DataSync Partners: 95% utilization',
                severity: 'medium',
                time: '1 hour ago'
              },
              {
                type: 'Revenue Dip',
                description: 'TechFlow: -15% vs forecast',
                severity: 'low',
                time: '3 hours ago'
              }
            ].map((anomaly, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{anomaly.type}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    anomaly.severity === 'high' ? 'bg-red-500' :
                    anomaly.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{anomaly.description}</p>
                <p className="text-xs text-gray-500">{anomaly.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Performance Score */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Ecosystem Health Score
          </h3>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#healthGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${87 * 3.14159} ${(100 - 87) * 3.14159}`}
                strokeDashoffset="0"
              />
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">87</div>
                <div className="text-xs text-gray-500">Health Score</div>
              </div>
            </div>
          </div>
          
          {/* Health Breakdown */}
          <div className="space-y-2">
            {[
              { metric: 'Revenue Growth', score: 92, color: 'bg-green-500' },
              { metric: 'License Efficiency', score: 85, color: 'bg-blue-500' },
              { metric: 'Partner Satisfaction', score: 89, color: 'bg-purple-500' },
              { metric: 'Token Optimization', score: 82, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.metric}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{width: `${item.score}%`}}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-8">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMSPInsights = () => (
    <div className="space-y-8">
      {/* Enhanced MSP KPIs with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-6 -mt-6"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Cpu className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+15.2%</span>
            </div>
            <p className="text-3xl font-bold mb-1">340%</p>
            <p className="text-sm opacity-90">Ecosystem Token ROI</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-4 -mb-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+12.4%</span>
            </div>
            <p className="text-3xl font-bold mb-1">23.5%</p>
            <p className="text-sm opacity-90">Partner Revenue Growth</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -mr-8 -mt-8"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+8.7%</span>
            </div>
            <p className="text-3xl font-bold mb-1">92%</p>
            <p className="text-sm opacity-90">License Efficiency</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-6 -mb-6"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+2.3%</span>
            </div>
            <p className="text-3xl font-bold mb-1">95.0%</p>
            <p className="text-sm opacity-90">Agent Success Rate</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-rose-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-4 -mt-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+31.4%</span>
            </div>
            <p className="text-3xl font-bold mb-1">$91.5K</p>
            <p className="text-sm opacity-90">Monthly Revenue</p>
          </div>
        </div>
      </div>

      {/* Token Flow Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Top Token Consumers</h3>
          <div className="space-y-4">
            {tokenUsage.msp_ecosystem.top_consuming_sis.map((si, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-green-600' : 'bg-purple-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-black">{si.si_name}</div>
                    <div className="text-sm text-gray-600">{si.efficiency}% efficiency</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">{(si.tokens_consumed / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-green-600">${si.monthly_cost.toLocaleString()}</div>
                  <div className="text-xs text-blue-600">+{si.growth_rate}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Agent Performance Ranking</h3>
          <div className="space-y-4">
            {agentPerformance.ecosystem_overview.top_performing_agents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-green-600' : index === 1 ? 'bg-blue-600' : 'bg-orange-600'
                  }`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-black">{agent.name}</div>
                    <div className="text-sm text-gray-600">{agent.avg_response_time} avg response</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">{agent.calls.toLocaleString()}</div>
                  <div className="text-sm text-green-600">{agent.adoption_rate}% adoption</div>
                  <div className="text-xs text-blue-600">{agent.success_rate}% success</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI-Powered Strategic Intelligence */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            Strategic Intelligence Dashboard
          </h3>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Share className="w-4 h-4" />
              <span>Share Insights</span>
            </button>
          </div>
        </div>

        {/* Multi-Dimensional Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partner Intelligence */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-600" />
              Partner Intelligence
            </h4>
            
            {tokenUsage.msp_ecosystem.top_consuming_sis.slice(0, 3).map((si, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-bold text-blue-900 group-hover:text-blue-700 transition-colors">{si.si_name}</h5>
                  <div className="flex items-center space-x-2">
                    {si.growth_rate > 25 ? <ArrowUp className="w-4 h-4 text-green-600" /> : 
                     si.growth_rate > 15 ? <Minus className="w-4 h-4 text-yellow-600" /> : 
                     <ArrowDown className="w-4 h-4 text-red-600" />}
                    <span className="text-sm font-bold text-blue-800">+{si.growth_rate}%</span>
                  </div>
                </div>
                
                {/* Advanced Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2 bg-white bg-opacity-50 rounded-lg">
                    <p className="text-lg font-bold text-blue-900">{(si.tokens_consumed / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-blue-600">Tokens</p>
                  </div>
                  <div className="text-center p-2 bg-white bg-opacity-50 rounded-lg">
                    <p className="text-lg font-bold text-green-700">${si.monthly_cost.toLocaleString()}</p>
                    <p className="text-xs text-green-600">Revenue</p>
                  </div>
                </div>

                {/* Efficiency Visualization */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-blue-700">
                    <span>Efficiency Score</span>
                    <span className="font-bold">{si.efficiency}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${si.efficiency}%` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="mt-3 p-2 bg-white bg-opacity-60 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    AI suggests: {
                      si.growth_rate > 25 ? 'Expand capacity immediately' :
                      si.efficiency > 90 ? 'Optimize token allocation' :
                      'Monitor performance closely'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Growth Trajectory Analysis */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Growth Trajectory
            </h4>
            
            {/* Predictive Growth Chart */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <h5 className="font-bold text-green-900 mb-4">Q2 2024 Projections</h5>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg">
                  <div>
                    <p className="font-bold text-green-800">License Demand</p>
                    <p className="text-sm text-green-600">Current: 850 → Projected: 1,300</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-900">+53%</p>
                    <p className="text-xs text-green-600">Growth</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg">
                  <div>
                    <p className="font-bold text-green-800">Revenue Target</p>
                    <p className="text-sm text-green-600">Current: $89K → Projected: $118K</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-900">+32%</p>
                    <p className="text-xs text-green-600">Growth</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white bg-opacity-60 rounded-lg">
                  <div>
                    <p className="font-bold text-green-800">New Partners</p>
                    <p className="text-sm text-green-600">Target: 12-15 SIs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-900">94%</p>
                    <p className="text-xs text-green-600">Confidence</p>
                  </div>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="mt-4 p-3 bg-white bg-opacity-40 rounded-lg">
                <div className="flex justify-between text-xs text-green-700 mb-1">
                  <span>Prediction Confidence</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                    style={{ width: '92%' }}
                  />
                </div>
              </div>
            </div>

            {/* Agent Adoption Trends */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
              <h5 className="font-bold text-blue-900 mb-3">Agent Adoption Intelligence</h5>
              
              {agentPerformance.ecosystem_overview.top_performing_agents.slice(0, 3).map((agent, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-blue-200 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      'bg-gradient-to-br from-green-500 to-green-600'
                    }`}>
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">{agent.name}</p>
                      <p className="text-xs text-blue-600">{agent.adoption_rate}% adoption</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">${(agent.revenue_impact / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment & Opportunities */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Risk & Opportunities
            </h4>
            
            {/* Critical Alerts */}
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <h5 className="font-bold text-red-900">Critical Alert</h5>
                </div>
                <p className="text-sm text-red-800 mb-2">CloudPro Services capacity limit reached</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-600">Action required within 24h</span>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors">
                    Resolve Now
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h5 className="font-bold text-yellow-900">Growth Bottleneck</h5>
                </div>
                <p className="text-sm text-yellow-800 mb-2">DataSync Partners growth stagnating</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-yellow-600">Review within 7 days</span>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-xs hover:bg-yellow-700 transition-colors">
                    Investigate
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h5 className="font-bold text-green-900">Opportunity</h5>
                </div>
                <p className="text-sm text-green-800 mb-2">NetSecure accelerating (+31.4% growth)</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600">Capitalize on momentum</span>
                  <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-colors">
                    Expand
                  </button>
                </div>
              </div>
            </div>

            {/* Investment Recommendations */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl">
              <h5 className="font-bold text-purple-900 mb-3 flex items-center">
                <Rocket className="w-4 h-4 mr-2" />
                Investment Priorities
              </h5>
              
              <div className="space-y-2">
                {[
                  { priority: 'License Expansion', value: '$47.2K', roi: '340%' },
                  { priority: 'Agent Development', value: '$28.5K', roi: '280%' },
                  { priority: 'Partner Support', value: '$15.8K', roi: '225%' }
                ].map((investment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white bg-opacity-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">{investment.priority}</p>
                      <p className="text-xs text-purple-600">Investment: {investment.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{investment.roi}</p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSIInsights = () => (
    <div className="space-y-6">
      {/* SI Enhanced KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -mr-4 -mt-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Cpu className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+18.3%</span>
            </div>
            <p className="text-3xl font-bold mb-1">285%</p>
            <p className="text-sm opacity-90">Portfolio Token ROI</p>
          </div>
        </div>
        
        <CardMetric
          title="Client Retention Rate"
          value="94%"
          change="+5.8%"
          icon={Users}
          trend="up"
        />
        
        <CardMetric
          title="Avg Revenue per SMB"
          value={`$${Math.round(licenseAnalytics.si_license_management.monthly_revenue / licenseAnalytics.si_license_management.smb_allocations.length)}`}
          change="+22.1%"
          icon={DollarSign}
          trend="up"
        />
        
        <CardMetric
          title="Agent Success Rate"
          value="96%"
          change="+3.2%"
          icon={Activity}
          trend="up"
        />

        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-4 -mb-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+25.2%</span>
            </div>
            <p className="text-3xl font-bold mb-1">35</p>
            <p className="text-sm opacity-90">SMB Clients</p>
          </div>
        </div>
      </div>

      {/* SI Client Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Top Revenue Generating Clients</h3>
          <div className="space-y-4">
            {licenseAnalytics.si_license_management.smb_allocations.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    client.renewal_probability > 90 ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-black">{client.smb_name}</div>
                    <div className="text-sm text-gray-600">{client.utilization}% utilization</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">${client.monthly_payment}</div>
                  <div className="text-sm text-green-600">{client.renewal_probability}% renewal</div>
                  <div className="text-xs text-blue-600">{client.allocated} licenses</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">License Utilization Forecast</h3>
          <div className="space-y-4">
            {licenseAnalytics.si_license_management.usage_forecasting.map((forecast, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-black">{forecast.month} 2024</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    forecast.confidence > 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {forecast.confidence}% confidence
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Projected Usage</span>
                  <span className="text-lg font-bold text-blue-600">{forecast.projected_usage} licenses</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(forecast.projected_usage / 25) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIInsightsDashboard perspective="si" />
    </div>
  );

  const renderSMBInsights = () => (
    <div className="space-y-6">
      {/* SMB Enhanced KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -mr-4 -mt-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+7.3%</span>
            </div>
            <p className="text-3xl font-bold mb-1">32%</p>
            <p className="text-sm opacity-90">Team Productivity</p>
          </div>
        </div>
        
        <CardMetric
          title="Token ROI"
          value={`${Math.round((12600 / tokenUsage.smb_team.monthly_cost) * 100)}%`}
          change="+22.4%"
          icon={Cpu}
          trend="up"
        />
        
        <CardMetric
          title="Time Reduction"
          value="45%"
          change="+12.6%"
          icon={Clock}
          trend="up"
        />
        
        <CardMetric
          title="License Efficiency"
          value={`${licenseAnalytics.smb_license_usage.license_efficiency}%`}
          change="+4.8%"
          icon={Target}
          trend="up"
        />

        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-4 -mb-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-8 h-8 text-white opacity-90" />
              <span className="text-sm opacity-90 bg-white bg-opacity-20 px-2 py-1 rounded-full">+22.4%</span>
            </div>
            <p className="text-3xl font-bold mb-1">${(tokenUsage.smb_team.cost_savings / 1000).toFixed(1)}K</p>
            <p className="text-sm opacity-90">Monthly Savings</p>
          </div>
        </div>
      </div>

      {/* Department Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Department Token Usage</h3>
          <div className="space-y-4">
            {tokenUsage.smb_team.department_breakdown.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    dept.efficiency_score > 90 ? 'bg-green-600' : dept.efficiency_score > 80 ? 'bg-blue-600' : 'bg-orange-600'
                  }`}>
                    {dept.department === 'Marketing' && <TrendingUp className="w-5 h-5" />}
                    {dept.department === 'Finance' && <DollarSign className="w-5 h-5" />}
                    {dept.department === 'Operations' && <Zap className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-medium text-black">{dept.department}</div>
                    <div className="text-sm text-gray-600">{dept.users} users • {dept.top_agent}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">{(dept.tokens_consumed / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-blue-600">{dept.percentage}% of total</div>
                  <div className="text-xs text-green-600">{dept.efficiency_score}% efficient</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">License Optimization Opportunities</h3>
          <div className="space-y-4">
            {licenseAnalytics.smb_license_usage.usage_optimization.map((opp, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-orange-900">{opp.opportunity}</h5>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    {opp.current_usage}
                  </span>
                </div>
                <p className="text-sm text-orange-800 mb-3">{opp.recommendation}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{opp.potential_value}</span>
                  <button className="bg-white border border-orange-300 text-orange-700 px-3 py-1 rounded-lg text-sm hover:bg-orange-50 transition-colors">
                    Optimize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIInsightsDashboard perspective="smb" />
    </div>
  );

  const context = getPerspectiveContext();

  return (
    <div className="space-y-8">
      {/* Enhanced AI-Powered Header */}
      <AIInsightsHeader context={context} />

      {/* Main Content */}
      <div className="space-y-8">
        {/* Render perspective-specific insights */}
        {perspective === 'msp' && renderMSPInsights()}
        {perspective === 'si' && renderSIInsights()}
        {perspective === 'smb' && renderSMBInsights()}
      </div>
    </div>
  );
};

export default Insights;