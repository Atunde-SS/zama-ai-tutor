import React, { useEffect, useRef } from 'react';
import { Message, Role } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface DeploymentGuideProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ messages, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
       <div className="p-4 border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white text-center">First Contract Deployment Guide</h2>
        </div>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              onSendMessage={onSendMessage}
              isLoading={
                isLoading &&
                index === messages.length - 1 &&
                msg.role === Role.MODEL
              }
            />
          )
        )}
        <div ref={messagesEndRef} />
      </main>
      <div className="border-t border-gray-700 bg-gray-900/70 backdrop-blur-sm p-4 md:p-6">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DeploymentGuide;