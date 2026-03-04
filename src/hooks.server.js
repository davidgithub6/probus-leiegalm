import { validateSession } from '$lib/server/auth.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // CMS service binding
    const cms = event.platform?.env?.CMS;
    event.locals.cmsFetch = cms
        ? (url, opts) => cms.fetch(url, opts)
        : globalThis.fetch;

    // Member session check
    event.locals.lid = null;
    const db = event.platform?.env?.DB;
    if (db) {
        const token = event.cookies.get('lid_session');
        if (token) {
            event.locals.lid = await validateSession(db, token);
        }
    }

    return resolve(event);
}
