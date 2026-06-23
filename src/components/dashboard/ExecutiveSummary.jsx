import React from 'react';

export default function ExecutiveSummary({ resumen }) {
  if (!resumen) return null;

  const { 
    votos_cepeda, 
    votos_abelardo, 
    votos_validos, 
    mesas_informadas, 
    total_mesas 
  } = resumen;

  // Cálculos lógicos
  const ganador = votos_cepeda > votos_abelardo 
    ? { nombre: 'Iván Cepeda', votos: votos_cepeda, color: 'text-red-600' } 
    : { nombre: 'Abelardo de la Espriella', votos: votos_abelardo, color: 'text-blue-600' };
  
  const perdedor = votos_cepeda > votos_abelardo 
    ? { nombre: 'Abelardo de la Espriella', votos: votos_abelardo } 
    : { nombre: 'Iván Cepeda', votos: votos_cepeda };

  const diferencia = ganador.votos - perdedor.votos;
  const porcentajeGanador = ((ganador.votos / votos_validos) * 100).toFixed(2);
  const porcentajeEscrutinio = ((mesas_informadas / total_mesas) * 100).toFixed(1);

  const escrutinioCompleto = mesas_informadas === total_mesas;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Análisis General
      </h3>
      
      <div className="text-gray-700 space-y-3 leading-relaxed">
        <p>
          Con un escrutinio del <strong>{porcentajeEscrutinio}%</strong> ({mesas_informadas} de {total_mesas} mesas), 
          el candidato con mayor votación en el municipio es <strong className={ganador.color}>{ganador.nombre}</strong> con 
          {' '}<strong>{new Intl.NumberFormat('es-CO').format(ganador.votos)} votos</strong>.
        </p>
        <p>
          Esto representa el <strong>{porcentajeGanador}%</strong> de los votos válidos. 
          La diferencia respecto a {perdedor.nombre} es de <strong>{new Intl.NumberFormat('es-CO').format(diferencia)} votos</strong>.
        </p>
        {escrutinioCompleto && (
          <p className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg inline-block mt-2 font-medium">
            ✓ Escrutinio finalizado al 100%
          </p>
        )}
      </div>
    </div>
  );
}
