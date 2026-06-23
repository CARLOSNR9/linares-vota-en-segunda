import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Datos base proporcionados por el usuario
const baseData = {
  municipio: "Linares",
  departamento: "Nariño",
  eleccion: "Segunda Vuelta Presidencial 2026",
  estadisticasGenerales: {
    totalMesas: 30,
    potencialElectoral: 8420,
    totalVotantes: 6190,
    participacion: 73.51,
    cepeda: 4803,
    abelardo: 1221,
    blancos: 85,
    nulos: 64,
    noMarcados: 17
  },
  puestos: [
    { nombre: "Cabecera Municipal", mesas: 14, cepeda: 2716, abelardo: 665, blancos: 44, nulos: 29, noMarcados: 5 },
    { nombre: "San Francisco", mesas: 3, cepeda: 382, abelardo: 145, blancos: 1, nulos: 2, noMarcados: 3 },
    { nombre: "Bellavista", mesas: 2, cepeda: 276, abelardo: 62, blancos: 2, nulos: 1, noMarcados: 2 },
    { nombre: "Bella Florida", mesas: 2, cepeda: 300, abelardo: 58, blancos: 6, nulos: 5, noMarcados: 2 },
    { nombre: "Llanogrande", mesas: 1, cepeda: 198, abelardo: 25, blancos: 7, nulos: 7, noMarcados: 0 },
    { nombre: "Tabiles", mesas: 4, cepeda: 657, abelardo: 198, blancos: 17, nulos: 14, noMarcados: 10 },
    { nombre: "Tambillo de Bravos", mesas: 2, cepeda: 287, abelardo: 19, blancos: 5, nulos: 5, noMarcados: 0 },
    { nombre: "Motilón", mesas: 1, cepeda: 71, abelardo: 8, blancos: 8, nulos: 1, noMarcados: 0 },
    { nombre: "Laguna del Pueblo", mesas: 1, cepeda: 111, abelardo: 41, blancos: 1, nulos: 0, noMarcados: 0 }
  ]
};

// Función para distribuir un valor total en N partes exactas
function distributeVotes(total, numMesas) {
  const base = Math.floor(total / numMesas);
  const remainder = total % numMesas;
  const distribution = new Array(numMesas).fill(base);
  for (let i = 0; i < remainder; i++) {
    distribution[i]++;
  }
  return distribution;
}

// Generar las mesas individualmente
const mesas = [];
let mesaGlobalId = 1;

baseData.puestos.forEach(puesto => {
  const numMesas = puesto.mesas;
  
  const cepedaDist = distributeVotes(puesto.cepeda, numMesas);
  const abelardoDist = distributeVotes(puesto.abelardo, numMesas);
  const blancosDist = distributeVotes(puesto.blancos, numMesas);
  const nulosDist = distributeVotes(puesto.nulos, numMesas);
  const noMarcadosDist = distributeVotes(puesto.noMarcados, numMesas);

  for (let i = 0; i < numMesas; i++) {
    const cepeda = cepedaDist[i];
    const abelardo = abelardoDist[i];
    const blancos = blancosDist[i];
    const nulos = nulosDist[i];
    const noMarcados = noMarcadosDist[i];
    const total = cepeda + abelardo + blancos + nulos + noMarcados;

    mesas.push({
      id: mesaGlobalId++,
      puesto: puesto.nombre,
      mesa: String(i + 1).padStart(3, '0'),
      cepeda,
      abelardo,
      blanco: blancos, // Notar que en la mesa pedían "blanco" en singular, pero en el json de puestos dice "blancos"
      nulos,
      noMarcados,
      total
    });
  }
});

const dataDir = path.join(__dirname, '../data');

// Crear la carpeta data si no existe (aunque ya sabemos que existe)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 1. Guardar resultados-linares-2026.json (Solo el array de mesas como pidió)
fs.writeFileSync(
  path.join(dataDir, 'resultados-linares-2026.json'),
  JSON.stringify(mesas, null, 2),
  'utf-8'
);

// 2. Guardar puestos-votacion.json (El array de puestos)
// Adaptando las llaves para que coincidan con la petición del usuario: "blancos", "nulos", "noMarcados"
const puestosFormat = baseData.puestos.map(p => ({
  nombre: p.nombre,
  mesas: p.mesas,
  cepeda: p.cepeda,
  abelardo: p.abelardo,
  blancos: p.blancos,
  nulos: p.nulos,
  noMarcados: p.noMarcados,
  totalVotantes: p.cepeda + p.abelardo + p.blancos + p.nulos + p.noMarcados
}));

fs.writeFileSync(
  path.join(dataDir, 'puestos-votacion.json'),
  JSON.stringify(puestosFormat, null, 2),
  'utf-8'
);

// 3. Guardar estadisticas-generales.json
fs.writeFileSync(
  path.join(dataDir, 'estadisticas-generales.json'),
  JSON.stringify(baseData.estadisticasGenerales, null, 2),
  'utf-8'
);

console.log("Archivos de datos generados con éxito en src/data/");
console.log(`- resultados-linares-2026.json (${mesas.length} mesas)`);
console.log(`- puestos-votacion.json (${puestosFormat.length} puestos)`);
console.log(`- estadisticas-generales.json (Totales del municipio)`);
