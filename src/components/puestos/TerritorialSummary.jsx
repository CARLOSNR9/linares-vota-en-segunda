import React from 'react';
import { Trophy, Users, Layers, TrendingDown } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function TerritorialSummary() {
  const mayorCepeda = electoralService.obtenerPuestoMasFavorableCepeda();
  const mayorAbelardo = electoralService.obtenerPuestoMasFavorableAbelardo();
  const masVotos = electoralService.obtenerPuestoMayorParticipacion();
  const menosVotos = electoralService.obtenerPuestoMenorParticipacion();
  const masMesas = electoralService.obtenerPuestoConMasMesas();

  if (!mayorCepeda) return null;

  const IndicatorItem = ({ title, puesto, valor, subtitle, icon: Icon, colorClass }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
      <div className={`p-3 rounded-full bg-gray-50 shadow-sm ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{title}</p>
        <p className="text-sm font-bold text-gray-800">{puesto}</p>
        <p className="text-sm text-gray-600 font-medium">{valor} <span className="text-xs text-gray-400 font-normal">{subtitle}</span></p>
      </div>
    </div>
  );

  const getPct = (candidato, puesto) => {
    const total = puesto.cepeda + puesto.abelardo + puesto.blancos + puesto.nulos + puesto.noMarcados;
    return ((puesto[candidato] / total) * 100).toFixed(1) + '%';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
      <IndicatorItem 
        title="Mayor Apoyo Cepeda"
        puesto={mayorCepeda.nombre}
        valor={getPct('cepeda', mayorCepeda)}
        subtitle="de los votos"
        icon={Trophy}
        colorClass="text-red-500"
      />
      <IndicatorItem 
        title="Mayor Apoyo Abelardo"
        puesto={mayorAbelardo.nombre}
        valor={getPct('abelardo', mayorAbelardo)}
        subtitle="de los votos"
        icon={Trophy}
        colorClass="text-blue-500"
      />
      <IndicatorItem 
        title="Puesto Más Votos"
        puesto={masVotos.nombre}
        valor={new Intl.NumberFormat('es-CO').format(masVotos.totalVotantes)}
        subtitle="votantes"
        icon={Users}
        colorClass="text-indigo-500"
      />
      <IndicatorItem 
        title="Puesto Menos Votos"
        puesto={menosVotos.nombre}
        valor={new Intl.NumberFormat('es-CO').format(menosVotos.totalVotantes)}
        subtitle="votantes"
        icon={TrendingDown}
        colorClass="text-orange-500"
      />
      <IndicatorItem 
        title="Puesto con Más Mesas"
        puesto={masMesas.nombre}
        valor={masMesas.mesas}
        subtitle="mesas"
        icon={Layers}
        colorClass="text-green-500"
      />
    </div>
  );
}
