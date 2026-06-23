import React from 'react';
import { Target, Users, XOctagon } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function TopMesas() {
  const topCepeda = electoralService.obtenerTopMesasCepeda(5);
  const topAbelardo = electoralService.obtenerTopMesasAbelardo(5);
  const topParticipacion = electoralService.obtenerTopMesasParticipacion(5);
  const topNulos = electoralService.obtenerTopMesasNulos(5);

  const TopList = ({ title, icon: Icon, data, valueKey, colorClass, bgClass, suffix = 'votos' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${bgClass} ${colorClass}`}>
          <Icon size={16} />
        </div>
        {title}
      </h4>
      <ul className="space-y-3">
        {data.map((mesa, index) => (
          <li key={mesa.id} className="flex justify-between items-center group">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? colorClass + ' ' + bgClass : 'text-gray-400 bg-gray-50'}`}>
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-none group-hover:text-indigo-600 transition-colors">
                  Mesa {mesa.mesa}
                </p>
                <p className="text-xs text-gray-400">{mesa.puesto}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${colorClass}`}>{new Intl.NumberFormat('es-CO').format(mesa[valueKey])}</p>
              <p className="text-[10px] text-gray-400 uppercase">{suffix}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Radiografía de Mesas (Top 5)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <TopList 
          title="Fuerza Cepeda" 
          icon={Target} 
          data={topCepeda} 
          valueKey="cepeda" 
          colorClass="text-red-600" 
          bgClass="bg-red-50" 
        />
        <TopList 
          title="Fuerza Abelardo" 
          icon={Target} 
          data={topAbelardo} 
          valueKey="abelardo" 
          colorClass="text-blue-600" 
          bgClass="bg-blue-50" 
        />
        <TopList 
          title="Mayor Participación" 
          icon={Users} 
          data={topParticipacion} 
          valueKey="total" 
          colorClass="text-emerald-600" 
          bgClass="bg-emerald-50" 
          suffix="sufragios"
        />
        <TopList 
          title="Votos Nulos" 
          icon={XOctagon} 
          data={topNulos} 
          valueKey="nulos" 
          colorClass="text-gray-600" 
          bgClass="bg-gray-100" 
          suffix="anulados"
        />
      </div>
    </div>
  );
}
