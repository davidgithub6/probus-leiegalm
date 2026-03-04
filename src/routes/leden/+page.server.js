import { fail, redirect } from '@sveltejs/kit';
import { SESSION_COOKIE } from '$lib/server/auth.js';

export async function load({ locals }) {
    if (locals.lid) redirect(302, '/leden/portaal');
    return {};
}

export const actions = {
    default: async ({ request, platform, cookies }) => {
        const data = await request.formData();
        const wachtwoord = data.get('wachtwoord')?.toString() ?? '';

        const expected = platform?.env?.LEDEN_PASSWORD ?? import.meta.env.VITE_LEDEN_PASSWORD;
        if (!expected) return fail(500, { error: 'Portaal tijdelijk niet beschikbaar.' });

        if (wachtwoord !== expected) {
            return fail(401, { error: 'Ongeldig wachtwoord.' });
        }

        cookies.set('lid_session', 'fixed', SESSION_COOKIE);
        redirect(302, '/leden/portaal');
    },
};
