import React from 'react';
import { electoralService } from '../services/electoralService';
import TerritorialSummary from '../components/puestos/TerritorialSummary';
import TerritorialComparisonChart from '../components/puestos/TerritorialComparisonChart';
import TerritorialRanking from '../components/puestos/TerritorialRanking';
import PuestoCard from '../components/puestos/PuestoCard';

export default function PuestosVotacion() {
  const puestos = electoralService.getAllPuestos();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Resultados por Puesto</h2>
        <p className="text-xl text-gray-600">Explorador territorial del comportamiento electoral en Linares</p>
      </div>

      <TerritorialSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TerritorialComparisonChart />
        </div>
        <div className="lg:col-span-1">
          <TerritorialRanking />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Análisis Individual por Puesto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {puestos.map(puesto => (
            <PuestoCard key={puesto.nombre} puesto={puesto} />
          ))}
        </div>
      </div>
    </div>
  );
}
