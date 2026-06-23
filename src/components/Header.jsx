import { appConfig } from '../config/appConfig';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold mb-1">{appConfig.title}</h1>
        <h2 className="text-sm md:text-base font-medium opacity-90">{appConfig.subtitle}</h2>
        <p className="text-xs opacity-75 mt-1">{appConfig.location}</p>
      </div>
    </header>
  );
}
