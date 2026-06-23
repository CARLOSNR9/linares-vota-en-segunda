import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Users, AlertCircle } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function MesaStatistics() {
  const masVotos = electoralService.obtenerMesaMayorVotacion();
  const menosVotos = electoralService.obtenerMesaMenorVotacion();
  const mayorApoyoCepeda = electoralService.obtenerMesaMayorApoyoCepeda();
  const mayorApoyoAbelardo = electoralService.obtenerMesaMayorApoyoAbelardo();
  const masNulos = electoralService.obtenerMesaMasVotosNulos();

  if (!masVotos) return null;

  const StatItem = ({ title, mesa, valor, subtitle, icon: Icon, colorClass }) => (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100">
      <div className={`p-2.5 rounded-full bg-gray-50 shadow-sm ${colorClass} shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5 truncate">{title}</p>
        <p className="text-sm font-bold text-gray-800 truncate">{mesa.puesto} (Mesa {mesa.mesa})</p>
        <p className="text-sm font-semibold text-gray-600 truncate">{valor} <span className="text-xs text-gray-400 font-normal">{subtitle}</span></p>
      </div>
    </div>
  );

  const formatPct = (votos, total) => {
    if (!total) return '0%';
    return ((votos / total) * 100).toFixed(1) + '%';
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <AlertCircle size={20} className="text-indigo-500" />
        Hallazgos Relevantes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <StatItem
          title="Mayor Apoyo Cepeda"
          mesa={mayorApoyoCepeda}
          valor={formatPct(mayorApoyoCepeda.cepeda, mayorApoyoCepeda.total)}
          subtitle={`(${mayorApoyoCepeda.cepeda} votos)`}
          icon={Trophy}
          colorClass="text-red-500"
        />
        <StatItem
          title="Mayor Apoyo Abelardo"
          mesa={mayorApoyoAbelardo}
          valor={formatPct(mayorApoyoAbelardo.abelardo, mayorApoyoAbelardo.total)}
          subtitle={`(${mayorApoyoAbelardo.abelardo} votos)`}
          icon={Trophy}
          colorClass="text-blue-500"
        />
        <StatItem
          title="Mesa con Más Votos"
          mesa={masVotos}
          valor={masVotos.total}
          subtitle="votos totales"
          icon={TrendingUp}
          colorClass="text-green-500"
        />
        <StatItem
          title="Mesa con Menos Votos"
          mesa={menosVotos}
          valor={menosVotos.total}
          subtitle="votos totales"
          icon={TrendingDown}
          colorClass="text-orange-500"
        />
        <StatItem
          title="Mayor Cantidad Nulos"
          mesa={masNulos}
          valor={masNulos.nulos}
          subtitle="votos nulos"
          icon={Users}
          colorClass="text-gray-600"
        />
      </div>
    </div>
  );
}
