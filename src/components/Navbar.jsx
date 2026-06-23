import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, Layers, PieChart, FileText } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Puestos', path: '/puestos', icon: <MapPin size={20} /> },
    { name: 'Mesas', path: '/mesas', icon: <Layers size={20} /> },
    { name: 'Análisis', path: '/analisis', icon: <PieChart size={20} /> },
    { name: 'Informe', path: '/informe', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Side/Top Navigation (if needed later, currently kept simple as a top bar below header) */}
      <nav className="hidden md:block bg-white shadow-sm sticky top-[88px] z-40">
        <div className="container mx-auto">
          <ul className="flex justify-center space-x-8 h-14">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 h-full px-4 border-b-2 transition-colors duration-200 ${
                      isActive ? 'border-primary text-primary font-semibold' : 'border-transparent text-gray-600 hover:text-primary hover:border-primary/50'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
