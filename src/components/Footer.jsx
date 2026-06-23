import { appConfig } from '../config/appConfig';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium">{appConfig.title}</p>
        <p className="text-xs text-gray-400 mt-2">
          &copy; {year} {appConfig.location}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
