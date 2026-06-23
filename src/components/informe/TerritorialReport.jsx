import React from 'react';
import { electoralService } from '../../services/electoralService';

export default function TerritorialReport() {
  const puestos = electoralService.getAllPuestos();

  const val = (num) => new Intl.NumberFormat('es-CO').format(num);
  const pct = (num, total) => ((num / total) * 100).toFixed(1) + '%';

  return (
    <div className="mb-12 avoid-page-break">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6 uppercase tracking-wider">
        II. Informe Territorial (Por Puestos)
      </h3>

      <div className="border border-gray-200 rounded print-clean overflow-hidden">
        <table className="w-full text-left text-[11px] sm:text-xs">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-3 py-3 font-bold">Puesto de Votación</th>
              <th className="px-2 py-3 font-bold text-center">Mesas</th>
              <th className="px-2 py-3 font-bold text-right">Cepeda</th>
              <th className="px-2 py-3 font-bold text-right">Abelardo</th>
              <th className="px-2 py-3 font-bold text-right">Blanco</th>
              <th className="px-2 py-3 font-bold text-right">Nulos</th>
              <th className="px-3 py-3 font-bold text-right">Votantes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {puestos.map((p) => {
              const ganoCepeda = p.cepeda > p.abelardo;
              const validos = p.cepeda + p.abelardo + p.blancos;

              return (
                <tr key={p.nombre} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-semibold text-gray-800">{p.nombre}</td>
                  <td className="px-2 py-2 text-center text-gray-600">{p.mesas}</td>
                  <td className={`px-2 py-2 text-right ${ganoCepeda ? 'font-bold text-red-600' : 'text-gray-700'}`}>
                    {val(p.cepeda)} <span className="block text-[9px] text-gray-400">{pct(p.cepeda, validos)}</span>
                  </td>
                  <td className={`px-2 py-2 text-right ${!ganoCepeda && p.abelardo > p.cepeda ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                    {val(p.abelardo)} <span className="block text-[9px] text-gray-400">{pct(p.abelardo, validos)}</span>
                  </td>
                  <td className="px-2 py-2 text-right text-gray-600">{val(p.blancos)}</td>
                  <td className="px-2 py-2 text-right text-gray-600">{val(p.nulos)}</td>
                  <td className="px-3 py-2 text-right font-bold text-gray-900">{val(p.totalVotantes)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
