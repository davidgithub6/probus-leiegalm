import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE } from '$lib/server/auth.js';

export function load({ locals }) {
    return { lid: locals.lid };
}

export const actions = {
    logout: async ({ platform, cookies }) => {
        const db = platform?.env?.DB;
        const token = cookies.get('lid_session');

        if (db && token && token !== 'fixed') {
            await db.prepare('DELETE FROM leden_sessions WHERE token = ?').bind(token).run();
        }

        cookies.delete('lid_session', { path: '/' });
        redirect(302, '/leden');
    },
};
