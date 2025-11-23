
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PencilSquareIcon, DocumentTextIcon, Bars3Icon, XMarkIcon, BriefcaseIcon, StarIcon, LockClosedIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import PremiumModal from './PremiumModal';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const { isPremium } = useAuth();
  
  const linkClass = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all duration-200 hover:-translate-y-0.5";
  const activeLinkClass = "bg-neutral-800 text-yellow-400 shadow-sm border border-neutral-700";
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
        <NavLink to="/jobs" className={({ isActive }) => `${isMobileMenuOpen ? mobileLinkClass : linkClass} ${isActive ? activeLinkClass : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <BriefcaseIcon className="h-4 w-4" />
            Job Search
        </NavLink>
      </>
  );

  return (
    <>
    <header className="bg-neutral-900 shadow-lg sticky top-0 z-50 border-b border-neutral-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-3 transition-colors">
               <div className="flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-lg shadow-glow transform group-hover:scale-105 transition-transform duration-300">
                  <DocumentTextIcon className="w-6 h-6 text-neutral-900" />
               </div>
               <div className="flex flex-col">
                   <span className="text-xl font-black text-white tracking-tight group-hover:text-yellow-400 transition-colors">CV LEGEND</span>
                   <span className="text-[10px] text-neutral-400 uppercase tracking-widest leading-none">Craft Your Legacy</span>
               </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-2 mr-4">
              {navLinks}
            </div>
            
            {isPremium ? (
                 <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-yellow-500/30 rounded-full text-xs font-bold text-yellow-400 shadow-sm">
                    <StarIcon className="w-3 h-3 text-yellow-400" />
                    PREMIUM
                 </div>
            ) : (
                <button 
                    onClick={() => setIsPremiumModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-neutral-900 text-sm font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-300 transition-all transform hover:scale-105 shadow-md"
                >
                    <LockClosedIcon className="w-4 h-4" />
                    Go Premium
                </button>
            )}
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
                {!isPremium && (
                    <button 
                        onClick={() => {
                            setIsPremiumModalOpen(true);
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 bg-yellow-500/10 text-yellow-400 font-bold mt-2 rounded-md hover:bg-yellow-500/20 flex items-center gap-2"
                    >
                        <LockClosedIcon className="w-4 h-4" />
                        Unlock Premium Features
                    </button>
                )}
            </div>
        </div>
      )}
    </header>
    <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
    </>
  );
};

export default Header;
