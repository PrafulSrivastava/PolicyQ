import { db, Query } from '@/lib/instantdb';
import { id } from '@instantdb/react';

interface TrackQueryParams {
    queryText: string;
    inputMethod: 'text' | 'voice' | 'chip';
    language?: string;
}

// Generate or retrieve session ID
const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'server';

    let sessionId = sessionStorage.getItem('query_session_id');

    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        sessionStorage.setItem('query_session_id', sessionId);
    }

    return sessionId;
};

// Main tracking function
export const trackQuery = async (params: TrackQueryParams): Promise<void> => {
    const { queryText, inputMethod, language } = params;

    // Don't track empty queries
    if (!queryText.trim() || !process.env.NEXT_PUBLIC_INSTANT_APP_ID) {
        return;
    }

    try {
        // Create transaction to add query
        await db.transact(
            db.tx.queries[id()].update({
                queryText: queryText.trim(),
                timestamp: new Date(),
                queryLength: queryText.trim().length,
                inputMethod,
                sessionId: getSessionId(),
                language: language || undefined,
            })
        );

        console.log('Query tracked successfully');
    } catch (error) {
        // Fail silently - don't break user experience if tracking fails
        console.error('Failed to track query:', error);
    }
};

// Optional: Batch tracking for multiple queries
export const trackQueries = async (queries: TrackQueryParams[]): Promise<void> => {
    if (!process.env.NEXT_PUBLIC_INSTANT_APP_ID) return;

    try {
        const transactions = queries
            .filter(q => q.queryText.trim()) // Filter empty queries
            .map(q =>
                db.tx.queries[id()].update({
                    queryText: q.queryText.trim(),
                    timestamp: new Date(),
                    queryLength: q.queryText.trim().length,
                    inputMethod: q.inputMethod,
                    sessionId: getSessionId(),
                    language: q.language || undefined,
                })
            );

        if (transactions.length > 0) {
            await db.transact(transactions);
            console.log(`${transactions.length} queries tracked successfully`);
        }
    } catch (error) {
        console.error('Failed to track queries:', error);
    }
};

// Hook for query analytics
export const useQueryAnalytics = () => {
    const { data, isLoading, error } = db.useQuery({
        queries: {},
    });

    return {
        queries: (data?.queries as Query[]) || [],
        isLoading,
        error,
    };
};

// Hook for current session queries
export const useSessionQueries = () => {
    const sessionId = getSessionId();

    const { data, isLoading, error } = db.useQuery({
        queries: {
            $: {
                where: {
                    sessionId,
                },
            },
        },
    });

    return {
        queries: (data?.queries as Query[]) || [],
        isLoading,
        error,
    };
};
