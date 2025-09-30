
import React, { useEffect, useRef } from 'react';
// FIX: Correct import paths for root-level component
import { Message, Role } from './types';
import ChatMessage from './ChatMessage';
import ChatInput from './components/ChatInput';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => {
           // A bit of a hack to detect topic selections for styling
           const isTopicSelection = msg.role === Role.USER && msg.content.startsWith('*') && msg.content.endsWith('*');
           const displayMessage = isTopicSelection 
             ? { ...msg, content: msg.content.slice(1, -1) } // Remove asterisks for rendering
             : msg;

           return (
            <ChatMessage
              key={index}
              message={displayMessage}
              isTopicSelection={isTopicSelection}
              isLoading={
                isLoading &&
                index === messages.length - 1 &&
                msg.role === Role.MODEL
              }
            />
          )
        })}
        <div ref={messagesEndRef} />
      </main>
      <div className="border-t border-gray-700 bg-gray-900/70 backdrop-blur-sm p-4 md:p-6">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
