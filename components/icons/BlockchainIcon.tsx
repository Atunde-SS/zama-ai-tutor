import React from 'react';

export const BlockchainIcon: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0a.75.75 0 001.085.67l.415-.207m-1.5 4.5l.415.207a.75.75 0 001.085-.67V13.5m0 0h6m-6 0a.75.75 0 011.085-.67l.415.207" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
);
