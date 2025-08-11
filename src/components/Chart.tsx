import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ChartProps {
  data: any[];
  type: 'line' | 'bar';
  xKey: string;
  yKey: string;
  title?: string;
  color?: string;
}

const Chart: React.FC<ChartProps> = ({ data, type, xKey, yKey, title, color = '#6b7280' }) => {
  const ChartComponent = type === 'line' ? LineChart : BarChart;

  return (
    <div className="usage-chart bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      {title && <h3 className="text-lg font-semibold text-black mb-4">{title}</h3>}
      
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey={xKey} 
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          {type === 'line' ? (
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2 }}
            />
          ) : (
            <Bar 
              dataKey={yKey} 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;