import { init } from '@instantdb/react';
import schema from '../instant.schema';

// Initialize InstantDB with your app ID
// IMPORTANT: Add NEXT_PUBLIC_INSTANT_APP_ID to your .env.local
export const db = init({
    appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!,
    schema,
    useDateObjects: true, // Use Date objects instead of timestamps
});

// Export types for use in components
export type { Query } from '../instant.schema';
