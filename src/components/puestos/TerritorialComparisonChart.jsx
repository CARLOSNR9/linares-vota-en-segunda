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
import { electoralService } from '../../services/electoralService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TerritorialComparisonChart() {
  const puestos = electoralService.getAllPuestos();

  // Ordenar puestos por mayor porcentaje de Cepeda
  const sortedPuestos = [...puestos].sort((a, b) => {
    const totalA = a.cepeda + a.abelardo + a.blancos + a.nulos + a.noMarcados;
    const totalB = b.cepeda + b.abelardo + b.blancos + b.nulos + b.noMarcados;
    const pctA = (a.cepeda / totalA) * 100;
    const pctB = (b.cepeda / totalB) * 100;
    return pctB - pctA;
  });

  const labels = sortedPuestos.map(p => p.nombre);
  
  const cepedaData = sortedPuestos.map(p => {
    const total = p.cepeda + p.abelardo + p.blancos + p.nulos + p.noMarcados;
    return ((p.cepeda / total) * 100).toFixed(1);
  });

  const abelardoData = sortedPuestos.map(p => {
    const total = p.cepeda + p.abelardo + p.blancos + p.nulos + p.noMarcados;
    return ((p.abelardo / total) * 100).toFixed(1);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Iván Cepeda (%)',
        data: cepedaData,
        backgroundColor: '#ef4444', // Red-500
        borderRadius: 4,
      },
      {
        label: 'Abelardo de la Espriella (%)',
        data: abelardoData,
        backgroundColor: '#3b82f6', // Blue-500
        borderRadius: 4,
      }
    ],
  };

  const options = {
    indexAxis: 'y', // Hace que las barras sean horizontales
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: "'Inter', 'Roboto', sans-serif" }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        max: 100,
        ticks: {
          callback: (value) => value + '%',
          font: { family: "'Inter', 'Roboto', sans-serif" }
        },
        grid: {
          color: '#f3f4f6'
        }
      },
      y: {
        stacked: false,
        ticks: {
          font: { family: "'Inter', 'Roboto', sans-serif", size: 11 }
        },
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px]">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Comparativa Territorial (%)</h3>
      <div className="h-[400px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
