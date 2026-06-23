import { appConfig } from '../../config/appConfig';

export default function DashboardHeader({ ultimaActualizacion }) {
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '';
    const opciones = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(fechaISO).toLocaleDateString('es-CO', opciones);
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{appConfig.title}</h2>
      <p className="text-xl text-gray-600 mb-1">{appConfig.subtitle}</p>
      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4 mt-2">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {appConfig.location}
        </span>
        {ultimaActualizacion && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Última actualización: {formatearFecha(ultimaActualizacion)}
          </span>
        )}
      </div>
    </div>
  );
}
