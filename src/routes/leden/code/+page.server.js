import { fail, redirect } from '@sveltejs/kit';
import { validateOTP, createSession, SESSION_COOKIE } from '$lib/server/auth.js';

export async function load({ url, locals }) {
    if (locals.lid) redirect(302, '/leden/portaal');

    const email = url.searchParams.get('email') ?? '';
    if (!email || !email.includes('@')) redirect(302, '/leden');

    return { email };
}

export const actions = {
    default: async ({ request, platform, cookies }) => {
        const db = platform?.env?.DB;
        if (!db) return fail(500, { error: 'Dienst tijdelijk niet beschikbaar.' });

        const data = await request.formData();
        const email = data.get('email')?.toString().toLowerCase().trim() ?? '';
        const code = data.get('code')?.toString().trim() ?? '';

        if (!code || code.length !== 6) {
            return fail(400, { email, error: 'Vul de 6-cijferige code in.' });
        }

        const valid = await validateOTP(db, email, code);
        if (!valid) {
            return fail(400, { email, error: 'Ongeldige of verlopen code. Probeer opnieuw.' });
        }

        // Fetch the account id
        const account = await db.prepare(
            'SELECT id FROM leden_accounts WHERE email = ?'
        ).bind(email).first();

        if (!account) {
            return fail(404, { email, error: 'Account niet gevonden.' });
        }

        const { token, expires } = await createSession(db, account.id);
        cookies.set('lid_session', token, { ...SESSION_COOKIE, expires });

        redirect(302, '/leden/portaal');
    },
};
