import { fail, redirect } from '@sveltejs/kit';
import { storeOTP, sendEmail } from '$lib/server/auth.js';

export async function load({ locals }) {
    if (locals.lid) redirect(302, '/leden/portaal');
    return {};
}

export const actions = {
    default: async ({ request, platform }) => {
        const db = platform?.env?.DB;
        if (!db) return fail(500, { error: 'Dienst tijdelijk niet beschikbaar.' });

        const data = await request.formData();
        const email = data.get('email')?.toString().toLowerCase().trim() ?? '';

        if (!email || !email.includes('@')) {
            return fail(400, { error: 'Geldig e-mailadres verplicht.' });
        }

        const account = await db.prepare(
            'SELECT id FROM leden_accounts WHERE email = ?'
        ).bind(email).first();

        if (!account) {
            return fail(404, { error: 'Geen account gevonden voor dit e-mailadres. Heeft u een uitnodiging ontvangen?' });
        }

        const code = await storeOTP(db, email);

        await sendEmail(platform?.env?.RESEND_API_KEY, {
            to: email,
            subject: 'Uw inlogcode — Probus LEIEGALM',
            html: `
                <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; color: #1a2a3a;">
                    <h2 style="color: #1b3a5c;">Probus LEIEGALM</h2>
                    <p>Uw inlogcode is:</p>
                    <p style="font-size: 36px; letter-spacing: 10px; font-weight: bold; color: #1b3a5c; margin: 20px 0;">${code}</p>
                    <p style="color: #666; font-size: 14px;">Deze code is 10 minuten geldig.</p>
                    <p style="color: #999; font-size: 12px;">Indien u niet probeerde in te loggen, kunt u deze e-mail negeren.</p>
                </div>
            `,
        });

        redirect(302, `/leden/code?email=${encodeURIComponent(email)}`);
    },
};
