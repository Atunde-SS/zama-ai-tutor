
import React from 'react';
import { Message, Role } from '../types';
import CodeBlock from './CodeBlock';
import FhevmDataFlow from './FhevmDataFlow';
import GuideButton from './GuideButton';

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

// Helper function to parse inline markdown (bold, italic, links) and custom buttons
const parseInline = (text: string, onSendMessage?: (text: string) => void): { textNodes: React.ReactNode[], buttonNodes: React.ReactNode[] } => {
  const textNodes: React.ReactNode[] = [];
  const buttonNodes: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Regex for links, bold, italics, and buttons
  const inlineRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(\[DEPLOYMENT_GUIDE_UI\])|\*\*(.+?)\*\*|_([^_]+?)_|\[BUTTON:([^|]+)\|([^\]]+)\]/g;
  let match;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      textNodes.push(text.substring(lastIndex, match.index));
    }

    // Link
    if (match[1] && match[2]) {
      textNodes.push(<a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium underline">{match[1]}</a>);
    } 
    // Deployment guide tag (render nothing)
    else if (match[3]) { /* do nothing */ }
    // Bold
    else if (match[4]) {
      textNodes.push(<strong key={match.index}>{match[4]}</strong>);
    }
    // Italic
    else if (match[5]) {
      textNodes.push(<em key={match.index}>{match[5]}</em>);
    }
    // Button
    else if (match[6] && match[7] && onSendMessage) {
      buttonNodes.push(<GuideButton key={match.index} text={match[6]} payload={match[7]} onSendMessage={onSendMessage} />);
    }

    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    textNodes.push(text.substring(lastIndex));
  }

  return { textNodes, buttonNodes };
};

// Main parser that handles block-level elements like code, lists, and paragraphs
const parseContent = (content: string, onSendMessage?: (text: string) => void): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    let uniqueKey = 0;

    // Regex to capture all major blocks: code, lists, and custom tags that act like blocks.
    const blockRegex = /```(\w*)\n([\s\S]*?)\n```|(\[FHEVM_DATA_FLOW_VISUALIZATION\])|((?:^\s*(?:[-*]|\d+\.)\s+.*\n?)+)/gm;
    let lastIndex = 0;
    let match;

    while ((match = blockRegex.exec(content)) !== null) {
        // 1. Process the text before the match as paragraphs
        const precedingText = content.substring(lastIndex, match.index);
        if (precedingText.trim()) {
            precedingText.split('\n').forEach(paragraph => {
                if (paragraph.trim()) {
                    const { textNodes, buttonNodes } = parseInline(paragraph, onSendMessage);
                    nodes.push(<p key={`p-${uniqueKey++}`}>{textNodes}</p>);
                    if (buttonNodes.length > 0) {
                        nodes.push(
                            <div key={`btn-container-${uniqueKey++}`} className="mt-4 flex flex-wrap gap-2">
                                {buttonNodes}
                            </div>
                        );
                    }
                }
            });
        }

        // 2. Process the matched block
        // Code block
        if (match[1] !== undefined || match[2] !== undefined) {
            nodes.push(<CodeBlock key={`code-${uniqueKey++}`} language={match[1] || 'plaintext'} code={(match[2] || '').trim()} />);
        }
        // Data flow viz
        else if (match[3]) {
            nodes.push(<FhevmDataFlow key={`flow-${uniqueKey++}`} />);
        }
        // List block
        else if (match[4]) {
            const listBlock = match[4];
            const lines = listBlock.trim().split('\n');
            const isOrdered = /^\s*\d+\./.test(lines[0]);
            const ListTag = isOrdered ? 'ol' : 'ul';
            const listItems = lines.map((line, i) => {
                const itemContent = line.replace(/^\s*(?:[-*]|\d+\.)\s+/, '');
                const { textNodes } = parseInline(itemContent, onSendMessage);
                return <li key={`li-${uniqueKey++}-${i}`}>{textNodes}</li>;
            });
            const listClasses = isOrdered ? "list-decimal list-inside my-2 space-y-1" : "list-disc list-inside my-2 space-y-1";
            nodes.push(<ListTag key={`list-${uniqueKey++}`} className={listClasses}>{listItems}</ListTag>);
        }

        lastIndex = blockRegex.lastIndex;
    }

    // 3. Process any remaining text after the last match
    const remainingText = content.substring(lastIndex);
    if (remainingText.trim()) {
        remainingText.split('\n').forEach(paragraph => {
            if (paragraph.trim()) {
                const { textNodes, buttonNodes } = parseInline(paragraph, onSendMessage);
                nodes.push(<p key={`p-${uniqueKey++}`}>{textNodes}</p>);
                if (buttonNodes.length > 0) {
                    nodes.push(
                        <div key={`btn-container-${uniqueKey++}`} className="mt-4 flex flex-wrap gap-2">
                            {buttonNodes}
                        </div>
                    );
                }
            }
        });
    }

    return nodes;
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false, isTopicSelection = false, onSendMessage }) => {
  const isUser = message.role === Role.USER;

  const messageBubbleClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-gray-800 text-gray-300 rounded-bl-none';

  const containerClasses = `flex items-start gap-4 max-w-2xl mx-auto ${isUser ? 'flex-row-reverse' : ''}`;
  
  const parsedNodes = parseContent(message.content, onSendMessage);

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
            <div className={`prose prose-invert prose-sm max-w-none break-words ${isTopicSelection ? 'italic text-gray-300' : ''}`}>
               {parsedNodes}
               {isLoading && <span className="inline-block w-2 h-4 bg-gray-300 ml-1 animate-pulse"></span>}
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
