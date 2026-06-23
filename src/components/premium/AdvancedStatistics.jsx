import React from 'react';
import { motion } from 'framer-motion';
import { electoralService } from '../../services/electoralService';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function AdvancedStatistics() {
  const stats = electoralService.getEstadisticas();
  const puestos = electoralService.getAllPuestos();
  
  const promedioMesa = Math.round(stats.totalVotantes / stats.totalMesas);
  const promedioPuesto = Math.round(stats.totalVotantes / puestos.length);
  
  const diferencias = puestos.map(p => Math.abs(p.cepeda - p.abelardo));
  const diffPromedio = Math.round(diferencias.reduce((a, b) => a + b, 0) / diferencias.length);

  const StatBox = ({ title, value, suffix, delay }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
    >
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-baseline gap-1">
        <h4 className="text-3xl font-black text-gray-900 dark:text-white">
          <AnimatedCounter value={value} />
        </h4>
        <span className="text-sm font-medium text-gray-400 dark:text-gray-500">{suffix}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatBox title="Votos por Mesa (Promedio)" value={promedioMesa} suffix="votos/mesa" delay={0.1} />
      <StatBox title="Densidad por Puesto" value={promedioPuesto} suffix="votos/puesto" delay={0.2} />
      <StatBox title="Brecha Promedio (Puestos)" value={diffPromedio} suffix="votos dif." delay={0.3} />
    </div>
  );
}
