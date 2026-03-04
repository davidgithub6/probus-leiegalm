import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.lid) redirect(302, '/leden');
    return { lid: locals.lid };
}
