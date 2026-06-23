import React from 'react';
import { motion } from 'framer-motion';
import SmartConclusions from '../components/analisis/SmartConclusions';
import KeyFindings from '../components/analisis/KeyFindings';
import TerritorialAnalysis from '../components/analisis/TerritorialAnalysis';
import TopMesas from '../components/analisis/TopMesas';

// Premium Components
import AdvancedStatistics from '../components/premium/AdvancedStatistics';
import SmartInsights from '../components/premium/SmartInsights';
import PremiumRanking from '../components/premium/PremiumRanking';

export default function Analisis() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto pb-12"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Análisis Inteligente</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">Conclusiones matemáticas y radiografía electoral profunda</p>
      </div>

      <SmartConclusions />
      
      <AdvancedStatistics />
      
      <SmartInsights />
      
      <KeyFindings />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 h-auto lg:h-[600px]">
        <div className="h-full">
          <PremiumRanking />
        </div>
        <div className="h-full">
          <TerritorialAnalysis />
        </div>
      </div>

      <TopMesas />
    </motion.div>
  );
}
