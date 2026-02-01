'use client';

import React, { useMemo } from 'react';
import { useQueryAnalytics } from '@/services/queryTracker';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
    const { queries, isLoading, error } = useQueryAnalytics();
    const router = useRouter();

    // Calculate statistics
    const stats = useMemo(() => {
        if (!queries || queries.length === 0) return null;

        const totalQueries = queries.length;
        const avgLength = Math.round(
            queries.reduce((sum, q) => sum + (q.queryLength || 0), 0) / totalQueries
        );

        const methodCounts = queries.reduce((acc, q) => {
            const method = q.inputMethod || 'unknown';
            acc[method] = (acc[method] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const uniqueSessions = new Set(queries.map(q => q.sessionId)).size;

        return {
            totalQueries,
            avgLength,
            methodCounts,
            uniqueSessions,
        };
    }, [queries]);

    // Pre-sort queries once for the table/cards
    const sortedQueries = useMemo(() => {
        if (!queries) return [];
        return [...queries]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 50);
    }, [queries]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 font-body">
                <Header onClear={() => router.push('/')} />
                <div className="p-8 pt-24 text-center">
                    <div className="animate-pulse text-xl font-bold text-gray-400">Loading analytics...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 font-body">
                <Header onClear={() => router.push('/')} />
                <div className="p-8 pt-24 text-center">
                    <div className="text-xl font-bold text-rose-500">Error: {error.message}</div>
                    <p className="mt-2 text-gray-500">Make sure NEXT_PUBLIC_INSTANT_APP_ID is set and schema is pushed.</p>
                </div>
            </div>
        );
    }

    // Badge colour helper (shared between table and card view)
    const badgeClass = (method: string) => {
        if (method === 'voice') return 'bg-rose-100 border-rose-300 text-rose-700';
        if (method === 'chip') return 'bg-orange-100 border-orange-300 text-orange-700';
        return 'bg-purple-100 border-purple-300 text-purple-700';
    };

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            <Header onClear={() => router.push('/')} />

            <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-22 sm:pt-24 pb-12" style={{ paddingTop: '88px' }}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 sm:mb-8 gap-3">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-1 sm:mb-2">
                            📊 Query Analytics
                        </h1>
                        <p className="text-gray-500 font-medium text-sm sm:text-base">Insights into user behavior and queries.</p>
                    </div>
                    <button
                        onClick={() => router.push('/')}
                        className="self-start sm:self-end px-4 py-2 bg-white border-2 border-black rounded-xl font-bold shadow-offset-sm hover:shadow-brutal-sm hover:-translate-y-0.5 transition-all text-sm"
                    >
                        Back to Chat
                    </button>
                </div>

                {/* Stats Cards */}
                {stats ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
                        <div className="bg-white rounded-2xl border-2 border-black p-4 sm:p-6 shadow-brutal-sm">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
                                Total Queries
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-purple-600">
                                {stats.totalQueries}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border-2 border-black p-4 sm:p-6 shadow-brutal-sm">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
                                Avg Length
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-teal-600">
                                {stats.avgLength} <span className="text-base sm:text-lg">ch</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border-2 border-black p-4 sm:p-6 shadow-brutal-sm">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
                                Sessions
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-orange-600">
                                {stats.uniqueSessions}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border-2 border-black p-4 sm:p-6 shadow-brutal-sm">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">
                                Voice
                            </div>
                            <div className="text-3xl sm:text-4xl font-black text-rose-600">
                                {stats.methodCounts.voice || 0}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border-2 border-black p-8 sm:p-12 text-center mb-8 sm:mb-12 shadow-brutal-sm">
                        <p className="text-lg sm:text-xl font-bold text-gray-400">No queries tracked yet.</p>
                    </div>
                )}

                {/* ====================================================
                    MOBILE card view  (< md)
                    DESKTOP table     (≥ md)
                    ==================================================== */}

                {/* --- MOBILE CARD VIEW --- */}
                <div className="md:hidden">
                    <div className="bg-white rounded-2xl border-2 border-black shadow-brutal-sm overflow-hidden">
                        <div className="px-4 py-3 border-b-2 border-black bg-purple-50">
                            <h2 className="text-base font-bold text-black">Recent Queries</h2>
                        </div>

                        <div className="p-3 mobile-card-table">
                            {sortedQueries.length > 0 ? (
                                sortedQueries.map((query) => (
                                    <div key={query.id} className="card-row">
                                        {/* Query text */}
                                        <div className="card-label">Query</div>
                                        <div className="card-value" style={{ maxWidth: '100%' }}>
                                            {query.queryText}
                                        </div>

                                        {/* Method + Length row */}
                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                            <span className={`card-badge px-2.5 py-0.5 text-xs font-black rounded-full border-2 ${badgeClass(query.inputMethod || 'unknown')}`}>
                                                {query.inputMethod}
                                            </span>
                                            <span className="text-xs font-bold text-gray-400 font-mono">
                                                {query.queryLength} ch · {new Date(query.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-gray-400 font-bold">
                                    No data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- DESKTOP TABLE (unchanged) --- */}
                <div className="hidden md:block">
                    <div className="bg-white rounded-2xl border-2 border-black shadow-brutal-sm overflow-hidden">
                        <div className="px-6 py-4 border-b-2 border-black bg-purple-50">
                            <h2 className="text-xl font-bold text-black">
                                Recent Queries
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 border-b-2 border-black">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-black text-gray-600 uppercase tracking-widest">
                                            Query
                                        </th>
                                        <th className="px-6 py-4 text-xs font-black text-gray-600 uppercase tracking-widest">
                                            Method
                                        </th>
                                        <th className="px-6 py-4 text-xs font-black text-gray-600 uppercase tracking-widest">
                                            Length
                                        </th>
                                        <th className="px-6 py-4 text-xs font-black text-gray-600 uppercase tracking-widest text-right">
                                            Time
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {sortedQueries.length > 0 ? (
                                        sortedQueries.map((query) => (
                                            <tr key={query.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-[15px] font-medium text-black max-w-md truncate">
                                                    {query.queryText}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 text-xs font-black rounded-full border-2 ${badgeClass(query.inputMethod || 'unknown')}`}>
                                                        {query.inputMethod}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-500">
                                                    {query.queryLength}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-gray-400 text-right">
                                                    {new Date(query.timestamp).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}