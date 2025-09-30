import React, { useState, useRef, useEffect } from 'react';
import { CodeTheme } from '../types';
import { THEMES } from '../constants';
import { PaletteIcon } from './icons/PaletteIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ThemeSelectorProps {
  currentTheme: CodeTheme;
  onSetTheme: (theme: CodeTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onSetTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeSelect = (themeId: CodeTheme) => {
    onSetTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Select code block theme"
      >
        <PaletteIcon />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
          <ul className="py-1">
            {THEMES.map(theme => (
              <li key={theme.id}>
                <button
                  onClick={() => handleThemeSelect(theme.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center justify-between"
                >
                  {theme.name}
                  {currentTheme === theme.id && <CheckIcon />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;