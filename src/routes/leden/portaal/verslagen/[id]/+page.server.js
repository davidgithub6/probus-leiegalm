import { fetchDocument } from '$lib/api.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
    const verslag = await fetchDocument('verslagen', params.id, locals.cmsFetch);
    if (!verslag) error(404, 'Verslag niet gevonden.');
    return { verslag };
}
