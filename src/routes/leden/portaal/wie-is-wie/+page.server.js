import { fetchCollection } from '$lib/api.js';

export async function load({ locals }) {
    const data = await fetchCollection('wie_is_wie', {
        sort: 'volgorde',
        limit: 100,
    }, locals.cmsFetch);

    return { personen: data.docs ?? [] };
}
