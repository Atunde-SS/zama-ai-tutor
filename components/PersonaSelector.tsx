import React, { useState, useRef, useEffect } from 'react';
import { AIPersona } from '../types';
import { PERSONAS } from '../constants';
import { PersonaIcon } from './icons/PersonaIcon';
import { CheckIcon } from './icons/CheckIcon';

interface PersonaSelectorProps {
  currentPersona: AIPersona;
  onSetPersona: (persona: AIPersona) => void;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ currentPersona, onSetPersona }) => {
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

  const handlePersonaSelect = (personaId: AIPersona) => {
    onSetPersona(personaId);
    setIsOpen(false);
  };

  const selectedPersona = PERSONAS.find(p => p.id === currentPersona);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Select AI persona"
      >
        <PersonaIcon />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
          <div className="p-3 border-b border-gray-700">
            <p className="text-sm font-semibold text-white">Current Persona</p>
            <p className="text-xs text-gray-400">{selectedPersona?.description}</p>
          </div>
          <ul className="py-1">
            {PERSONAS.map(persona => (
              <li key={persona.id}>
                <button
                  onClick={() => handlePersonaSelect(persona.id)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center justify-between"
                >
                  {persona.name}
                  {currentPersona === persona.id && <CheckIcon />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;