import React from 'react';
import SmartConclusions from '../components/analisis/SmartConclusions';
import KeyFindings from '../components/analisis/KeyFindings';
import ElectoralRanking from '../components/analisis/ElectoralRanking';
import TerritorialAnalysis from '../components/analisis/TerritorialAnalysis';
import TopMesas from '../components/analisis/TopMesas';

export default function Analisis() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Análisis Inteligente</h2>
        <p className="text-xl text-gray-600">Conclusiones matemáticas y radiografía electoral profunda</p>
      </div>

      <SmartConclusions />
      
      <KeyFindings />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 h-auto lg:h-[600px]">
        <div className="h-full">
          <ElectoralRanking />
        </div>
        <div className="h-full">
          <TerritorialAnalysis />
        </div>
      </div>

      <TopMesas />
    </div>
  );
}

