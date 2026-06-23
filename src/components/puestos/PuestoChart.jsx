import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

export default function PuestoChart({ puesto }) {
  if (!puesto) return null;

  const otros = puesto.blancos + puesto.nulos + puesto.noMarcados;

  const data = {
    labels: ['Iván Cepeda', 'Abelardo', 'Otros'],
    datasets: [
      {
        data: [puesto.cepeda, puesto.abelardo, otros],
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
    cutout: '70%',
    plugins: {
      legend: {
        display: false // Lo ocultamos para mantenerlo limpio en la tarjeta
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 8,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = new Intl.NumberFormat('es-CO').format(context.raw);
            return `${label}: ${value}`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="relative w-full h-[120px] flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
