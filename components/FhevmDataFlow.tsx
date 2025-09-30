import React from 'react';
import { LockIcon } from './icons/LockIcon';
import { UnlockIcon } from './icons/UnlockIcon';
import { BlockchainIcon } from './icons/BlockchainIcon';
import { BrowserIcon } from './icons/BrowserIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const FlowCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-indigo-400">{icon}</div>
    <h3 className="mt-2 font-semibold text-white">{title}</h3>
    <div className="mt-4 w-56 p-3 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-gray-300 min-h-[100px] flex flex-col items-center justify-center space-y-2">
        {children}
    </div>
  </div>
);

const FhevmDataFlow: React.FC = () => {
  return (
    <div className="my-6 not-prose bg-gray-800 border border-gray-700 rounded-lg p-6 overflow-x-auto">
        <h2 className="text-lg font-bold text-center text-white mb-6">FHEVM dApp Data Flow</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {/* Client (Encrypt) */}
            <FlowCard title="1. Client (Browser)" icon={<BrowserIcon />}>
                <p>Plaintext Data</p>
                <div className="px-3 py-1 bg-green-900/50 text-green-300 border border-green-700 rounded">"Vote Yes"</div>
                <div className="my-2 text-indigo-400"><LockIcon className="h-5 w-5 mx-auto"/></div>
                <p className="font-mono text-xs text-indigo-300">fhevmjs.encrypt( )</p>
                <div className="px-3 py-1 bg-red-900/50 text-red-300 border border-red-700 rounded">Encrypted Data</div>
            </FlowCard>

            <ArrowRightIcon className="h-8 w-8 text-gray-500 transform rotate-90 md:rotate-0" />

            {/* Blockchain */}
            <FlowCard title="2. Blockchain (FHEVM)" icon={<BlockchainIcon />}>
                 <p>Smart Contract processes encrypted transaction</p>
                 <code className="text-xs text-amber-300 bg-black/30 px-2 py-1 rounded">
                    euint32 yesVotes;
                 </code>
                 <code className="text-xs text-amber-300 bg-black/30 px-2 py-1 rounded">
                    yesVotes += encryptedVote;
                 </code>
                 <p>State remains encrypted</p>
            </FlowCard>

            <ArrowRightIcon className="h-8 w-8 text-gray-500 transform rotate-90 md:rotate-0" />

            {/* Client (Decrypt) */}
            <FlowCard title="3. Client (Browser)" icon={<BrowserIcon />}>
                <p>Encrypted Result Returned</p>
                <div className="px-3 py-1 bg-red-900/50 text-red-300 border border-red-700 rounded">Encrypted Tally</div>
                <div className="my-2 text-indigo-400"><UnlockIcon className="h-5 w-5 mx-auto"/></div>
                 <p className="font-mono text-xs text-indigo-300">fhevmjs.decrypt( )</p>
                <div className="px-3 py-1 bg-green-900/50 text-green-300 border border-green-700 rounded">Decrypted Tally: "5"</div>
            </FlowCard>
        </div>
    </div>
  );
};

export default FhevmDataFlow;