import React from 'react';

export default function InstitutionalFooter() {
  return (
    <div className="mt-12 border-t border-gray-300 pt-4 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-wider avoid-page-break">
      <div>
        <p className="font-bold">Alcaldía Municipal de Linares</p>
        <p>Departamento de Nariño</p>
      </div>
      <div className="text-right">
        <p>Resultados Segunda Vuelta Presidencial 2026</p>
        <p>Generado por <span className="font-bold">LinaresVotaEnSegunda</span></p>
      </div>
    </div>
  );
}
