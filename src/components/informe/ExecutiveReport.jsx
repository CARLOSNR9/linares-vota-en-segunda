import React from 'react';
import { electoralService } from '../../services/electoralService';

export default function ExecutiveReport() {
  const stats = electoralService.getEstadisticas();
  const insights = electoralService.generarInsights();

  const val = (num) => new Intl.NumberFormat('es-CO').format(num);
  const pct = (num, total) => ((num / total) * 100).toFixed(1) + '%';
  const validos = stats.cepeda + stats.abelardo + stats.blancos;

  return (
    <div className="mb-12 page-break">
      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6 uppercase tracking-wider">
        I. Resumen Ejecutivo
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-200 p-4 rounded bg-gray-50 print-clean">
          <p className="text-xs text-gray-500 uppercase font-bold">Censo Electoral</p>
          <p className="text-2xl font-black text-gray-900">{val(stats.potencialElectoral)}</p>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50 print-clean">
          <p className="text-xs text-gray-500 uppercase font-bold">Total Votantes</p>
          <p className="text-2xl font-black text-gray-900">{val(stats.totalVotantes)}</p>
          <p className="text-xs text-gray-400">Participación: {stats.participacion}%</p>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50 print-clean">
          <p className="text-xs text-gray-500 uppercase font-bold">Mesas Informadas</p>
          <p className="text-2xl font-black text-gray-900">{stats.totalMesas}</p>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50 print-clean">
          <p className="text-xs text-gray-500 uppercase font-bold">Votos Válidos</p>
          <p className="text-2xl font-black text-gray-900">{val(validos)}</p>
        </div>
      </div>

      <div className="mb-8 border border-gray-200 rounded print-clean overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 font-bold text-sm uppercase text-gray-700">
          Consolidado de Votación
        </div>
        <table className="w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-semibold text-gray-800">Candidato Iván Cepeda</td>
              <td className="px-4 py-3 text-right font-bold">{val(stats.cepeda)}</td>
              <td className="px-4 py-3 text-right text-gray-500">{pct(stats.cepeda, validos)}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-semibold text-gray-800">Candidato Abelardo de la E.</td>
              <td className="px-4 py-3 text-right font-bold">{val(stats.abelardo)}</td>
              <td className="px-4 py-3 text-right text-gray-500">{pct(stats.abelardo, validos)}</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 text-gray-600">Votos en Blanco</td>
              <td className="px-4 py-3 text-right">{val(stats.blancos)}</td>
              <td className="px-4 py-3 text-right text-gray-500">{pct(stats.blancos, validos)}</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="px-4 py-3 text-gray-600">Votos Nulos</td>
              <td className="px-4 py-3 text-right">{val(stats.nulos)}</td>
              <td className="px-4 py-3 text-right text-gray-500">-</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 text-gray-600">Tarjetas No Marcadas</td>
              <td className="px-4 py-3 text-right">{val(stats.noMarcados)}</td>
              <td className="px-4 py-3 text-right text-gray-500">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border border-gray-200 p-6 rounded print-clean bg-white">
        <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wide text-sm">
          Conclusiones Oficiales
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
          {insights.map((insight, idx) => (
            <li key={idx} className="leading-relaxed text-justify">{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
