import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ParticipationChart({ resumen }) {
  if (!resumen) return null;

  const abstencion = resumen.potencial_votantes - resumen.total_votantes;

  const data = {
    labels: ['Participación', 'Abstención'],
    datasets: [
      {
        data: [resumen.total_votantes, abstencion],
        backgroundColor: [
          '#10b981', // Emerald-500
          '#f3f4f6', // Gray-100
        ],
        hoverBackgroundColor: [
          '#059669', // Emerald-600
          '#e5e7eb', // Gray-200
        ],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            family: "'Inter', 'Roboto', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += new Intl.NumberFormat('es-CO').format(context.raw) + ' votos';
            }
            return label;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  const participacionPorcentaje = ((resumen.total_votantes / resumen.potencial_votantes) * 100).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px] flex flex-col relative">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Participación Electoral</h3>
      <div className="flex-1 relative w-full flex items-center justify-center">
        <Doughnut data={data} options={options} />
        {/* Absolute center text for Doughnut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
          <span className="text-3xl font-bold text-gray-800">{participacionPorcentaje}%</span>
          <span className="text-xs text-gray-400">del potencial</span>
        </div>
      </div>
    </div>
  );
}
