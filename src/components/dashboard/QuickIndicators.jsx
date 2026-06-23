import React from 'react';
import { Trophy, TrendingUp, CheckCircle, PieChart } from 'lucide-react';

export default function QuickIndicators({ resumen }) {
  if (!resumen) return null;

  const { 
    votos_cepeda, 
    votos_abelardo, 
    votos_validos, 
    total_votantes,
    potencial_votantes
  } = resumen;

  // Cálculos lógicos
  const ganador = votos_cepeda > votos_abelardo 
    ? { nombre: 'Iván Cepeda', votos: votos_cepeda, color: 'text-red-500' } 
    : { nombre: 'Abelardo de la Espriella', votos: votos_abelardo, color: 'text-blue-500' };
  
  const perdedor = votos_cepeda > votos_abelardo 
    ? { nombre: 'Abelardo de la Espriella', votos: votos_abelardo } 
    : { nombre: 'Iván Cepeda', votos: votos_cepeda };

  const diferencia = ganador.votos - perdedor.votos;
  
  // Asumiendo que potencial_votantes viene en los datos, si no, calculamos con una constante o no mostramos %
  // Si no existe potencial_votantes en el JSON, podemos calcular la participación si lo tenemos, si no, mostramos solo total_votantes
  const participacion = potencial_votantes 
    ? ((total_votantes / potencial_votantes) * 100).toFixed(1) + '%'
    : 'No disponible';

  const IndicatorItem = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
      <div className={`p-3 rounded-full bg-white shadow-sm ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{title}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight">{value}</p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Indicadores Rápidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <IndicatorItem 
          title="Candidato Ganador"
          value={ganador.nombre}
          icon={Trophy}
          colorClass={ganador.color}
        />

        <IndicatorItem 
          title="Diferencia de Votos"
          value={new Intl.NumberFormat('es-CO').format(diferencia)}
          subtitle="votos de ventaja"
          icon={TrendingUp}
          colorClass="text-green-500"
        />

        <IndicatorItem 
          title="Total Votos Válidos"
          value={new Intl.NumberFormat('es-CO').format(votos_validos)}
          icon={CheckCircle}
          colorClass="text-indigo-500"
        />

        <IndicatorItem 
          title="Participación Electoral"
          value={participacion !== 'No disponible' ? participacion : new Intl.NumberFormat('es-CO').format(total_votantes)}
          subtitle={participacion !== 'No disponible' ? "del potencial" : "votantes totales"}
          icon={PieChart}
          colorClass="text-purple-500"
        />

      </div>
    </div>
  );
}
