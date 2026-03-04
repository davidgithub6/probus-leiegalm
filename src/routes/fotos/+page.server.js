import { fetchFotoAlbums } from '$lib/api.js';

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3000';

function absoluteUrl(url) {
    if (!url) return null;
    return url.startsWith('http') ? url : CMS_URL + url;
}

export async function load({ locals }) {
    const docs = await fetchFotoAlbums(locals.cmsFetch);
    const albums = docs.map(a => ({
        id: a.id,
        titel: a.titel,
        datum: a.datum,
        fotoCount: a.fotos?.length ?? 0,
        enkelLeden: a.enkelLeden ?? true,
        coverUrl: absoluteUrl(a.coverAfbeelding?.url ?? null),
    }));
    return { albums };
}
