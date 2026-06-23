import React, { useState, useEffect } from 'react';
import { Layers, Users, UserCheck, AlertTriangle, FileText, Ban } from 'lucide-react';
import { electoralService } from '../services/electoralService';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import MainChart from '../components/dashboard/MainChart';
import ParticipationChart from '../components/dashboard/ParticipationChart';
import ExecutiveSummary from '../components/dashboard/ExecutiveSummary';
import QuickIndicators from '../components/dashboard/QuickIndicators';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Carga de datos desde el servicio electoral
    const stats = electoralService.getEstadisticas();
    const puestosData = electoralService.getAllPuestos();
    
    const formattedData = {
      ultima_actualizacion: new Date().toISOString(),
      resumen: {
        total_mesas: stats.totalMesas,
        mesas_informadas: stats.totalMesas,
        potencial_votantes: stats.potencialElectoral,
        total_votantes: stats.totalVotantes,
        votos_cepeda: stats.cepeda,
        votos_abelardo: stats.abelardo,
        votos_blanco: stats.blancos,
        votos_nulos: stats.nulos,
        votos_no_marcados: stats.noMarcados,
        votos_validos: stats.cepeda + stats.abelardo + stats.blancos
      },
      puestos: puestosData
    };
    
    setData(formattedData);
  }, []);

  if (!data) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  const { resumen, ultima_actualizacion, puestos } = data;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <DashboardHeader ultimaActualizacion={ultima_actualizacion} />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard 
          title="Mesas Informadas" 
          value={`${resumen.mesas_informadas} / ${resumen.total_mesas}`}
          icon={Layers}
          colorClass="text-blue-500 bg-blue-50"
        />
        <StatCard 
          title="Votantes" 
          value={new Intl.NumberFormat('es-CO').format(resumen.total_votantes)}
          icon={Users}
          colorClass="text-indigo-500 bg-indigo-50"
        />
        <StatCard 
          title="Votos I. Cepeda" 
          value={new Intl.NumberFormat('es-CO').format(resumen.votos_cepeda)}
          icon={UserCheck}
          colorClass="text-red-500 bg-red-50"
        />
        <StatCard 
          title="Votos A. Espriella" 
          value={new Intl.NumberFormat('es-CO').format(resumen.votos_abelardo)}
          icon={UserCheck}
          colorClass="text-blue-500 bg-blue-50"
        />
        <StatCard 
          title="Votos en Blanco" 
          value={new Intl.NumberFormat('es-CO').format(resumen.votos_blanco)}
          icon={FileText}
          colorClass="text-gray-500 bg-gray-50"
        />
        <StatCard 
          title="Votos Nulos" 
          value={new Intl.NumberFormat('es-CO').format(resumen.votos_nulos)}
          icon={Ban}
          colorClass="text-gray-700 bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MainChart resumen={resumen} />
        </div>
        <div className="lg:col-span-1">
          <ParticipationChart resumen={resumen} />
        </div>
      </div>

      <ExecutiveSummary resumen={resumen} />
      
      <QuickIndicators resumen={resumen} />

    </div>
  );
}
