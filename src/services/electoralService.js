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
