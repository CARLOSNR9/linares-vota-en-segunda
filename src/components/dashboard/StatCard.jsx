import React from 'react';

export default function StatCard({ title, value, icon: Icon, description, colorClass = "text-primary" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-lg bg-gray-50 ${colorClass}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div>
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        {description && (
          <p className="text-xs text-gray-400 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
}
