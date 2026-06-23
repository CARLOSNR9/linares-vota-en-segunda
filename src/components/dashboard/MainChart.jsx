import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { appConfig } from '../../config/appConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MainChart({ resumen }) {
  if (!resumen) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
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
        boxPadding: 4,
        usePointStyle: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Inter', 'Roboto', sans-serif"
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Inter', 'Roboto', sans-serif"
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  const data = {
    labels: ['Resultados Finales'],
    datasets: [
      {
        label: 'Iván Cepeda',
        data: [resumen.votos_cepeda],
        backgroundColor: '#ef4444', // Red-500
        borderRadius: 4,
      },
      {
        label: 'Abelardo de la Espriella',
        data: [resumen.votos_abelardo],
        backgroundColor: '#3b82f6', // Blue-500
        borderRadius: 4,
      },
      {
        label: 'Votos en Blanco',
        data: [resumen.votos_blanco],
        backgroundColor: '#9ca3af', // Gray-400
        borderRadius: 4,
      },
      {
        label: 'Votos Nulos',
        data: [resumen.votos_nulos],
        backgroundColor: '#4b5563', // Gray-600
        borderRadius: 4,
      }
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Comparativa de Votación</h3>
      <div className="h-[300px] w-full">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
