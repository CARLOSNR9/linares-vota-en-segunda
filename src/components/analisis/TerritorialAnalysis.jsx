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
import { BarChart3 } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TerritorialAnalysis() {
  const puestos = electoralService.getAllPuestos();

  // 1. Datos para Volumen de Votos (Ordenado por totalVotantes)
  const puestosPorVolumen = [...puestos].sort((a, b) => b.totalVotantes - a.totalVotantes);
  
  const volumenData = {
    labels: puestosPorVolumen.map(p => p.nombre),
    datasets: [
      {
        label: 'Votos Emitidos',
        data: puestosPorVolumen.map(p => p.totalVotantes),
        backgroundColor: '#6366f1', // Indigo-500
        borderRadius: 4,
      }
    ],
  };

  // 2. Datos para Diferencia de Votos (Ordenado por diferencia)
  const puestosPorDiferencia = [...puestos].map(p => ({
    ...p,
    diferencia: Math.abs(p.cepeda - p.abelardo),
    ganoCepeda: p.cepeda > p.abelardo
  })).sort((a, b) => b.diferencia - a.diferencia);

  const diferenciaData = {
    labels: puestosPorDiferencia.map(p => p.nombre),
    datasets: [
      {
        label: 'Diferencia (Votos)',
        data: puestosPorDiferencia.map(p => p.diferencia),
        backgroundColor: puestosPorDiferencia.map(p => p.ganoCepeda ? '#ef4444' : '#3b82f6'),
        borderRadius: 4,
      }
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${new Intl.NumberFormat('es-CO').format(context.raw)}`
        }
      }
    },
    scales: {
      x: {
        ticks: { font: { family: "'Inter', 'Roboto', sans-serif" } },
        grid: { color: '#f3f4f6' }
      },
      y: {
        ticks: { font: { family: "'Inter', 'Roboto', sans-serif", size: 11 } },
        grid: { display: false }
      }
    },
    animation: { duration: 800, easing: 'easeOutQuart' }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="bg-gray-50 border-b border-gray-100 p-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <BarChart3 size={20} className="text-indigo-500" />
          Análisis Comparativo Territorial
        </h3>
      </div>
      
      <div className="p-6 flex-1 flex flex-col gap-8 overflow-y-auto">
        <div>
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Volumen Total de Votación</h4>
          <div className="h-[250px] w-full">
            <Bar data={volumenData} options={chartOptions} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Brecha / Diferencia de Votos</h4>
          <div className="h-[250px] w-full">
            <Bar data={diferenciaData} options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                tooltip: {
                  ...chartOptions.plugins.tooltip,
                  callbacks: {
                    label: (context) => {
                      const puesto = puestosPorDiferencia[context.dataIndex];
                      const ganador = puesto.ganoCepeda ? 'Cepeda' : 'Abelardo';
                      return `Ventaja para ${ganador}: ${new Intl.NumberFormat('es-CO').format(context.raw)} votos`;
                    }
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
