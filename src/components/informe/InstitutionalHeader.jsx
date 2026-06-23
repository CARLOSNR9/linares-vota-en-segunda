import React from 'react';

export default function InstitutionalHeader() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-800 pb-4 mb-8 avoid-page-break">
      <div className="flex items-center gap-4">
        <img 
          src="/logo-alcaldia.png" 
          alt="Logo Alcaldía" 
          className="h-12 w-auto object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E";
          }}
        />
        <div>
          <h1 className="font-bold text-gray-900 leading-tight uppercase tracking-wide">Alcaldía Municipal de Linares</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Departamento de Nariño</p>
        </div>
      </div>
      
      <div className="text-right">
        <h2 className="font-bold text-indigo-700 text-sm uppercase">LinaresVotaEnSegunda</h2>
        <p className="text-xs text-gray-500">Resultados 2da Vuelta 2026</p>
        <p className="text-xs text-gray-400 mt-1">{formattedDate}</p>
      </div>
    </div>
  );
}
