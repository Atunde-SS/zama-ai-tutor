import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

const ApiKeyMissingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 p-4 text-center">
      <div className="max-w-lg p-8 bg-gray-800 border border-red-500/50 rounded-lg shadow-2xl">
        <div className="text-red-400 mx-auto mb-4 flex justify-center">
          <WarningIcon />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Gemini API Key Not Found</h1>
        <p className="text-lg text-gray-400">
          This application requires a Google Gemini API key to function. Please refer to the <strong>README.md</strong> file in the project's root directory for instructions on how to obtain and configure your key.
        </p>
         <p className="text-sm text-gray-500 mt-6">
          You may need to restart the application after setting up the key.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyMissingModal;
