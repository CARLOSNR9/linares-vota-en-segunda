import React from 'react';
import { electoralService } from '../../services/electoralService';

export default function TerritorialRanking() {
  const puestos = electoralService.getAllPuestos();

  // Mapear puestos a formato con porcentajes
  const puestosConPct = puestos.map(p => {
    const total = p.cepeda + p.abelardo + p.blancos + p.nulos + p.noMarcados;
    const pctCepeda = (p.cepeda / total) * 100;
    const diff = Math.abs(p.cepeda - p.abelardo);
    return {
      ...p,
      pctCepeda,
      diff
    };
  });

  // Ordenar de mayor a menor por pctCepeda
  const ranking = puestosConPct.sort((a, b) => b.pctCepeda - a.pctCepeda);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[500px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        Ranking Territorial (I. Cepeda)
      </h3>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-3">
          {ranking.map((puesto, index) => (
            <li key={puesto.nombre} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${index < 3 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{puesto.nombre}</p>
                  <p className="text-xs text-gray-500">Dif: {new Intl.NumberFormat('es-CO').format(puesto.diff)} votos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">{puesto.pctCepeda.toFixed(1)}%</p>
                <p className="text-xs text-gray-400">{new Intl.NumberFormat('es-CO').format(puesto.cepeda)} votos</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
