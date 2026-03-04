import { fetchBestuursleden } from '$lib/api.js';

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3000';

function absoluteUrl(url) {
    if (!url) return null;
    return url.startsWith('http') ? url : CMS_URL + url;
}

export async function load({ locals }) {
    const docs = await fetchBestuursleden(locals.cmsFetch);
    const bestuursleden = docs.map(m => ({
        ...m,
        fotoUrl: absoluteUrl(m.foto?.url ?? null),
    }));
    return { bestuursleden };
}
