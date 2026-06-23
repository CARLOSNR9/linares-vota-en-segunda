import React from 'react';

export default function ReportCover() {
  const date = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('es-CO', options);
  
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString('es-CO', timeOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[297mm] text-center p-12 relative avoid-page-break">
      {/* Marco decorativo */}
      <div className="absolute inset-8 border-4 border-double border-gray-300 pointer-events-none rounded-lg"></div>
      
      <div className="mb-16">
        <img 
          src="/escudo-linares.png" 
          alt="Escudo Municipio de Linares" 
          className="h-48 w-auto object-contain mx-auto opacity-90"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E";
          }}
        />
      </div>

      <h4 className="text-xl font-bold tracking-widest uppercase text-gray-600 mb-2">
        Alcaldía Municipal de Linares
      </h4>
      <p className="text-gray-500 tracking-wide uppercase mb-16 text-sm">
        Departamento de Nariño
      </p>

      <h1 className="text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight leading-tight">
        Informe Oficial <br/>
        de Escrutinios
      </h1>
      
      <div className="h-1 w-24 bg-indigo-600 mx-auto mb-6"></div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Segunda Vuelta Presidencial 2026
      </h2>

      <p className="text-lg text-gray-500 mb-24 max-w-lg mx-auto">
        Documento técnico consolidado con los resultados definitivos por puestos y mesas de votación.
      </p>

      <div className="mt-auto">
        <p className="text-gray-500 mb-1">Generado el sistema central</p>
        <p className="font-bold text-gray-800 text-lg">{formattedDate}</p>
        <p className="text-gray-400 text-sm mt-1">{formattedTime}</p>
      </div>
    </div>
  );
}
