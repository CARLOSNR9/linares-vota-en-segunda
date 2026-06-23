import React, { useState, useMemo } from 'react';
import { Download, FileJson } from 'lucide-react';
import { electoralService } from '../services/electoralService';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

import MesaStatistics from '../components/mesas/MesaStatistics';
import MesaSearch from '../components/mesas/MesaSearch';
import MesaFilters from '../components/mesas/MesaFilters';
import MesasTable from '../components/mesas/MesasTable';
import MesaDetails from '../components/mesas/MesaDetails';
import MesaComparison from '../components/mesas/MesaComparison';

export default function Mesas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPuesto, setSelectedPuesto] = useState('Todos');
  const [selectedMesaId, setSelectedMesaId] = useState('Todas');
  
  const [selectedMesaForDetails, setSelectedMesaForDetails] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  // Derivar datos filtrados
  const filteredMesas = useMemo(() => {
    let result = electoralService.getAllMesas();
    
    // 1. Filtro por puesto y número de mesa (dropdowns)
    if (selectedPuesto !== 'Todos' || selectedMesaId !== 'Todas') {
      result = electoralService.filtrarMesas(selectedPuesto, selectedMesaId);
    }
    
    // 2. Filtro por búsqueda de texto
    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.puesto.toLowerCase().includes(lowerQuery) || 
        m.mesa.toLowerCase().includes(lowerQuery) ||
        `mesa ${m.mesa}`.toLowerCase().includes(lowerQuery)
      );
    }
    
    return result;
  }, [searchTerm, selectedPuesto, selectedMesaId]);

  const handleSelectMesa = (mesa) => {
    setSelectedMesaForDetails(mesa);
    setIsComparing(false); // Reseteamos el comparador si abren una nueva mesa
  };

  const handleCloseModal = () => {
    setSelectedMesaForDetails(null);
    setIsComparing(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Explorador de Mesas</h2>
        <p className="text-xl text-gray-600">Búsqueda y análisis a nivel de urna</p>
      </div>

      <MesaStatistics />

      {/* Controles de Búsqueda, Filtros y Exportación */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
          <MesaSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <MesaFilters 
            selectedPuesto={selectedPuesto} 
            onPuestoChange={setSelectedPuesto}
            selectedMesa={selectedMesaId}
            onMesaChange={setSelectedMesaId}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
          <button 
            onClick={() => exportToCSV(filteredMesas, 'mesas_linares_2026')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <Download size={16} /> Exportar CSV
          </button>
          <button 
            onClick={() => exportToJSON(filteredMesas, 'mesas_linares_2026')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <FileJson size={16} /> Exportar JSON
          </button>
        </div>
      </div>

      {/* Overlay modal para Detalles o Comparador */}
      {selectedMesaForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto">
            {isComparing ? (
              <MesaComparison mesaA={selectedMesaForDetails} onClose={handleCloseModal} />
            ) : (
              <div>
                <MesaDetails mesa={selectedMesaForDetails} onClose={handleCloseModal} />
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setIsComparing(true)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md transition-colors"
                  >
                    Comparar con otra mesa
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tabla Principal */}
      <MesasTable mesas={filteredMesas} onSelectMesa={handleSelectMesa} />
    </div>
  );
}
