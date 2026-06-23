import React from 'react';
import { Trophy, Activity, CheckCircle, PieChart, Layers, ArrowUpRight } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function KeyFindings() {
  const stats = electoralService.getEstadisticas();

  if (!stats) return null;

  const validos = stats.cepeda + stats.abelardo + stats.blancos;
  const ganoCepeda = stats.cepeda > stats.abelardo;
  const ganador = ganoCepeda ? 'Iván Cepeda' : 'Abelardo de la E.';
  const colorGanador = ganoCepeda ? 'text-red-600' : 'text-blue-600';
  const bgGanador = ganoCepeda ? 'bg-red-50' : 'bg-blue-50';
  
  const votosGanador = ganoCepeda ? stats.cepeda : stats.abelardo;
  const pctGanador = ((votosGanador / validos) * 100).toFixed(1);
  const diferencia = Math.abs(stats.cepeda - stats.abelardo);

  const KPI = ({ title, value, subtitle, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg ${bgClass} ${colorClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <h4 className={`text-2xl font-black mb-1 ${colorClass}`}>{value}</h4>
        {subtitle && <p className="text-sm font-medium text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Activity size={20} className="text-indigo-500" />
        Indicadores Estratégicos Globales
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPI 
          title="Candidato Ganador"
          value={ganador}
          icon={Trophy}
          colorClass={colorGanador}
          bgClass={bgGanador}
        />
        <KPI 
          title="Diferencia"
          value={new Intl.NumberFormat('es-CO').format(diferencia)}
          subtitle="votos de ventaja"
          icon={ArrowUpRight}
          colorClass="text-indigo-600"
          bgClass="bg-indigo-50"
        />
        <KPI 
          title="Porcentaje"
          value={`${pctGanador}%`}
          subtitle="de los votos válidos"
          icon={PieChart}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
        />
        <KPI 
          title="Votos Válidos"
          value={new Intl.NumberFormat('es-CO').format(validos)}
          subtitle="sufragios efectivos"
          icon={CheckCircle}
          colorClass="text-gray-700"
          bgClass="bg-gray-100"
        />
        <KPI 
          title="Participación"
          value={`${stats.participacion}%`}
          subtitle="del censo electoral"
          icon={Activity}
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
        />
        <KPI 
          title="Mesas Escrutadas"
          value={stats.totalMesas}
          subtitle="el 100% informadas"
          icon={Layers}
          colorClass="text-cyan-600"
          bgClass="bg-cyan-50"
        />
      </div>
    </div>
  );
}
