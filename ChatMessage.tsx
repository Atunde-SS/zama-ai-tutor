
import React from 'react';
// FIX: Correct import paths for root-level component
import { Message, Role } from './types';
import CodeBlock from './components/CodeBlock';
import FhevmDataFlow from './components/FhevmDataFlow';
import GuideButton from './components/GuideButton';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
  isTopicSelection?: boolean;
  onSendMessage?: (text: string) => void;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const ModelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 48 48" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M24 0L0 24L24 48L48 24L24 0ZM24 40L8 24L24 8L40 24L24 40Z" fill="currentColor"/>
    </svg>
);


const parseContent = (content: string, onSendMessage?: (text: string) => void): { textNodes: React.ReactNode[], buttonNodes: React.ReactNode[] } => {
  const textNodes: React.ReactNode[] = [];
  const buttonNodes: React.ReactNode[] = [];
  let lastIndex = 0;
  // Regex to find code blocks, markdown links, the data flow visualization tag, the deployment guide UI tag, buttons, or bold text.
  const regex = /```(\w*)\n([\s\S]*?)\n```|\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(\[FHEVM_DATA_FLOW_VISUALIZATION\])|(\[DEPLOYMENT_GUIDE_UI\])|\*\*(.+?)\*\*|\[BUTTON:([^|]+)\|([^\]]+)\]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Add the text before the match
    if (match.index > lastIndex) {
      textNodes.push(content.substring(lastIndex, match.index));
    }

    // It's a code block
    if (match[2] !== undefined) {
      const language = match[1] || 'plaintext';
      const code = match[2].trim();
      textNodes.push(<CodeBlock key={match.index} language={language} code={code} />);
    } 
    // It's a link
    else if (match[3] && match[4]) {
      const linkText = match[3];
      const url = match[4];
      textNodes.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 font-medium underline"
        >
          {linkText}
        </a>
      );
    }
    // It's the data flow visualization
    else if (match[5]) {
       textNodes.push(<FhevmDataFlow key={match.index} />);
    }
    // It's the deployment guide UI tag - consume it but render nothing
    else if (match[6]) {
        // This tag is a signal for the App component, so we render nothing here.
    }
    // It's bold text
    else if (match[7]) {
        const boldText = match[7];
        textNodes.push(<strong key={match.index}>{boldText}</strong>);
    }
    // It's a button
    else if (match[8] && match[9] && onSendMessage) {
      const buttonText = match[8];
      const payload = match[9];
      buttonNodes.push(
        <GuideButton
          key={match.index}
          text={buttonText}
          payload={payload}
          onSendMessage={onSendMessage}
        />
      );
    }


    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < content.length) {
    textNodes.push(content.substring(lastIndex));
  }

  return { textNodes, buttonNodes };
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false, isTopicSelection = false, onSendMessage }) => {
  const isUser = message.role === Role.USER;

  const messageBubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-gray-800 text-gray-300 rounded-bl-none';

  const containerClasses = `flex items-start gap-4 max-w-2xl mx-auto ${isUser ? 'flex-row-reverse' : ''}`;
  
  const { textNodes, buttonNodes } = parseContent(message.content, onSendMessage);

  return (
    <div className={containerClasses}>
       <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-gray-700' : 'bg-gray-800'}`}>
         {isUser ? <UserIcon /> : <ModelIcon />}
       </div>
      <div className={`p-4 rounded-lg shadow-md ${messageBubbleClasses} w-full`}>
        {isLoading && !message.content ? (
           <div className="flex items-center justify-center space-x-2">
             <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:-0.3s]"></div>
             <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:-0.15s]"></div>
             <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
           </div>
        ) : (
          <>
            <div className={`prose prose-invert prose-sm max-w-none break-words whitespace-pre-wrap ${isTopicSelection ? 'italic text-gray-300' : ''}`}>
               {textNodes}
               {isLoading && <span className="inline-block w-2 h-4 bg-gray-300 ml-1 animate-pulse"></span>}
            </div>
            {buttonNodes.length > 0 && !isUser && !isLoading && (
              <div className="mt-4 flex flex-wrap gap-2">
                {buttonNodes}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
