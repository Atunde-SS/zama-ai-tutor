import React from 'react';
import { UserRole } from '../types';
import { CodeBracketIcon } from './icons/CodeBracketIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

interface RoleSelectionModalProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center p-6 text-center bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:border-indigo-500 transition-all duration-200 w-64 h-64 justify-center"
  >
    <div className="text-indigo-400 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </button>
);

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ onSelectRole }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 p-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to the Zama AI Tutor</h1>
        <p className="text-lg text-gray-400">To personalize your learning journey, please choose your profile.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <RoleCard
          icon={<CodeBracketIcon />}
          title="Developer"
          description="Get a technical deep-dive into FHEVM, with code examples, setup guides, and smart contract tutorials."
          onClick={() => onSelectRole(UserRole.DEVELOPER)}
        />
        <RoleCard
          icon={<ChatBubbleIcon />}
          title="Non-Technical"
          description="Explore the high-level concepts of FHE, its real-world applications, and the vision behind Zama, all in simple terms."
          onClick={() => onSelectRole(UserRole.NON_TECHNICAL)}
        />
      </div>
    </div>
  );
};

export default RoleSelectionModal;
