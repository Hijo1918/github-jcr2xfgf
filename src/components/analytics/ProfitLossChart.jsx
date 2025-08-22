import React from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface ProfitLossData {
  date: string;
  cumulative: number;
  daily: number;
};

const ProfitLossChart: React.FC = () => {
  const data: ProfitLossData[] = [
    { date: '2024-01-01', cumulative: 0, daily: 0 },
    { date: '2024-01-02', cumulative: 150, daily: 150 },
    { date: '2024-01-03', cumulative: 280, daily: 130 },
    { date: '2024-01-04', cumulative: 220, daily: -60 },
    { date: '2024-01-05', cumulative: 380, daily: 160 },
    { date: '2024-01-06', cumulative: 450, daily: 70 },
    { date: '2024-01-07', cumulative: 520, daily: 70 },
    { date: '2024-01-08', cumulative: 680, daily: 160 },
    { date: '2024-01-09', cumulative: 620, daily: -60 },
    { date: '2024-01-10', cumulative: 780, daily: 160 },
  ];

  const labels = data.map((entry) =>
    new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );
  const cumulativeData = data.map((entry) => entry.cumulative);
  const dailyData = data.map((entry) => entry.daily);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Cumulative P&L',
        data: cumulativeData,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#3b82f6',
        tension: 0.4,
      },
      {
        label: 'Daily P&L',
        data: dailyData,
        borderColor: '#22c55e',
        backgroundColor: '#22c55e',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#22c55e',
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
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
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return new Date(data[index].date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            });
          },
          label: (context) => `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="card bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Profit & Loss Chart</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Cumulative P&L</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Daily P&L</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProfitLossChart;
