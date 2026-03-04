import { fetchCollection, absoluteUrl } from '$lib/api.js';

export async function load({ locals }) {
    const data = await fetchCollection('wie_is_wie', {
        sort: 'volgorde',
        limit: 100,
        depth: '1',
    }, locals.cmsFetch);

    const personen = (data.docs ?? []).map(p => ({
        ...p,
        foto: p.foto ? { ...p.foto, url: absoluteUrl(p.foto.url) } : null,
    }));

    return { personen };
}
