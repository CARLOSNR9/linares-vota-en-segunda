import React from 'react';
import { Trophy, Layers } from 'lucide-react';
import PuestoChart from './PuestoChart';

export default function PuestoCard({ puesto }) {
  if (!puesto) return null;

  const totalValidos = puesto.cepeda + puesto.abelardo + puesto.blancos;
  const totalGeneral = puesto.cepeda + puesto.abelardo + puesto.blancos + puesto.nulos + puesto.noMarcados;

  const pctCepeda = ((puesto.cepeda / totalGeneral) * 100).toFixed(1);
  const pctAbelardo = ((puesto.abelardo / totalGeneral) * 100).toFixed(1);
  
  const diferencia = Math.abs(puesto.cepeda - puesto.abelardo);

  const ganoCepeda = puesto.cepeda > puesto.abelardo;
  const empate = puesto.cepeda === puesto.abelardo;

  const borderColor = empate ? 'border-gray-200' : (ganoCepeda ? 'border-red-400' : 'border-blue-400');
  const badgeColor = empate ? 'bg-gray-100 text-gray-800' : (ganoCepeda ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800');
  const winnerName = empate ? 'Empate' : (ganoCepeda ? 'Iván Cepeda' : 'Abelardo');

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 ${borderColor} overflow-hidden transition-transform hover:-translate-y-1 duration-300`}>
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-800 text-lg leading-tight">{puesto.nombre}</h4>
          <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Layers size={14} /> {puesto.mesas} mesas instaladas
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColor}`}>
          <Trophy size={12} />
          {winnerName}
        </span>
      </div>

      <div className="p-4">
        {/* Gráfico y Estadísticas principales */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">I. Cepeda</p>
              <div className="flex items-end justify-between">
                <p className="text-lg font-bold text-red-600 leading-none">{new Intl.NumberFormat('es-CO').format(puesto.cepeda)}</p>
                <span className="text-sm font-medium text-red-500">{pctCepeda}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Abelardo</p>
              <div className="flex items-end justify-between">
                <p className="text-lg font-bold text-blue-600 leading-none">{new Intl.NumberFormat('es-CO').format(puesto.abelardo)}</p>
                <span className="text-sm font-medium text-blue-500">{pctAbelardo}%</span>
              </div>
            </div>
          </div>
          <div className="w-24 shrink-0 flex items-center">
            <PuestoChart puesto={puesto} />
          </div>
        </div>

        {/* Footer info */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Diferencia</p>
            <p className="font-semibold text-gray-800 text-sm">{new Intl.NumberFormat('es-CO').format(diferencia)} votos</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Votos Válidos</p>
            <p className="font-semibold text-gray-800 text-sm">{new Intl.NumberFormat('es-CO').format(totalValidos)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
