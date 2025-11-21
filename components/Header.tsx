
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PencilSquareIcon, DocumentTextIcon, BriefcaseIcon, Bars3Icon, XMarkIcon } from './icons';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const linkClass = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all duration-200 hover:-translate-y-0.5";
  const activeLinkClass = "bg-neutral-800 text-white shadow-sm";
  const mobileLinkClass = "block w-full text-left px-4 py-2 text-base text-neutral-200 hover:bg-neutral-700 rounded-md transition-colors";

  const navLinks = (
      <>
        <NavLink to="/resume" className={({ isActive }) => `${isMobileMenuOpen ? mobileLinkClass : linkClass} ${isActive ? activeLinkClass : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <PencilSquareIcon className="h-4 w-4" />
            Resume Builder
        </NavLink>
        <NavLink to="/cover-letter" className={({ isActive }) => `${isMobileMenuOpen ? mobileLinkClass : linkClass} ${isActive ? activeLinkClass : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <DocumentTextIcon className="h-4 w-4" />
            Cover Letter
        </NavLink>
        <NavLink to="/job-tracker" className={({ isActive }) => `${isMobileMenuOpen ? mobileLinkClass : linkClass} ${isActive ? activeLinkClass : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <BriefcaseIcon className="h-4 w-4" />
            Job Tracker
        </NavLink>
      </>
  );

  return (
    <header className="bg-neutral-900 shadow-md sticky top-0 z-50 border-b border-neutral-800/50 backdrop-blur-sm bg-opacity-95">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-3 transition-colors">
               <div className="relative">
                 <span className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></span>
                 <span className="relative bg-gradient-to-br from-primary to-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-serif italic shadow-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                    A
                 </span>
               </div>
               <div className="flex flex-col">
                   <span className="text-lg font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">AI Resume Architect</span>
                   <span className="text-[10px] text-neutral-400 uppercase tracking-widest leading-none group-hover:text-neutral-300 transition-colors">Builder & Tracker</span>
               </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-2">
              {navLinks}
            </div>
          </div>
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-neutral-200 hover:text-white p-2 transition-transform duration-200 active:scale-90">
                {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in bg-neutral-800 border-t border-neutral-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks}
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
