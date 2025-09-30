import React from 'react';

interface GuideButtonProps {
  text: string;
  payload: string;
  onSendMessage: (text: string) => void;
}

const GuideButton: React.FC<GuideButtonProps> = ({ text, payload, onSendMessage }) => {
  const handleClick = () => {
    // We send the payload, not the display text
    onSendMessage(payload);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 text-sm"
    >
      {text}
    </button>
  );
};

export default GuideButton;
