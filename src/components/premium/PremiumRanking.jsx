import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function PremiumRanking() {
  const puestos = electoralService.getAllPuestos();

  const rankedPuestos = puestos.map(p => {
    const total = p.cepeda + p.abelardo + p.blancos + p.nulos + p.noMarcados;
    return {
      ...p,
      pctCepeda: total > 0 ? ((p.cepeda / total) * 100) : 0,
    };
  }).sort((a, b) => b.pctCepeda - a.pctCepeda);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" />
          Leaderboard Territorial
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ordenado por % de apoyo a Iván Cepeda</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <div className="space-y-1">
          {rankedPuestos.map((puesto, idx) => {
            const isTop3 = idx < 3;
            let medalColor = '';
            if (idx === 0) medalColor = 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-400 dark:border-yellow-700/50';
            else if (idx === 1) medalColor = 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
            else if (idx === 2) medalColor = 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/50 dark:text-orange-400 dark:border-orange-800/50';
            else medalColor = 'bg-transparent text-gray-400 dark:text-gray-500 border-transparent';

            return (
              <motion.div 
                key={puesto.nombre}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
              >
                <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full font-bold text-sm border ${medalColor}`}>
                  {idx + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold truncate ${isTop3 ? 'text-gray-900 dark:text-white text-base' : 'text-gray-700 dark:text-gray-200 text-sm'}`}>
                    {puesto.nombre}
                  </h4>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${puesto.pctCepeda}%` }}
                      transition={{ duration: 1, delay: 0.5 + (idx * 0.1), ease: "easeOut" }}
                      className="bg-red-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className={`font-black ${isTop3 ? 'text-lg text-red-600 dark:text-red-400' : 'text-base text-gray-900 dark:text-gray-100'}`}>
                    {puesto.pctCepeda.toFixed(1)}%
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">
                    {puesto.totalVotantes} Votos
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
