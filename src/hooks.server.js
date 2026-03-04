import { validateSession } from '$lib/server/auth.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // CMS service binding — only use in production (service binding unavailable in local dev)
    const cms = !import.meta.env.DEV && event.platform?.env?.CMS;
    event.locals.cmsFetch = cms
        ? (url, opts) => cms.fetch(url, opts)
        : globalThis.fetch;

    // Member session check
    event.locals.lid = null;
    const token = event.cookies.get('lid_session');
    if (token === 'fixed') {
        // Temporary fixed-password mode (no email/OTP required)
        event.locals.lid = { naam: 'Lid', email: '' };
    } else if (token) {
        const db = event.platform?.env?.DB;
        if (db) {
            event.locals.lid = await validateSession(db, token);
        }
    }

    return resolve(event);
}
