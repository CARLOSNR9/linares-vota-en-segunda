import React from 'react';
import { X, Trophy } from 'lucide-react';
import MesaChart from './MesaChart';

export default function MesaDetails({ mesa, onClose }) {
  if (!mesa) return null;

  const ganoCepeda = mesa.cepeda > mesa.abelardo;
  const empate = mesa.cepeda === mesa.abelardo;
  const diferencia = Math.abs(mesa.cepeda - mesa.abelardo);

  const pctCepeda = ((mesa.cepeda / mesa.total) * 100).toFixed(1);
  const pctAbelardo = ((mesa.abelardo / mesa.total) * 100).toFixed(1);

  const badgeColor = empate ? 'bg-gray-100 text-gray-800' : (ganoCepeda ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800');
  const winnerName = empate ? 'Empate' : (ganoCepeda ? 'Iván Cepeda' : 'Abelardo');

  const StatRow = ({ label, value, pct, isWinner }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className={`text-sm ${isWinner ? 'font-bold text-gray-800' : 'text-gray-600'}`}>{label}</span>
      <div className="text-right">
        <span className={`text-sm mr-3 ${isWinner ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
          {new Intl.NumberFormat('es-CO').format(value)}
        </span>
        <span className={`text-xs w-10 inline-block text-right ${isWinner ? 'font-bold text-gray-800' : 'text-gray-400'}`}>
          {pct}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden relative animate-in zoom-in-95 duration-200">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors z-10"
      >
        <X size={18} />
      </button>

      <div className="p-6 pb-0">
        <h3 className="text-xl font-bold text-gray-800 mb-1">Mesa {mesa.mesa}</h3>
        <p className="text-gray-500 text-sm mb-4">{mesa.puesto}</p>

        <div className="flex items-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeColor}`}>
            <Trophy size={14} />
            Ganador: {winnerName}
          </span>
          {!empate && (
            <span className="text-xs font-medium text-gray-500">
              +{new Intl.NumberFormat('es-CO').format(diferencia)} votos
            </span>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 flex flex-col lg:flex-row gap-6 items-center border-t border-gray-100 mt-4 bg-gray-50/50">
        <div className="flex-1 w-full mt-4">
          <MesaChart mesa={mesa} />
        </div>
        
        <div className="flex-1 w-full bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalle Escrutinio</h4>
          
          <StatRow label="Iván Cepeda" value={mesa.cepeda} pct={pctCepeda} isWinner={ganoCepeda && !empate} />
          <StatRow label="Abelardo de la Espriella" value={mesa.abelardo} pct={pctAbelardo} isWinner={!ganoCepeda && !empate} />
          <StatRow label="Votos en Blanco" value={mesa.blanco} pct={((mesa.blanco / mesa.total) * 100).toFixed(1)} />
          <StatRow label="Votos Nulos" value={mesa.nulos} pct={((mesa.nulos / mesa.total) * 100).toFixed(1)} />
          <StatRow label="No Marcados" value={mesa.noMarcados} pct={((mesa.noMarcados / mesa.total) * 100).toFixed(1)} />
          
          <div className="flex justify-between items-center py-3 mt-2 border-t-2 border-gray-200">
            <span className="text-sm font-bold text-gray-800">Total Votos</span>
            <span className="text-sm font-bold text-gray-800">{new Intl.NumberFormat('es-CO').format(mesa.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
