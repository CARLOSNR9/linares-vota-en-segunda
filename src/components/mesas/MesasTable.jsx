import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function MesasTable({ mesas, onSelectMesa }) {
  const [sortConfig, setSortConfig] = useState({ key: 'total', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedMesas = useMemo(() => {
    let sortableItems = [...mesas];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Manejo especial para strings (puesto)
        if (typeof aValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }

        // Manejo para números
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
    return sortableItems;
  }, [mesas, sortConfig]);

  // Reset page when data changes
  useMemo(() => setCurrentPage(1), [mesas]);

  const totalPages = Math.ceil(sortedMesas.length / itemsPerPage);
  const currentData = sortedMesas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const SortHeader = ({ label, sortKey }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown size={12} className={sortConfig.key === sortKey ? 'text-blue-500' : 'text-gray-300'} />
      </div>
    </th>
  );

  if (mesas.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">No se encontraron mesas con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <SortHeader label="Puesto" sortKey="puesto" />
              <SortHeader label="Mesa" sortKey="mesa" />
              <SortHeader label="Cepeda" sortKey="cepeda" />
              <SortHeader label="Abelardo" sortKey="abelardo" />
              <SortHeader label="Blancos" sortKey="blanco" />
              <SortHeader label="Nulos" sortKey="nulos" />
              <SortHeader label="Total" sortKey="total" />
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((mesa) => (
              <tr key={mesa.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">{mesa.puesto}</td>
                <td className="px-4 py-3 text-sm text-gray-600">Mesa {mesa.mesa}</td>
                <td className="px-4 py-3 text-sm text-gray-800 font-semibold">{mesa.cepeda}</td>
                <td className="px-4 py-3 text-sm text-gray-800 font-semibold">{mesa.abelardo}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{mesa.blanco}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{mesa.nulos}</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-800">{mesa.total}</td>
                <td className="px-4 py-3 text-right">
                  <button 
                    onClick={() => onSelectMesa(mesa)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye size={14} />
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, sortedMesas.length)}</span> de <span className="font-medium">{sortedMesas.length}</span> mesas
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
