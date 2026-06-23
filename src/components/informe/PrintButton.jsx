import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button 
      onClick={handlePrint}
      className="no-print flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition-colors"
      title="Imprimir documento oficial"
    >
      <Printer size={18} />
      Imprimir Informe
    </button>
  );
}
