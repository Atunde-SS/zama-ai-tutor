import React, { useState } from 'react';
import { SaveIcon } from './icons/SaveIcon';

interface ApiKeyModalProps {
  isOpen: boolean;
  isSaving: boolean;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, isSaving, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!apiKey.trim()) {
        setError('API Key cannot be empty.');
        return;
    }
    setError(null);
    onSave(apiKey);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 p-4 text-center">
      <div className="max-w-lg w-full p-8 bg-gray-800 border border-indigo-500/50 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2">Enter Your Gemini API Key</h1>
        <p className="text-gray-400 mb-6">
          To use the Zama AI Tutor, please provide your Google Gemini API key. It will be saved securely in your browser's local storage.
        </p>
        <div className="w-full">
            <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key here"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                aria-label="Gemini API Key"
                disabled={isSaving}
            />
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button
          onClick={handleSave}
          disabled={isSaving || !apiKey.trim()}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying & Saving...
            </>
          ) : (
            <>
                <SaveIcon />
                Save Key
            </>
          )}
        </button>
         <p className="text-sm text-gray-500 mt-6">
          You can get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">Google AI Studio</a>.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyModal;
