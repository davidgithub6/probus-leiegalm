import { fetchFotoAlbums } from '$lib/api.js';

export async function load({ locals }) {
    const docs = await fetchFotoAlbums(locals.cmsFetch);
    return { albums: docs };
}
