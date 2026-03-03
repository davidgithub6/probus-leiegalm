import { fetchFotoAlbums } from '$lib/api.js';

export async function load() {
    const docs = await fetchFotoAlbums();
    return { albums: docs };
}
