import React from 'react';
import ReportCover from '../components/informe/ReportCover';
import InstitutionalHeader from '../components/informe/InstitutionalHeader';
import InstitutionalFooter from '../components/informe/InstitutionalFooter';
import ExecutiveReport from '../components/informe/ExecutiveReport';
import TerritorialReport from '../components/informe/TerritorialReport';
import MesasReport from '../components/informe/MesasReport';
import PrintButton from '../components/informe/PrintButton';
import ExportPdfButton from '../components/informe/ExportPdfButton';

export default function Informe() {
  return (
    <div className="bg-gray-100 min-h-screen pb-12 pt-6">
      <div className="max-w-[210mm] mx-auto mb-6 no-print flex justify-between items-center px-4 md:px-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Generador de Documentos</h2>
          <p className="text-gray-500 text-sm">Vista previa de impresión oficial (A4)</p>
        </div>
        <div className="flex gap-3">
          <PrintButton />
          <ExportPdfButton targetId="informe-institucional" />
        </div>
      </div>

      {/* Contenedor del documento A4 */}
      <div 
        id="informe-institucional" 
        className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:m-0 print:max-w-none print:w-full font-sans"
      >
        {/* Portada */}
        <div className="bg-white px-12 py-12">
          <ReportCover />
        </div>

        {/* Separador de página visual (oculto en impresión) */}
        <div className="h-4 bg-gray-100 no-print"></div>

        {/* Contenido principal (Páginas interiores) */}
        <div className="bg-white px-12 py-12 page-break">
          <InstitutionalHeader />
          <ExecutiveReport />
          <InstitutionalFooter />
        </div>

        <div className="h-4 bg-gray-100 no-print"></div>

        <div className="bg-white px-12 py-12 page-break">
          <InstitutionalHeader />
          <TerritorialReport />
          <InstitutionalFooter />
        </div>

        <div className="h-4 bg-gray-100 no-print"></div>

        <div className="bg-white px-12 py-12 page-break">
          <InstitutionalHeader />
          <MesasReport />
          <InstitutionalFooter />
        </div>
      </div>
    </div>
  );
}
