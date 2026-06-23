// electoralCalculations.js

/**
 * Calcula la sumatoria de todos los votos en un array de mesas o puestos
 * @param {Array} lista - Array de objetos (mesas o puestos)
 * @returns {Object} Totales consolidados
 */
export const calcularTotales = (lista) => {
  if (!lista || lista.length === 0) return null;

  return lista.reduce((acc, curr) => {
    return {
      cepeda: (acc.cepeda || 0) + (curr.cepeda || 0),
      abelardo: (acc.abelardo || 0) + (curr.abelardo || 0),
      blancos: (acc.blancos || acc.blanco || 0) + (curr.blancos || curr.blanco || 0),
      nulos: (acc.nulos || 0) + (curr.nulos || 0),
      noMarcados: (acc.noMarcados || 0) + (curr.noMarcados || 0),
      totalVotantes: (acc.totalVotantes || acc.total || 0) + (curr.totalVotantes || curr.total || 0)
    };
  }, {});
};

/**
 * Calcula el porcentaje
 * @param {number} valor 
 * @param {number} total 
 * @returns {string} Porcentaje formateado a 2 decimales
 */
export const calcularPorcentaje = (valor, total) => {
  if (!total || total === 0) return '0.00';
  return ((valor / total) * 100).toFixed(2);
};

/**
 * Calcula el porcentaje de participación
 * @param {number} votantes 
 * @param {number} potencial 
 * @returns {string} Porcentaje de participación a 2 decimales
 */
export const calcularParticipacion = (votantes, potencial) => {
  return calcularPorcentaje(votantes, potencial);
};

/**
 * Ordena un arreglo de puestos según el criterio dado
 * @param {Array} puestos 
 * @param {string} criterio - 'cepeda', 'abelardo', 'totalVotantes'
 * @param {boolean} ascendente - true para menor a mayor, false para mayor a menor
 * @returns {Array} Puestos ordenados
 */
export const calcularRankingPuestos = (puestos, criterio = 'totalVotantes', ascendente = false) => {
  if (!puestos || !Array.isArray(puestos)) return [];
  
  return [...puestos].sort((a, b) => {
    const valA = a[criterio] || 0;
    const valB = b[criterio] || 0;
    
    return ascendente ? valA - valB : valB - valA;
  });
};

/**
 * Determina el candidato ganador y su porcentaje respecto a la suma de ambos
 * @param {number} votosCepeda 
 * @param {number} votosAbelardo 
 * @returns {Object} { ganador, votos, porcentaje }
 */
export const obtenerGanador = (votosCepeda, votosAbelardo) => {
  const totalValidos = votosCepeda + votosAbelardo; // asumiendo válidos solo entre ellos para la comparativa rápida
  
  if (votosCepeda > votosAbelardo) {
    return {
      nombre: 'Iván Cepeda',
      votos: votosCepeda,
      porcentaje: calcularPorcentaje(votosCepeda, totalValidos)
    };
  } else if (votosAbelardo > votosCepeda) {
    return {
      nombre: 'Abelardo de la Espriella',
      votos: votosAbelardo,
      porcentaje: calcularPorcentaje(votosAbelardo, totalValidos)
    };
  } else {
    return {
      nombre: 'Empate',
      votos: votosCepeda,
      porcentaje: '50.00'
    };
  }
};

/**
 * Retorna la diferencia absoluta de votos entre los dos candidatos
 * @param {number} votosCepeda 
 * @param {number} votosAbelardo 
 * @returns {number} Diferencia absoluta
 */
export const obtenerDiferencia = (votosCepeda, votosAbelardo) => {
  return Math.abs(votosCepeda - votosAbelardo);
};
