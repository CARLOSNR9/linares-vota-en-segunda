import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-[#0f172a] font-sans transition-colors">
      <Header />
      <Navbar />
      
      {/* 
        The main content area needs padding on bottom for mobile (to account for the bottom navbar and safe area) 
        and standard padding elsewhere.
      */}
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6 md:mb-0">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
