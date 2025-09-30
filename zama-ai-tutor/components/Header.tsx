import React from 'react';
import { KeyIcon } from './icons/KeyIcon';
import ThemeSelector from './ThemeSelector';
import { CodeTheme, AIPersona } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { MenuIcon } from './icons/MenuIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import PersonaSelector from './PersonaSelector';

const ZamaLogo: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M24 0L0 24L24 48L48 24L24 0ZM24 40L8 24L24 8L40 24L24 40Z" fill="white"/>
  </svg>
);

interface HeaderProps {
    onOpenKeyManager: () => void;
    currentTheme: CodeTheme;
    onSetTheme: (theme: CodeTheme) => void;
    currentPersona: AIPersona;
    onSetPersona: (persona: AIPersona) => void;
    searchTerm: string;
    onSearchChange: (query: string) => void;
    onToggleSidebar: () => void;
    onStartContractWizard: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    onOpenKeyManager, 
    currentTheme, 
    onSetTheme, 
    currentPersona,
    onSetPersona,
    searchTerm, 
    onSearchChange, 
    onToggleSidebar,
    onStartContractWizard
}) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
            <button 
                onClick={onToggleSidebar} 
                className="p-2 -ml-2 rounded-full text-white hover:bg-gray-700"
                aria-label="Toggle learning path"
            >
                <MenuIcon />
            </button>
            <ZamaLogo />
            <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Zama AI Tutor</h1>
            <p className="text-sm text-gray-400">Your personal guide to the FHEVM ecosystem.</p>
            </div>
        </div>
        
        <div className="flex-1 flex justify-center px-8">
            <div className="w-full max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search learning path..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    aria-label="Search learning path"
                />
            </div>
        </div>

        <div className="flex items-center gap-2">
            <PersonaSelector currentPersona={currentPersona} onSetPersona={onSetPersona} />
            <ThemeSelector currentTheme={currentTheme} onSetTheme={onSetTheme} />
            <button 
                onClick={onStartContractWizard}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-400"
                aria-label="Start contract generation wizard"
            >
                <SparklesIcon />
            </button>
            <button 
                onClick={onOpenKeyManager}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Open Key Manager"
            >
                <KeyIcon />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;