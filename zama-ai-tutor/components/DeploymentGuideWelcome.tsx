import React from 'react';
import { RocketIcon } from './icons/RocketIcon';

interface DeploymentGuideWelcomeProps {
    onStartGuide: () => void;
}

const DeploymentGuideWelcome: React.FC<DeploymentGuideWelcomeProps> = ({ onStartGuide }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="text-indigo-400 mb-4">
                <RocketIcon />
            </div>
            <h2 className="text-2xl font-bold text-white">Deploy your first Confidential Smart Contract</h2>
            <p className="mt-2 max-w-lg text-gray-400">
                Ready to take the next step? Our interactive guide will walk you through deploying your first FHEVM smart contract, with tailored paths for both developers and non-technical users.
            </p>
            <button
                onClick={onStartGuide}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
                Start Deployment Guide
            </button>
        </div>
    );
};

export default DeploymentGuideWelcome;
