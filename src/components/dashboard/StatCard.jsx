import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function StatCard({ title, value, icon: Icon, description, colorClass = "text-primary" }) {
  // If value is a string with " / ", we don't animate it to avoid breaking the layout,
  // or we could split it. For now, if it's purely numerical we animate it.
  const isNumeric = typeof value === 'number' || (typeof value === 'string' && !isNaN(value.replace(/\./g, '').replace(/,/g, '')));
  const cleanValue = isNumeric && typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorClass} dark:bg-opacity-20`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div>
        <span className="text-3xl font-bold text-gray-800 dark:text-white">
          {isNumeric ? <AnimatedCounter value={cleanValue} /> : value}
        </span>
        {description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  );
}

