import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ShieldAlert, Crosshair, Scale, MapPin } from 'lucide-react';
import { electoralService } from '../../services/electoralService';

export default function SmartInsights() {
  const mayorVentaja = electoralService.obtenerPuestoMayorDiferencia();
  const menorDiferencia = electoralService.obtenerPuestoMenorDiferencia();
  const masCompetitivo = menorDiferencia; // Sinónimo para UX
  const mejorCepeda = electoralService.obtenerPuestoMasFavorableCepeda();
  const masVotantes = electoralService.obtenerPuestoMayorParticipacion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const InsightCard = ({ title, puesto, desc, icon: Icon, colorClass, bgClass }) => (
    <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${bgClass} ${colorClass} group-hover:scale-110 transition-transform`}>
          <Icon size={20} />
        </div>
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200">{title}</h4>
      </div>
      <p className="text-xl font-black text-gray-900 dark:text-white mb-1">{puesto?.nombre}</p>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{desc}</p>
    </motion.div>
  );

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Descubrimientos Algorítmicos</h3>
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard 
          title="Mayor Ventaja Electoral"
          puesto={mayorVentaja}
          desc={`Diferencia de ${Math.abs(mayorVentaja.cepeda - mayorVentaja.abelardo)} votos`}
          icon={Trophy}
          colorClass="text-yellow-600 dark:text-yellow-400"
          bgClass="bg-yellow-50 dark:bg-yellow-900/30"
        />
        <InsightCard 
          title="Puesto Más Competitivo"
          puesto={masCompetitivo}
          desc={`Separación de apenas ${Math.abs(masCompetitivo.cepeda - masCompetitivo.abelardo)} votos`}
          icon={Crosshair}
          colorClass="text-indigo-600 dark:text-indigo-400"
          bgClass="bg-indigo-50 dark:bg-indigo-900/30"
        />
        <InsightCard 
          title="Bastión I. Cepeda"
          puesto={mejorCepeda}
          desc={`${((mejorCepeda.cepeda / mejorCepeda.totalVotantes) * 100).toFixed(1)}% de apoyo`}
          icon={ShieldAlert}
          colorClass="text-red-600 dark:text-red-400"
          bgClass="bg-red-50 dark:bg-red-900/30"
        />
        <InsightCard 
          title="Epicentro Electoral"
          puesto={masVotantes}
          desc={`${new Intl.NumberFormat('es-CO').format(masVotantes.totalVotantes)} votantes en total`}
          icon={MapPin}
          colorClass="text-emerald-600 dark:text-emerald-400"
          bgClass="bg-emerald-50 dark:bg-emerald-900/30"
        />
      </motion.div>
    </div>
  );
}
