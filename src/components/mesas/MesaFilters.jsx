import React, { useMemo } from 'react';
import { electoralService } from '../../services/electoralService';

export default function MesaFilters({ selectedPuesto, onPuestoChange, selectedMesa, onMesaChange }) {
  const puestos = useMemo(() => electoralService.getAllPuestos(), []);
  
  const mesasDisponibles = useMemo(() => {
    if (selectedPuesto === 'Todos') return [];
    return electoralService.getAllMesas().filter(m => m.puesto === selectedPuesto);
  }, [selectedPuesto]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 sm:w-48">
        <select
          className="block w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          value={selectedPuesto}
          onChange={(e) => {
            onPuestoChange(e.target.value);
            onMesaChange('Todas'); // Reset mesa al cambiar puesto
          }}
        >
          <option value="Todos">Todos los Puestos</option>
          {puestos.map(p => (
            <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 sm:w-32">
        <select
          className="block w-full py-2 px-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-400"
          value={selectedMesa}
          onChange={(e) => onMesaChange(e.target.value)}
          disabled={selectedPuesto === 'Todos'}
        >
          <option value="Todas">Todas las Mesas</option>
          {mesasDisponibles.map(m => (
            <option key={m.id} value={m.mesa}>Mesa {m.mesa}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
