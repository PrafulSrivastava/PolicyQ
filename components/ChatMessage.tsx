import React from 'react';
import ReactMarkdown from 'react-markdown';
import SparklesIcon from './icons/sparkles-icon';
import UserIcon from './icons/user-icon';
import LikeIcon from './icons/like-icon';
import DislikeIcon from './icons/dislike-icon';
import CopyIcon from './icons/copy-icon';

interface Source {
    text: string;
    score: number;
}

export interface MessageProps {
    role: 'user' | 'assistant';
    content: string;
    sources?: Source[];
    timestamp?: string;
    isError?: boolean;
    onSourceClick?: (sources: Source[]) => void;
}

export default function ChatMessage({ role, content, sources, timestamp, isError, onSourceClick }: MessageProps) {
    const isUser = role === 'user';
    const timeDisplay = timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User Message - Black bubble
    if (isUser) {
        return (
            <div className="flex justify-end items-start gap-2 sm:gap-3 mb-6 animate-slide-right">
                <div className="flex flex-col items-end flex-1 min-w-0" style={{ maxWidth: '85%' }}>
                    {/* Message Bubble — max-w-[85%] on mobile, 75% on desktop via inline override at sm */}
                    <div className="bubble-user px-4 sm:px-5 py-3 sm:py-4 w-full sm:max-w-[75%] sm:w-auto">
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                            {content}
                        </p>
                    </div>
                    <span className="text-xs text-gray-400 mt-2 mr-2 font-mono">
                        {timeDisplay}
                    </span>
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black border-2 border-black 
                              rounded-xl flex items-center justify-center shrink-0 shadow-brutal-sm">
                    <UserIcon size={16} color="white" />
                </div>
            </div>
        );
    }

    // Assistant Message - White bubble with black border
    return (
        <div className={`flex items-start gap-2 sm:gap-3 mb-6 animate-slide-left ${isError ? 'opacity-90' : ''}`}>
            {/* AI Avatar */}
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 
                          shadow-brutal-sm border-2
                          ${isError
                    ? 'bg-red-100 border-red-600'
                    : 'bg-white border-black'}`}>
                <SparklesIcon size={16} color={isError ? '#DC2626' : 'black'} />
            </div>

            {/* Message Content */}
            <div className="flex-1 min-w-0" style={{ maxWidth: '85%' }}>
                {/* Badge */}
                {!isError && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 
                                  bg-black text-white rounded-full text-xs font-bold
                                  mb-2 shadow-offset-sm">
                        <SparklesIcon size={12} color="white" />
                        From the policy
                    </div>
                )}

                {/* Bubble — full width on mobile, 75% max on desktop */}
                <div className={`px-4 sm:px-5 py-3 sm:py-4 ${isError ? 'bubble-error' : 'bubble-ai'} sm:max-w-[75%]`}>
                    {/* Answer Text */}
                    <div className={`prose prose-sm max-w-none leading-relaxed prose-mono
                                  ${isError ? 'text-red-700' : 'text-gray-900'}`}>
                        {isError ? content : <ReactMarkdown>{content}</ReactMarkdown>}
                    </div>

                    {/* Sources Box */}
                    {!isError && sources && sources.length > 0 && (
                        <div className="mt-4 bg-gray-50 rounded-xl border-2 border-gray-200 
                                      p-3 sm:p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-bold text-black text-sm uppercase tracking-wide">
                                    Cited from
                                </span>
                                <span className="px-2 py-0.5 bg-black text-white text-xs 
                                              font-bold rounded-full">
                                    {sources.length}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {sources.slice(0, 4).map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => onSourceClick && onSourceClick(sources)}
                                        className="px-3 py-1.5 bg-white border-2 
                                                 border-gray-300 rounded-lg text-sm 
                                                 font-bold text-gray-700 hover:bg-black
                                                 hover:border-black hover:text-white
                                                 transition-all"
                                        style={{ minWidth: '80px' }}
                                    >
                                        [{i + 1}] {s.text.slice(0, 20)}...
                                    </button>
                                ))}
                                {sources.length > 4 && (
                                    <button
                                        onClick={() => onSourceClick && onSourceClick(sources)}
                                        className="px-3 py-1.5 bg-black border-2 
                                                 border-black rounded-lg text-sm 
                                                 font-bold text-white hover:bg-gray-800
                                                 transition-all"
                                    >
                                        +{sources.length - 4} more
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Feedback Actions — touch-target class applied on mobile via CSS utility */}
                    {!isError && (
                        <div className="flex items-center gap-1 sm:gap-4 mt-4 pt-3 border-t border-gray-200">
                            <button className="touch-target p-1.5 text-gray-400 hover:text-black transition-colors"
                                title="Useful">
                                <LikeIcon size={16} />
                            </button>
                            <button className="touch-target p-1.5 text-gray-400 hover:text-black transition-colors"
                                title="Not useful">
                                <DislikeIcon size={16} />
                            </button>
                            <button className="touch-target p-1.5 text-gray-400 hover:text-black transition-colors ml-auto"
                                title="Copy response">
                                <CopyIcon size={16} />
                            </button>
                            <span className="text-xs text-gray-400 font-mono">
                                {timeDisplay}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}