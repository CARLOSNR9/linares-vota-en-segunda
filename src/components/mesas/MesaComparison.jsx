import React, { useState } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { electoralService } from '../../services/electoralService';
import { Bar } from 'react-chartjs-2';

export default function MesaComparison({ mesaA, onClose }) {
  const todasLasMesas = electoralService.getAllMesas();
  const [mesaBId, setMesaBId] = useState('');

  const mesaB = todasLasMesas.find(m => m.id === mesaBId);

  const formatPct = (val, total) => ((val / total) * 100).toFixed(1) + '%';

  const chartData = mesaB ? {
    labels: ['Iván Cepeda', 'Abelardo', 'Blancos', 'Nulos'],
    datasets: [
      {
        label: `${mesaA.puesto} - M${mesaA.mesa}`,
        data: [mesaA.cepeda, mesaA.abelardo, mesaA.blanco, mesaA.nulos],
        backgroundColor: '#ef4444', // Red-500
        borderRadius: 4,
      },
      {
        label: `${mesaB.puesto} - M${mesaB.mesa}`,
        data: [mesaB.cepeda, mesaB.abelardo, mesaB.blanco, mesaB.nulos],
        backgroundColor: '#3b82f6', // Blue-500
        borderRadius: 4,
      }
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const CompareRow = ({ label, valA, valB, isPct = false, totalA, totalB }) => {
    const displayA = isPct ? formatPct(valA, totalA) : valA;
    const displayB = isPct ? formatPct(valB, totalB) : valB;
    
    // Calcula quién gana
    let colorA = 'text-gray-800';
    let colorB = 'text-gray-800';
    let fontWeight = 'font-medium';

    if (!isPct) {
      if (valA > valB) { colorA = 'text-green-600 font-bold'; colorB = 'text-gray-400'; }
      if (valB > valA) { colorB = 'text-green-600 font-bold'; colorA = 'text-gray-400'; }
    }

    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 items-center text-sm">
        <div className={`text-right ${colorA} ${fontWeight}`}>{displayA}</div>
        <div className="text-center text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</div>
        <div className={`text-left ${colorB} ${fontWeight}`}>{displayB}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors z-10"
      >
        <X size={18} />
      </button>

      <div className="p-6 pb-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ArrowRightLeft size={20} className="text-indigo-500" />
          Comparador de Mesas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-red-100 shadow-sm">
            <p className="text-xs text-red-500 font-bold uppercase mb-1">Mesa Base (A)</p>
            <p className="font-bold text-gray-800">{mesaA.puesto}</p>
            <p className="text-sm text-gray-600">Mesa {mesaA.mesa}</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm flex flex-col justify-center">
            <p className="text-xs text-blue-500 font-bold uppercase mb-1">Contra Mesa (B)</p>
            <select
              className="block w-full py-1.5 px-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500"
              value={mesaBId}
              onChange={(e) => setMesaBId(e.target.value)}
            >
              <option value="">-- Seleccionar mesa a comparar --</option>
              {todasLasMesas.filter(m => m.id !== mesaA.id).map(m => (
                <option key={m.id} value={m.id}>{m.puesto} - Mesa {m.mesa}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {mesaB ? (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            <div className="bg-gray-50 p-4 rounded-xl">
              <CompareRow label="Total Votos" valA={mesaA.total} valB={mesaB.total} />
              <CompareRow label="Iván Cepeda" valA={mesaA.cepeda} valB={mesaB.cepeda} />
              <CompareRow label="% Cepeda" valA={mesaA.cepeda} valB={mesaB.cepeda} isPct totalA={mesaA.total} totalB={mesaB.total} />
              <CompareRow label="Abelardo" valA={mesaA.abelardo} valB={mesaB.abelardo} />
              <CompareRow label="% Abelardo" valA={mesaA.abelardo} valB={mesaB.abelardo} isPct totalA={mesaA.total} totalB={mesaB.total} />
              <CompareRow label="Votos Blanco" valA={mesaA.blanco} valB={mesaB.blanco} />
              <CompareRow label="Votos Nulos" valA={mesaA.nulos} valB={mesaB.nulos} />
            </div>
          </div>
          
          <div className="w-full h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-gray-400">
          Selecciona una mesa en el recuadro superior para iniciar la comparación cara a cara.
        </div>
      )}
    </div>
  );
}
