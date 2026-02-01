import React, { useState } from 'react';
import FileDescriptionIcon from './icons/file-description-icon';
import DownChevron from './icons/down-chevron';
import HashIcon from './icons/hash-icon';

interface Source {
    text: string;
    score: number;
}

interface SourceAccordionProps {
    sources: Source[];
}

export default function SourceAccordion({ sources }: SourceAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!sources || sources.length === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium 
                   text-gray-700 hover:text-gray-900 
                   transition-colors group"
            >
                <div className="p-1 rounded bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <FileDescriptionIcon size={16} />
                </div>
                <span>View {sources.length} Sources</span>
                <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <DownChevron size={16} color="#9ca3af" />
                </div>
            </button>

            {isOpen && (
                <div className="mt-3 space-y-2 animate-fade-in">
                    {sources.map((source, idx) => (
                        <div
                            key={idx}
                            className="p-3 bg-white rounded-xl border border-gray-200 
                         hover:border-primary-300 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center gap-1.5 
                                 px-2 py-0.5 bg-primary-50 text-primary-700 
                                 rounded-full text-xs font-semibold">
                                    <HashIcon size={12} />
                                    Source {idx + 1}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                    {Math.round(source.score * 100)}% match
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed font-mono">
                                "{source.text}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
