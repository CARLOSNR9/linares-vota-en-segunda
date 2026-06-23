import { appConfig } from '../config/appConfig';
import ThemeSwitcher from './ui/ThemeSwitcher';

export default function Header() {
  return (
    <header className="bg-primary dark:bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto flex items-center justify-between relative">
        <div className="flex-1 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-1">{appConfig.title}</h1>
          <h2 className="text-sm md:text-base font-medium opacity-90">{appConfig.subtitle}</h2>
          <p className="text-xs opacity-75 mt-1">{appConfig.location}</p>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

