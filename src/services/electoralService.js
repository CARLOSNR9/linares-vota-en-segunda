// electoralService.js
import mesasData from '../data/resultados-linares-2026.json';
import puestosData from '../data/puestos-votacion.json';
import estadisticasData from '../data/estadisticas-generales.json';
import { calcularTotales, calcularPorcentaje, calcularRankingPuestos, obtenerGanador, obtenerDiferencia } from '../utils/electoralCalculations';

class ElectoralService {
  constructor() {
    this.mesas = mesasData;
    this.puestos = puestosData;
    this.estadisticas = estadisticasData;
  }

  getAllMesas() {
    return this.mesas;
  }

  getAllPuestos() {
    return this.puestos;
  }

  getEstadisticas() {
    return this.estadisticas;
  }

  getMesa(idMesa, nombrePuesto) {
    if (nombrePuesto) {
      return this.mesas.find(m => m.mesa === idMesa && m.puesto === nombrePuesto);
    }
    return this.mesas.find(m => m.id === idMesa || m.mesa === idMesa);
  }

  getPuesto(nombrePuesto) {
    return this.puestos.find(p => p.nombre === nombrePuesto);
  }

  obtenerPuestoMasFavorableCepeda() {
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      const pctPrev = prev.cepeda / (prev.cepeda + prev.abelardo + prev.blancos + prev.nulos + prev.noMarcados);
      const pctCurrent = current.cepeda / (current.cepeda + current.abelardo + current.blancos + current.nulos + current.noMarcados);
      return (pctPrev > pctCurrent) ? prev : current;
    });
  }

  obtenerPuestoMasFavorableAbelardo() {
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      const pctPrev = prev.abelardo / (prev.cepeda + prev.abelardo + prev.blancos + prev.nulos + prev.noMarcados);
      const pctCurrent = current.abelardo / (current.cepeda + current.abelardo + current.blancos + current.nulos + current.noMarcados);
      return (pctPrev > pctCurrent) ? prev : current;
    });
  }

  obtenerPuestoMayorParticipacion() {
    // Definido por total de votantes
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      return (prev.totalVotantes > current.totalVotantes) ? prev : current;
    });
  }

  obtenerPuestoMenorParticipacion() {
    // Definido por total de votantes
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      return (prev.totalVotantes < current.totalVotantes) ? prev : current;
    });
  }

  obtenerPuestoConMasMesas() {
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      return (prev.mesas > current.mesas) ? prev : current;
    });
  }

  buscarMesas(query) {
    if (!query) return this.mesas;
    const lowerQuery = query.toLowerCase();
    return this.mesas.filter(m => 
      m.puesto.toLowerCase().includes(lowerQuery) || 
      m.mesa.toLowerCase().includes(lowerQuery) ||
      `mesa ${m.mesa}`.toLowerCase().includes(lowerQuery)
    );
  }

  filtrarMesas(puesto, numeroMesa) {
    let filtradas = this.mesas;
    if (puesto && puesto !== 'Todos') {
      filtradas = filtradas.filter(m => m.puesto === puesto);
    }
    if (numeroMesa && numeroMesa !== 'Todas') {
      filtradas = filtradas.filter(m => m.mesa === numeroMesa);
    }
    return filtradas;
  }

  obtenerMesaMayorVotacion() {
    if (!this.mesas || this.mesas.length === 0) return null;
    return this.mesas.reduce((prev, current) => (prev.total > current.total) ? prev : current);
  }

  obtenerMesaMenorVotacion() {
    if (!this.mesas || this.mesas.length === 0) return null;
    return this.mesas.reduce((prev, current) => (prev.total < current.total) ? prev : current);
  }

  obtenerMesaMayorApoyoCepeda() {
    if (!this.mesas || this.mesas.length === 0) return null;
    return this.mesas.reduce((prev, current) => {
      // Evitamos divisiones por cero
      const pctPrev = prev.total > 0 ? (prev.cepeda / prev.total) : 0;
      const pctCurrent = current.total > 0 ? (current.cepeda / current.total) : 0;
      return (pctPrev > pctCurrent) ? prev : current;
    });
  }

  obtenerMesaMayorApoyoAbelardo() {
    if (!this.mesas || this.mesas.length === 0) return null;
    return this.mesas.reduce((prev, current) => {
      const pctPrev = prev.total > 0 ? (prev.abelardo / prev.total) : 0;
      const pctCurrent = current.total > 0 ? (current.abelardo / current.total) : 0;
      return (pctPrev > pctCurrent) ? prev : current;
    });
  }

  obtenerMesaMasVotosNulos() {
    if (!this.mesas || this.mesas.length === 0) return null;
    return this.mesas.reduce((prev, current) => (prev.nulos > current.nulos) ? prev : current);
  }

  obtenerMesaMasVotosBlancos() {
    if (!this.mesas || this.mesas.length === 0) return null;
    return this.mesas.reduce((prev, current) => (prev.blanco > current.blanco) ? prev : current);
  }

  obtenerPuestoMayorDiferencia() {
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      const diffPrev = Math.abs(prev.cepeda - prev.abelardo);
      const diffCurrent = Math.abs(current.cepeda - current.abelardo);
      return (diffPrev > diffCurrent) ? prev : current;
    });
  }

  obtenerPuestoMenorDiferencia() {
    if (!this.puestos || this.puestos.length === 0) return null;
    return this.puestos.reduce((prev, current) => {
      const diffPrev = Math.abs(prev.cepeda - prev.abelardo);
      const diffCurrent = Math.abs(current.cepeda - current.abelardo);
      return (diffPrev < diffCurrent) ? prev : current;
    });
  }

  obtenerTopMesasCepeda(limite = 5) {
    return [...this.mesas].sort((a, b) => b.cepeda - a.cepeda).slice(0, limite);
  }

  obtenerTopMesasAbelardo(limite = 5) {
    return [...this.mesas].sort((a, b) => b.abelardo - a.abelardo).slice(0, limite);
  }

  obtenerTopMesasParticipacion(limite = 5) {
    return [...this.mesas].sort((a, b) => b.total - a.total).slice(0, limite);
  }

  obtenerTopMesasNulos(limite = 5) {
    return [...this.mesas].sort((a, b) => b.nulos - a.nulos).slice(0, limite);
  }

  generarInsights() {
    const insights = [];
    const stats = this.estadisticas;
    
    // Ganador general
    const ganador = stats.cepeda > stats.abelardo ? 'Iván Cepeda' : 'Abelardo de la Espriella';
    const diferencia = Math.abs(stats.cepeda - stats.abelardo);
    
    insights.push(`El candidato ${ganador} obtuvo la mayoría de los votos del municipio, asegurando la victoria en esta segunda vuelta.`);
    insights.push(`La diferencia entre los candidatos a nivel municipal fue de ${new Intl.NumberFormat('es-CO').format(diferencia)} votos.`);
    
    const puestoMasVotos = this.obtenerPuestoMayorParticipacion();
    if (puestoMasVotos) {
      insights.push(`El puesto de votación "${puestoMasVotos.nombre}" aportó el mayor volumen de votación con ${new Intl.NumberFormat('es-CO').format(puestoMasVotos.totalVotantes)} sufragios.`);
    }

    const mejorPuestoCepeda = this.obtenerPuestoMasFavorableCepeda();
    if (mejorPuestoCepeda) {
      const pct = (mejorPuestoCepeda.cepeda / mejorPuestoCepeda.totalVotantes * 100).toFixed(1);
      insights.push(`El respaldo más fuerte para Iván Cepeda se registró en "${mejorPuestoCepeda.nombre}", donde alcanzó el ${pct}% de los votos de ese sector.`);
    }

    const mejorPuestoAbelardo = this.obtenerPuestoMasFavorableAbelardo();
    if (mejorPuestoAbelardo) {
      const pct = (mejorPuestoAbelardo.abelardo / mejorPuestoAbelardo.totalVotantes * 100).toFixed(1);
      insights.push(`"${mejorPuestoAbelardo.nombre}" fue el territorio donde Abelardo de la Espriella obtuvo su mejor desempeño relativo, logrando un ${pct}% de apoyo.`);
    }

    const menorDiferencia = this.obtenerPuestoMenorDiferencia();
    if (menorDiferencia) {
      const diff = Math.abs(menorDiferencia.cepeda - menorDiferencia.abelardo);
      insights.push(`La contienda territorial más reñida ocurrió en "${menorDiferencia.nombre}", con una separación de apenas ${diff} votos entre ambos candidatos.`);
    }

    return insights;
  }

  validateDataIntegrity() {
    console.log("Iniciando validación de integridad de datos electorales...");
    let hasErrors = false;

    // 1. Validar que no existan valores negativos
    this.mesas.forEach(mesa => {
      if (mesa.cepeda < 0 || mesa.abelardo < 0 || mesa.blanco < 0 || mesa.nulos < 0 || mesa.noMarcados < 0) {
        console.warn(`[VALIDATION ERROR] La mesa ${mesa.mesa} del puesto ${mesa.puesto} tiene votos negativos.`);
        hasErrors = true;
      }
    });

    // 2. Validar que no haya mesas duplicadas (puesto + numero mesa)
    const mesasSet = new Set();
    this.mesas.forEach(mesa => {
      const key = `${mesa.puesto}-${mesa.mesa}`;
      if (mesasSet.has(key)) {
        console.warn(`[VALIDATION ERROR] Mesa duplicada detectada: ${key}`);
        hasErrors = true;
      }
      mesasSet.add(key);
    });

    // 3. Validar sumatoria correcta en cada mesa
    this.mesas.forEach(mesa => {
      const suma = mesa.cepeda + mesa.abelardo + mesa.blanco + mesa.nulos + mesa.noMarcados;
      if (suma !== mesa.total) {
        console.warn(`[VALIDATION ERROR] Inconsistencia en mesa ${mesa.puesto}-${mesa.mesa}. Suma: ${suma}, Total reportado: ${mesa.total}`);
        hasErrors = true;
      }
    });

    // 4. Validar que la sumatoria de las mesas coincida con los totales de los puestos
    const totalesCalculadosPorPuesto = {};
    this.puestos.forEach(p => {
      totalesCalculadosPorPuesto[p.nombre] = { cepeda: 0, abelardo: 0, blancos: 0, nulos: 0, noMarcados: 0, total: 0 };
    });

    this.mesas.forEach(mesa => {
      if (totalesCalculadosPorPuesto[mesa.puesto]) {
        totalesCalculadosPorPuesto[mesa.puesto].cepeda += mesa.cepeda;
        totalesCalculadosPorPuesto[mesa.puesto].abelardo += mesa.abelardo;
        totalesCalculadosPorPuesto[mesa.puesto].blancos += mesa.blanco;
        totalesCalculadosPorPuesto[mesa.puesto].nulos += mesa.nulos;
        totalesCalculadosPorPuesto[mesa.puesto].noMarcados += mesa.noMarcados;
        totalesCalculadosPorPuesto[mesa.puesto].total += mesa.total;
      } else {
        console.warn(`[VALIDATION ERROR] Mesa ${mesa.mesa} pertenece a un puesto desconocido: ${mesa.puesto}`);
        hasErrors = true;
      }
    });

    this.puestos.forEach(puesto => {
      const calc = totalesCalculadosPorPuesto[puesto.nombre];
      if (puesto.cepeda !== calc.cepeda || puesto.abelardo !== calc.abelardo || 
          puesto.blancos !== calc.blancos || puesto.nulos !== calc.nulos || 
          puesto.noMarcados !== calc.noMarcados || puesto.totalVotantes !== calc.total) {
        console.warn(`[VALIDATION ERROR] Los totales de las mesas del puesto ${puesto.nombre} no coinciden con el consolidado del puesto.`);
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      console.log("✓ Todos los datos pasaron las validaciones de integridad correctamente.");
    }
    return !hasErrors;
  }
}

export const electoralService = new ElectoralService();
