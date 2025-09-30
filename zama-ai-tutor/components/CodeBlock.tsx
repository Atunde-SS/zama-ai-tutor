
import React, { useState, useEffect, useMemo } from 'react';
import { CopyIcon } from './icons/CopyIcon';

declare global {
  interface Window {
    hljs: any;
  }
}

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  // Use useMemo to create the highlighted HTML string.
  // This is a safer, more React-idiomatic approach than manipulating the DOM directly.
  const highlightedHTML = useMemo(() => {
    const codeToHighlight = code.trimEnd();
    if (window.hljs) {
      try {
        // Find the language if it's registered, otherwise auto-detect
        const lang = window.hljs.getLanguage(language) ? language : 'plaintext';
        const result = window.hljs.highlight(codeToHighlight, { language: lang, ignoreIllegals: true });
        return result.value;
      } catch (e) {
        console.error("Highlight.js error:", e);
        // Fallback to plain, un-highlighted text on error
        return codeToHighlight;
      }
    }
    // Fallback if hljs is not available for some reason
    return codeToHighlight;
  }, [code, language]);
  
  // This effect is now only responsible for calculating line numbers for the gutter.
  useEffect(() => {
    setLineCount(code.trimEnd().split('\n').length);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-950 rounded-lg my-4 not-prose overflow-hidden border border-gray-700/50">
      <div className="flex justify-between items-center text-xs px-4 py-2 bg-gray-900 border-b border-gray-700/50">
        <span className="font-semibold select-none text-gray-400">{language}</span>
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-1.5 rounded-md px-2 py-1 -my-1 -mr-2 text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all disabled:opacity-50" 
          disabled={isCopied}
        >
          <CopyIcon />
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="flex text-sm font-mono">
        <div 
          aria-hidden="true" 
          className="flex-shrink-0 text-right text-gray-500 select-none bg-gray-900 py-4 px-4 border-r border-gray-700/50"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="overflow-x-auto py-4 px-4 w-full">
          <code 
            className={`language-${language} hljs`}
            dangerouslySetInnerHTML={{ __html: highlightedHTML }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
