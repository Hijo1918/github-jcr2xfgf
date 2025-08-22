import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const PerformanceMetrics = () => {
  const data = [
    { day: 'Mon', profit: 120, trades: 8 },
    { day: 'Tue', profit: 85, trades: 6 },
    { day: 'Wed', profit: 200, trades: 12 },
    { day: 'Thu', profit: -45, trades: 4 },
    { day: 'Fri', profit: 180, trades: 10 },
    { day: 'Sat', profit: 95, trades: 7 },
    { day: 'Sun', profit: 145, trades: 9 },
  ];

  const metrics = [
    { label: 'Total Trades', value: '156', change: '+12' },
    { label: 'Win Rate', value: '73.2%', change: '+2.1%' },
    { label: 'Avg Profit', value: '$45.80', change: '+$5.20' },
    { label: 'Max Drawdown', value: '8.5%', change: '-1.2%' },
  ];

  const labels = data.map((entry) => entry.day);
  const profitData = data.map((entry) => entry.profit);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Profit',
        data: profitData,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
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

  return (
    <div className="card bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">{metric.label}</div>
            <div className="text-lg font-bold text-gray-900">{metric.value}</div>
            <div
              className={`text-xs ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {metric.change} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="h-48">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PerformanceMetrics;
