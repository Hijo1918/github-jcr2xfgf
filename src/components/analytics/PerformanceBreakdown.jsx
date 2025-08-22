import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  Tooltip,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, PieController, ArcElement, Tooltip);

const PerformanceBreakdown = () => {
  const monthlyData = [
    { month: 'Jan', profit: 1250, trades: 45 },
    { month: 'Feb', profit: 890, trades: 38 },
    { month: 'Mar', profit: 1680, trades: 52 },
    { month: 'Apr', profit: 2100, trades: 61 },
    { month: 'May', profit: 1450, trades: 47 },
    { month: 'Jun', profit: 1920, trades: 55 },
  ];

  const assetData = [
    { name: 'BTC', value: 45, profit: 3200 },
    { name: 'ETH', value: 30, profit: 2100 },
    { name: 'ADA', value: 15, profit: 890 },
    { name: 'SOL', value: 10, profit: 650 },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

  // Monthly Performance Bar Chart
  const monthlyChartData = {
    labels: monthlyData.map((entry) => entry.month),
    datasets: [
      {
        label: 'Profit',
        data: monthlyData.map((entry) => entry.profit),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const monthlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6b7280', font: { size: 12 } },
      },
      y: {
        grid: { color: '#f0f0f0', borderDash: [3, 3] },
        ticks: {
          color: '#6b7280',
          font: { size: 12 },
          callback: (value) => `$${value}`,
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `Profit: $${context.parsed.y}`,
        },
      },
    },
  };

  // Asset Distribution Pie Chart
  const assetChartData = {
    labels: assetData.map((entry) => entry.name),
    datasets: [
      {
        data: assetData.map((entry) => entry.value),
        backgroundColor: COLORS,
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const assetChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const profit = assetData[index].profit;
            return `${context.label}: ${context.parsed}% ($${profit})`;
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
        <div className="h-64">
          <Bar data={monthlyChartData} options={monthlyChartOptions} />
        </div>
      </div>

      <div className="card bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Distribution</h3>
        <div className="h-64">
          <Pie data={assetChartData} options={assetChartOptions} />
        </div>
        <div className="mt-4 space-y-2">
          {assetData.map((asset, index) => (
            <div key={asset.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{asset.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{asset.value}%</div>
                <div className="text-xs text-gray-600">${asset.profit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceBreakdown;
