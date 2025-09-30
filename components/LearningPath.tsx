import React, { useState, useEffect } from 'react';
import { LearningSection } from '../types';
import {ChevronDownIcon} from './icons/ChevronDownIcon';

interface LearningPathProps {
  path: LearningSection[];
  onSelectTopic: (prompt: string) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ path, onSelectTopic }) => {
  const [openSection, setOpenSection] = useState<string | null>(path[0]?.title || null);

  useEffect(() => {
    // When the path is filtered, the currently open section might disappear.
    // This effect ensures that if the open section is no longer visible,
    // we either close all sections or open the first available one.
    const isCurrentOpenSectionVisible = path.some(section => section.title === openSection);
    
    if (!isCurrentOpenSectionVisible) {
        setOpenSection(path[0]?.title || null);
    }
  }, [path, openSection]);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <aside className="w-80 bg-gray-900/50 border-r border-gray-800 p-4 flex flex-col h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold text-white mb-4 px-2">Your Learning Path</h2>
      <nav className="space-y-2">
        {path.length > 0 ? (
          path.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex justify-between items-center text-left p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-gray-300">{section.title}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${openSection === section.title ? 'rotate-180' : ''}`} />
              </button>
              {openSection === section.title && (
                <ul className="mt-1 pl-4 border-l-2 border-gray-700">
                  {section.topics.map((topic) => (
                    <li key={topic.title}>
                      <button
                        onClick={() => onSelectTopic(topic.prompt)}
                        className="w-full text-left py-1.5 px-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors text-sm"
                      >
                        {topic.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
            <div className="text-center text-gray-500 px-2 py-4">
                <p>No topics found.</p>
                <p className="text-sm">Try adjusting your search.</p>
            </div>
        )}
      </nav>
    </aside>
  );
};

export default LearningPath;