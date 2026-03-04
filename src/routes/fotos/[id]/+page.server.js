import { fetchFotoAlbum } from '$lib/api.js';
import { error, redirect } from '@sveltejs/kit';

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3000';

function absoluteUrl(url) {
    if (!url) return null;
    return url.startsWith('http') ? url : CMS_URL + url;
}

export async function load({ params, locals }) {
    const doc = await fetchFotoAlbum(params.id, locals.cmsFetch);
    if (!doc) error(404, 'Album niet gevonden');
    if (doc.enkelLeden) redirect(302, '/leden');

    return {
        album: {
            titel: doc.titel,
            datum: doc.datum,
            coverUrl: absoluteUrl(doc.coverAfbeelding?.url ?? null),
            fotos: (doc.fotos ?? []).map(f => ({
                url: absoluteUrl(f.afbeelding?.url ?? null),
                alt: f.afbeelding?.alt ?? doc.titel,
                beschrijving: f.beschrijving ?? '',
            })).filter(f => f.url),
        },
    };
}
