import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MesaChart({ mesa }) {
  if (!mesa) return null;

  const otros = mesa.blanco + mesa.nulos + mesa.noMarcados;

  const data = {
    labels: ['Iván Cepeda', 'Abelardo', 'Otros (Blancos/Nulos)'],
    datasets: [
      {
        data: [mesa.cepeda, mesa.abelardo, otros],
        backgroundColor: [
          '#ef4444', // Red-500
          '#3b82f6', // Blue-500
          '#9ca3af', // Gray-400
        ],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { family: "'Inter', 'Roboto', sans-serif", size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = new Intl.NumberFormat('es-CO').format(context.raw);
            const percentage = ((context.raw / mesa.total) * 100).toFixed(1);
            return `${label}: ${value} votos (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="relative w-full h-[250px] flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
        <span className="text-2xl font-bold text-gray-800">{new Intl.NumberFormat('es-CO').format(mesa.total)}</span>
        <span className="text-xs text-gray-400">Total Votos</span>
      </div>
    </div>
  );
}
