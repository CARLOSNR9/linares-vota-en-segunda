import React from 'react';
import { Lightbulb, CheckCircle2 } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function SmartConclusions() {
  const insights = electoralService.generarInsights();

  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl shadow-lg p-6 md:p-8 text-white mb-8 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-blue-400 opacity-10 blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <Lightbulb className="text-yellow-300" size={24} />
          </div>
          Conclusiones Automáticas
        </h3>
        
        <ul className="space-y-4">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-3 bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-xl border border-white/10">
              <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
              <p className="text-sm md:text-base text-blue-50 leading-relaxed font-medium">
                {insight}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
