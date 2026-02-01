import React from 'react';
import FileDescriptionIcon from './icons/file-description-icon';
import XIcon from './icons/x-icon';
import ExternalLinkIcon from './icons/external-link-icon';

interface Source {
    text: string;
    score: number;
}

interface SourcesSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    sources: Source[];
}

export default function SourcesSidebar({ isOpen, onClose, sources }: SourcesSidebarProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop — covers full screen on both mobile & desktop */}
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/*
              MOBILE  : bottom sheet covering 90vh, slides up
              DESKTOP : right panel 420px wide, full height, slides in from right
            */}
            <aside className={`
                fixed z-50 bg-white border-black flex flex-col
                /* Mobile (bottom sheet) */
                bottom-0 left-0 right-0 h-[90vh] rounded-t-2xl border-t border-gray-200
                shadow-2xl animate-slide-up
                /* Desktop override (right panel) */
                sm:bottom-auto sm:left-auto sm:right-0 sm:top-0
                sm:w-[420px] sm:h-screen sm:rounded-none sm:border-t-0 sm:border-l border-gray-200
                sm:animate-slide-left sm:animate-none
            `}>

                {/* Mobile drag handle pill */}
                <div className="flex justify-center pt-2 pb-1 sm:hidden">
                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 
                              border-b border-gray-200 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black border border-black 
                                      rounded-xl flex items-center justify-center shadow-sm">
                            <FileDescriptionIcon size={16} color="white" />
                        </div>
                        <div>
                            <h2 className="font-display font-bold text-black text-base sm:text-lg">Citations</h2>
                            <span className="text-xs text-gray-500 font-mono">
                                {sources.length} {sources.length === 1 ? 'passage' : 'passages'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-gray-50 
                                 border border-gray-300 
                                 rounded-xl flex items-center justify-center 
                                 text-gray-500 transition-all
                                 shadow-sm hover:shadow-md"
                        title="Close"
                    >
                        <XIcon size={16} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin bg-gray-50">
                    {sources.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full 
                                      text-gray-400 space-y-4 animate-fade-in">
                            <div className="w-20 h-20 bg-gray-100 rounded-2xl 
                                          flex items-center justify-center border-2 border-gray-200">
                                <FileDescriptionIcon size={40} color="#9CA3AF" />
                            </div>
                            <p className="text-base font-medium text-center">
                                No citations yet.<br />
                                <span className="text-sm text-gray-400">Ask a question to see sources.</span>
                            </p>
                        </div>
                    ) : (
                        sources.map((source, idx) => {
                            const scorePercent = Math.round(source.score * 100);

                            return (
                                <div
                                    key={idx}
                                    id={`source-${idx}`}
                                    className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 
                                              border-l-4 border-l-black
                                              shadow-sm hover:shadow-md 
                                              hover:-translate-y-1 transition-all duration-200 
                                              group scroll-mt-20 animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 0.05}s` }}
                                >
                                    {/* Card Header: Number + Progress */}
                                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                        {/* Number Badge */}
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white rounded-lg 
                                                       flex items-center justify-center font-black text-sm
                                                       border border-black shadow-sm shrink-0">
                                            {idx + 1}
                                        </div>

                                        {/* Progress Bar - Relevance */}
                                        <div className="flex-1 min-w-0">
                                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden 
                                                          border border-gray-300">
                                                <div
                                                    className="h-full rounded-full bg-black transition-all duration-500"
                                                    style={{ width: `${scorePercent}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Percentage */}
                                        <span className="text-sm font-bold text-black font-mono shrink-0">
                                            {scorePercent}%
                                        </span>
                                    </div>

                                    {/* Text Content */}
                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                        {source.text}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 
                                                  border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            <FileDescriptionIcon size={14} color="#9CA3AF" />
                                            Original text
                                        </div>
                                        <button className="text-xs font-bold text-gray-400 
                                                        hover:text-black 
                                                        flex items-center gap-1 opacity-0 
                                                        group-hover:opacity-100 transition-opacity">
                                            Full document <ExternalLinkIcon size={12} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </aside>
        </>
    );
}