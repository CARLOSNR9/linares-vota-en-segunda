import React, { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function ExportPdfButton({ targetId, filename = "Informe_Electoral_Linares_2026.pdf" }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    setIsExporting(true);

    const opt = {
      margin:       10, // márgenes en mm
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error al exportar PDF:", error);
      alert("Hubo un error al generar el PDF. Asegúrate de tener los navegadores actualizados.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className="no-print flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg shadow-sm transition-colors"
      title="Descargar versión PDF"
    >
      {isExporting ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
      {isExporting ? 'Generando PDF...' : 'Exportar PDF'}
    </button>
  );
}
