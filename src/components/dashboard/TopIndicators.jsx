import React from 'react';
import { Trophy, Users, UserPlus, UserMinus } from 'lucide-react';

export default function TopIndicators({ puestos }) {
  if (!puestos || puestos.length === 0) return null;

  // Encontrar máximos y mínimos
  const mayorApoyoCepeda = [...puestos].sort((a, b) => b.votos_cepeda - a.votos_cepeda)[0];
  const mayorApoyoAbelardo = [...puestos].sort((a, b) => b.votos_abelardo - a.votos_abelardo)[0];
  const mayorAfluencia = [...puestos].sort((a, b) => b.total_votantes - a.total_votantes)[0];
  const menorAfluencia = [...puestos].sort((a, b) => a.total_votantes - b.total_votantes)[0];

  const IndicatorItem = ({ title, puesto, valor, subtitle, icon: Icon, colorClass }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
      <div className={`p-3 rounded-full bg-white shadow-sm ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{title}</p>
        <p className="text-sm font-bold text-gray-800">{puesto}</p>
        <p className="text-sm text-gray-600">{valor} <span className="text-xs text-gray-400">{subtitle}</span></p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Indicadores Destacados por Puesto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <IndicatorItem 
          title="Mayor Apoyo I. Cepeda"
          puesto={mayorApoyoCepeda.nombre}
          valor={new Intl.NumberFormat('es-CO').format(mayorApoyoCepeda.votos_cepeda)}
          subtitle="votos"
          icon={Trophy}
          colorClass="text-red-500"
        />

        <IndicatorItem 
          title="Mayor Apoyo A. Espriella"
          puesto={mayorApoyoAbelardo.nombre}
          valor={new Intl.NumberFormat('es-CO').format(mayorApoyoAbelardo.votos_abelardo)}
          subtitle="votos"
          icon={Trophy}
          colorClass="text-blue-500"
        />

        <IndicatorItem 
          title="Mayor Afluencia"
          puesto={mayorAfluencia.nombre}
          valor={new Intl.NumberFormat('es-CO').format(mayorAfluencia.total_votantes)}
          subtitle="votantes"
          icon={UserPlus}
          colorClass="text-green-500"
        />

        <IndicatorItem 
          title="Menor Afluencia"
          puesto={menorAfluencia.nombre}
          valor={new Intl.NumberFormat('es-CO').format(menorAfluencia.total_votantes)}
          subtitle="votantes"
          icon={UserMinus}
          colorClass="text-orange-500"
        />

      </div>
    </div>
  );
}
