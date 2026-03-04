import { fail, redirect, error } from '@sveltejs/kit';
import { createSession, SESSION_COOKIE } from '$lib/server/auth.js';

export async function load({ params, locals }) {
    if (locals.lid) redirect(302, '/leden/portaal');

    const { token } = params;

    // We check the token at render time so invalid links show an error immediately
    // The actual DB check happens server-side without requiring DB at load (no DB in locals)
    return { token };
}

export const actions = {
    default: async ({ params, request, platform, cookies }) => {
        const db = platform?.env?.DB;
        if (!db) return fail(500, { error: 'Dienst tijdelijk niet beschikbaar.' });

        const { token } = params;

        // Validate invite token via Payload's uitnodigingen table
        const invite = await db.prepare(
            `SELECT id, email, used FROM uitnodigingen WHERE token = ? AND expires_at > datetime('now')`
        ).bind(token).first();

        if (!invite) {
            return fail(400, { error: 'Deze uitnodigingslink is ongeldig of verlopen.' });
        }
        if (invite.used) {
            return fail(400, { error: 'Deze uitnodigingslink is al gebruikt.' });
        }

        const data = await request.formData();
        const naam = data.get('naam')?.toString().trim() ?? '';

        if (!naam || naam.length < 2) {
            return fail(400, { error: 'Vul uw volledige naam in.' });
        }

        // Check for existing account
        const existing = await db.prepare(
            'SELECT id FROM leden_accounts WHERE email = ?'
        ).bind(invite.email).first();

        if (existing) {
            // Already registered — just log them in
            const { token: sessionToken, expires } = await createSession(db, existing.id);
            cookies.set('lid_session', sessionToken, { ...SESSION_COOKIE, expires });
            redirect(302, '/leden/portaal');
        }

        // Create account
        await db.prepare(
            'INSERT INTO leden_accounts (email, naam) VALUES (?, ?)'
        ).bind(invite.email, naam).run();

        const account = await db.prepare(
            'SELECT id FROM leden_accounts WHERE email = ?'
        ).bind(invite.email).first();

        // Mark invite used
        await db.prepare('UPDATE uitnodigingen SET used = 1 WHERE id = ?').bind(invite.id).run();

        const { token: sessionToken, expires } = await createSession(db, account.id);
        cookies.set('lid_session', sessionToken, { ...SESSION_COOKIE, expires });

        redirect(302, '/leden/portaal');
    },
};
