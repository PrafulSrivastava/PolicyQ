import React from 'react';
import Image from 'next/image';
import TrashIcon from './icons/trash-icon';

interface HeaderProps {
    onClear: () => void;
}

export default function Header({ onClear }: HeaderProps) {
    return (
        <header className="fixed top-0 inset-x-0 z-50">
            {/* Main header content */}
            <div className="bg-white border-b-3 border-black h-16">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 h-full flex items-center justify-between">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        {/* Logo from public folder */}
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center 
                                      transform hover:rotate-3 transition-transform overflow-hidden shrink-0">
                            <Image
                                src="/logo.png"
                                alt="PolicyQ Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <div className="min-w-0">
                            <h1 className="font-display font-bold text-black text-base sm:text-lg tracking-tight truncate">
                                PolicyQ
                            </h1>
                            {/* Subtitle hidden on very small screens to save room */}
                            <p className="text-xs text-gray-500 font-medium -mt-0.5 hidden sm:block">
                                Read policies your way
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {/* Policy Selector — hidden on mobile, shown on sm+ */}
                        <div className="relative group hidden sm:block">
                            <select
                                disabled
                                defaultValue="UGC Equity Regulations Bill, 2026"
                                className="pl-3 pr-8 py-2 text-xs sm:text-sm font-bold text-gray-400 
                                         bg-gray-50 border-2 border-gray-200 rounded-xl
                                         cursor-not-allowed appearance-none"
                            >
                                <option value="UGC Equity Regulations Bill, 2026">UGC Equity Regulations Bill, 2026</option>
                            </select>
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>

                        {/* Mobile-only: compact policy chip */}
                        <span className="sm:hidden inline-flex items-center gap-1 px-2 py-1 
                                       bg-gray-100 border border-gray-300 rounded-lg">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span className="text-xs font-bold text-gray-500 truncate" style={{ maxWidth: '110px' }}>
                                UGC Bill
                            </span>
                        </span>

                        <button
                            onClick={onClear}
                            className="px-2 sm:px-4 py-2 text-sm font-bold text-gray-700 
                                     bg-white border-2 border-gray-300 rounded-xl
                                     hover:bg-black hover:text-white hover:border-black
                                     transition-all flex items-center gap-1.5 sm:gap-2 group
                                     shadow-offset-sm hover:shadow-brutal-sm"
                            title="Start fresh"
                        >
                            <TrashIcon size={16} dangerHover />
                            <span className="hidden sm:inline">New</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Solid black accent line */}
            <div className="header-accent" />
        </header>
    );
}