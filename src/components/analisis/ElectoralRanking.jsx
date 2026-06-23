import React from 'react';
import { ListOrdered, Trophy, Medal } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function ElectoralRanking() {
  const puestos = electoralService.getAllPuestos();

  // Calcular porcentajes y diferencias
  const rankedPuestos = puestos.map(p => {
    const total = p.cepeda + p.abelardo + p.blancos + p.nulos + p.noMarcados;
    return {
      ...p,
      pctCepeda: total > 0 ? ((p.cepeda / total) * 100) : 0,
      diferencia: Math.abs(p.cepeda - p.abelardo),
      ganoCepeda: p.cepeda > p.abelardo
    };
  }).sort((a, b) => b.pctCepeda - a.pctCepeda);

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy size={18} className="text-yellow-500" />;
    if (index === 1) return <Medal size={18} className="text-gray-400" />;
    if (index === 2) return <Medal size={18} className="text-amber-700" />;
    return <span className="text-sm font-bold text-gray-400 w-[18px] text-center">{index + 1}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="bg-gray-50 border-b border-gray-100 p-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ListOrdered size={20} className="text-indigo-500" />
          Leaderboard Territorial (Fuerza I. Cepeda)
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 bg-white sticky top-0 z-10">
              <th className="py-3 px-4 w-16 text-center">Pos</th>
              <th className="py-3 px-4">Puesto</th>
              <th className="py-3 px-4 text-right">Apoyo (%)</th>
              <th className="py-3 px-4 text-right">Diferencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rankedPuestos.map((puesto, idx) => (
              <tr key={puesto.nombre} className="hover:bg-gray-50 transition-colors group">
                <td className="py-3 px-4 flex justify-center items-center h-full">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${idx < 3 ? 'bg-gray-100 shadow-inner' : 'bg-transparent'}`}>
                    {getRankIcon(idx)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="font-bold text-sm text-gray-800 group-hover:text-indigo-600 transition-colors">{puesto.nombre}</p>
                  <p className="text-xs text-gray-400">{puesto.totalVotantes} votantes</p>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className="h-full bg-red-500 rounded-full" 
                        style={{ width: `${puesto.pctCepeda}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-red-600 text-sm">{puesto.pctCepeda.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${puesto.ganoCepeda ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    +{new Intl.NumberFormat('es-CO').format(puesto.diferencia)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
