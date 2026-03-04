import type { D1Database } from '@cloudflare/workers-types';

declare global {
    namespace App {
        interface Locals {
            cmsFetch: typeof fetch;
            lid: { lid_id: number; email: string; naam: string } | null;
        }
        interface Platform {
            env: {
                CMS: { fetch: typeof fetch };
                DB: D1Database;
                RESEND_API_KEY?: string;
                RESEND_FROM_EMAIL?: string;
            };
        }
    }
}

export {};
