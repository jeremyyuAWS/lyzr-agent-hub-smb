import React, { useState } from 'react';
import { CreditCard, TrendingUp, Users, Building, ArrowRight, Plus, Minus } from 'lucide-react';

interface LicenseAllocation {
  siId: string;
  siName: string;
  allocated: number;
  used: number;
  available: number;
  cost: number;
  markup: number;
  revenue: number;
}

interface LicenseManagerProps {
  mspPool: {
    total: number;
    allocated: number;
    available: number;
  };
  allocations: LicenseAllocation[];
  onAdjustLicense: (siId: string, change: number) => void;
}

const LicenseManager: React.FC<LicenseManagerProps> = ({ 
  mspPool, 
  allocations, 
  onAdjustLicense 
}) => {
  const [selectedSI, setSelectedSI] = useState<string | null>(null);

  const utilizationRate = (mspPool.allocated / mspPool.total) * 100;

  return (
    <div className="space-y-6">
      {/* MSP License Pool Overview */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">MSP License Pool</h3>
              <p className="text-sm text-gray-600">Global license allocation and utilization</p>
            </div>
          </div>
          <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Purchase More
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-black">{mspPool.total}</p>
            <p className="text-sm text-gray-600">Total Licenses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{mspPool.allocated}</p>
            <p className="text-sm text-gray-600">Allocated</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">{mspPool.available}</p>
            <p className="text-sm text-gray-600">Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-black">{utilizationRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">Utilization</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${
              utilizationRate > 90 ? 'bg-red-500' : 
              utilizationRate > 75 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${utilizationRate}%` }}
          />
        </div>
      </div>

      {/* License Flow Visualization */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">License Flow: MSP → SI → SMB</h3>
        
        <div className="space-y-4">
          {allocations.map((allocation) => {
            const siUtilization = (allocation.used / allocation.allocated) * 100;
            const isSelected = selectedSI === allocation.siId;
            
            return (
              <div 
                key={allocation.siId}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSI(isSelected ? null : allocation.siId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-black">{allocation.siName}</p>
                        <p className="text-sm text-gray-600">
                          {allocation.used}/{allocation.allocated} licenses used
                        </p>
                      </div>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            siUtilization > 90 ? 'bg-red-500' : 
                            siUtilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${siUtilization}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{siUtilization.toFixed(0)}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-black">${allocation.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{allocation.markup}% markup</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdjustLicense(allocation.siId, -1);
                        }}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        disabled={allocation.allocated <= allocation.used}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{allocation.available}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdjustLicense(allocation.siId, 1);
                        }}
                        className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        disabled={mspPool.available <= 0}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded SI Details */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-black">Revenue Growth</p>
                            <p className="text-lg font-bold text-green-600">+23.5%</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-black">Active Users</p>
                            <p className="text-lg font-bold text-blue-600">156</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium text-black">Cost Efficiency</p>
                            <p className="text-lg font-bold text-purple-600">92%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LicenseManager;