import React, { useState, KeyboardEvent } from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-inner">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question, or paste your FHEVM code to debug, refactor, or optimize with the Code Wizard..."
          className="flex-1 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none resize-none px-2"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="ml-2 p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <SendIcon />
        </button>
      </div>
       <p className="text-xs text-gray-500 mt-2 text-center">
        This AI is for educational purposes. Always refer to official Zama documentation for production use.
      </p>
    </div>
  );
};

export default ChatInput;