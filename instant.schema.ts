import { i } from '@instantdb/react';

const _schema = i.schema({
    entities: {
        // Built-in entities
        $files: i.entity({
            path: i.string().unique().indexed(),
            url: i.string(),
        }),
        $users: i.entity({
            email: i.string().unique().indexed().optional(),
            imageURL: i.string().optional(),
            type: i.string().optional(),
        }),

        // Custom entity for query tracking
        queries: i.entity({
            queryText: i.string(),          // The actual query
            timestamp: i.date(),            // When it was asked
            queryLength: i.number(),        // Character count
            inputMethod: i.string(),        // 'text', 'voice', or 'chip'
            sessionId: i.string().indexed(), // Track session (optional)
            language: i.string().optional(), // Language if using voice (e.g., 'en-US')
        }),
    },

    links: {},
    rooms: {},
});

// Export types
export type Query = {
    id: string;
    queryText: string;
    timestamp: Date;
    queryLength: number;
    inputMethod: 'text' | 'voice' | 'chip';
    sessionId: string;
    language?: string;
};

// Generate types for use in your app
type Schema = typeof _schema;
interface AppSchema extends Schema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
