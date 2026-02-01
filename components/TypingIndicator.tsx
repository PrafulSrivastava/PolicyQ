import React from 'react';
import SparklesIcon from './icons/sparkles-icon';

export default function TypingIndicator() {
    return (
        <div className="flex items-start gap-3 mb-6 animate-fade-in">
            {/* AI Avatar */}
            <div className="w-10 h-10 bg-white border-2 border-black 
                          rounded-xl flex items-center justify-center shrink-0 
                          shadow-brutal-sm animate-pulse">
                <SparklesIcon size={18} color="black" />
            </div>

            {/* Typing Bubble */}
            <div className="bubble-ai px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-sm font-medium text-gray-500 mt-2">
                    Reading the source...
                </p>
                <p className="sr-only">Processing your question</p>
            </div>
        </div>
    );
}
