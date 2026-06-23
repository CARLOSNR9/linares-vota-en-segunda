import React from 'react';
import { electoralService } from '../../services/electoralService';

export default function MesasReport() {
  const mesas = electoralService.getAllMesas();

  // Agrupar mesas por puesto para un reporte más limpio
  const mesasAgrupadas = mesas.reduce((acc, mesa) => {
    if (!acc[mesa.puesto]) {
      acc[mesa.puesto] = [];
    }
    acc[mesa.puesto].push(mesa);
    return acc;
  }, {});

  const val = (num) => new Intl.NumberFormat('es-CO').format(num);

  return (
    <div className="mb-8 avoid-page-break">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6 uppercase tracking-wider">
        III. Informe Detallado (Por Mesas)
      </h3>

      <div className="border border-gray-200 rounded print-clean overflow-hidden">
        <table className="w-full text-left text-[11px] sm:text-xs">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-3 py-3 font-bold">Puesto</th>
              <th className="px-2 py-3 font-bold">Mesa</th>
              <th className="px-2 py-3 font-bold text-right">Cepeda</th>
              <th className="px-2 py-3 font-bold text-right">Abelardo</th>
              <th className="px-2 py-3 font-bold text-right">Blancos</th>
              <th className="px-2 py-3 font-bold text-right">Nulos</th>
              <th className="px-2 py-3 font-bold text-right">No Marc.</th>
              <th className="px-3 py-3 font-bold text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.keys(mesasAgrupadas).sort().map(puesto => (
              <React.Fragment key={puesto}>
                {/* Fila separadora de puesto */}
                <tr className="bg-gray-50 border-y border-gray-200">
                  <td colSpan="8" className="px-3 py-2 font-bold text-gray-800 uppercase tracking-wide text-[10px]">
                    {puesto}
                  </td>
                </tr>
                {/* Filas de mesas del puesto */}
                {mesasAgrupadas[puesto].sort((a,b) => a.mesa.localeCompare(b.mesa)).map(mesa => (
                  <tr key={mesa.id} className="hover:bg-gray-50">
                    <td className="px-3 py-1.5 text-transparent select-none">-</td> {/* Celda invisible para alinear */}
                    <td className="px-2 py-1.5 font-medium text-gray-700">{mesa.mesa}</td>
                    <td className="px-2 py-1.5 text-right font-semibold text-gray-800">{val(mesa.cepeda)}</td>
                    <td className="px-2 py-1.5 text-right font-semibold text-gray-800">{val(mesa.abelardo)}</td>
                    <td className="px-2 py-1.5 text-right text-gray-600">{val(mesa.blanco)}</td>
                    <td className="px-2 py-1.5 text-right text-gray-600">{val(mesa.nulos)}</td>
                    <td className="px-2 py-1.5 text-right text-gray-500">{val(mesa.noMarcados)}</td>
                    <td className="px-3 py-1.5 text-right font-bold text-gray-900">{val(mesa.total)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
