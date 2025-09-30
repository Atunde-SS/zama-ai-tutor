import React, { useState } from 'react';
import { KeyPair } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface KeyManagerProps {
  keyPair: KeyPair | null;
  isLoading: boolean;
  onGenerateKeys: () => void;
}

const KeyDisplay: React.FC<{ label: string; value: string; isSecret?: boolean }> = ({ label, value, isSecret = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(!isSecret);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const truncatedValue = `${value.substring(0, 10)}...${value.substring(value.length - 8)}`;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-400">{label}</label>
        {isSecret && (
          <button onClick={() => setIsVisible(!isVisible)} className="text-gray-500 hover:text-white">
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 bg-gray-900 border border-gray-600 rounded-md p-2">
        <p className="flex-1 text-sm text-gray-300 font-mono break-all">
          {isVisible ? value : truncatedValue}
        </p>
        <button onClick={handleCopy} className="text-gray-500 hover:text-white disabled:opacity-50" disabled={isCopied}>
           {isCopied ? <span className="text-xs">Copied!</span> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
};


const KeyManager: React.FC<KeyManagerProps> = ({ keyPair, isLoading, onGenerateKeys }) => {
  return (
    <div className="p-1 flex flex-col space-y-6">
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : keyPair ? (
          <>
            <KeyDisplay label="Public Key" value={keyPair.publicKey} />
            <KeyDisplay label="Private Key" value={keyPair.privateKey} isSecret />
            <p className="text-xs text-gray-400 p-2 bg-yellow-900/20 border border-yellow-800 rounded-md">
              Warning: Never share your private key. It is stored only in your browser's local storage.
            </p>
          </>
        ) : (
          <div className="text-center text-gray-400 p-4 border-2 border-dashed border-gray-700 rounded-lg min-h-[200px] flex flex-col justify-center">
            <p>You don't have an FHE key pair yet.</p>
            <p className="text-sm text-gray-500">Generate one to interact with FHEVM contracts.</p>
          </div>
        )}
      </div>

      <button
        onClick={onGenerateKeys}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
      >
        <RefreshIcon />
        {keyPair ? 'Generate New Keys' : 'Generate Keys'}
      </button>
    </div>
  );
};

export default KeyManager;
