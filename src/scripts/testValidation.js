import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mesas = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/resultados-linares-2026.json'), 'utf-8'));
const puestos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/puestos-votacion.json'), 'utf-8'));

let hasErrors = false;

// 1. Validar negativos
mesas.forEach(mesa => {
  if (mesa.cepeda < 0 || mesa.abelardo < 0 || mesa.blanco < 0 || mesa.nulos < 0 || mesa.noMarcados < 0) {
    console.warn(`[VALIDATION ERROR] La mesa ${mesa.mesa} del puesto ${mesa.puesto} tiene votos negativos.`);
    hasErrors = true;
  }
});

// 2. Validar duplicados
const mesasSet = new Set();
mesas.forEach(mesa => {
  const key = `${mesa.puesto}-${mesa.mesa}`;
  if (mesasSet.has(key)) {
    console.warn(`[VALIDATION ERROR] Mesa duplicada detectada: ${key}`);
    hasErrors = true;
  }
  mesasSet.add(key);
});

// 3. Validar suma mesa
mesas.forEach(mesa => {
  const suma = mesa.cepeda + mesa.abelardo + mesa.blanco + mesa.nulos + mesa.noMarcados;
  if (suma !== mesa.total) {
    console.warn(`[VALIDATION ERROR] Inconsistencia en mesa ${mesa.puesto}-${mesa.mesa}. Suma: ${suma}, Total reportado: ${mesa.total}`);
    hasErrors = true;
  }
});

// 4. Validar suma total hacia puestos
const totalesCalculadosPorPuesto = {};
puestos.forEach(p => {
  totalesCalculadosPorPuesto[p.nombre] = { cepeda: 0, abelardo: 0, blancos: 0, nulos: 0, noMarcados: 0, total: 0 };
});

mesas.forEach(mesa => {
  if (totalesCalculadosPorPuesto[mesa.puesto]) {
    totalesCalculadosPorPuesto[mesa.puesto].cepeda += mesa.cepeda;
    totalesCalculadosPorPuesto[mesa.puesto].abelardo += mesa.abelardo;
    totalesCalculadosPorPuesto[mesa.puesto].blancos += mesa.blanco;
    totalesCalculadosPorPuesto[mesa.puesto].nulos += mesa.nulos;
    totalesCalculadosPorPuesto[mesa.puesto].noMarcados += mesa.noMarcados;
    totalesCalculadosPorPuesto[mesa.puesto].total += mesa.total;
  }
});

puestos.forEach(puesto => {
  const calc = totalesCalculadosPorPuesto[puesto.nombre];
  if (puesto.cepeda !== calc.cepeda || puesto.abelardo !== calc.abelardo || 
      puesto.blancos !== calc.blancos || puesto.nulos !== calc.nulos || 
      puesto.noMarcados !== calc.noMarcados || puesto.totalVotantes !== calc.total) {
    console.warn(`[VALIDATION ERROR] Los totales de las mesas del puesto ${puesto.nombre} no coinciden con el consolidado.`);
    hasErrors = true;
  }
});

if (!hasErrors) {
  console.log("✓ Todos los datos pasaron las validaciones de integridad correctamente.");
  process.exit(0);
} else {
  process.exit(1);
}
