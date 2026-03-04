import { fetchCollection } from '$lib/api.js';

export async function load({ locals }) {
    const data = await fetchCollection('verslagen', {
        sort: '-werkjaar,-maand',
        limit: 200,
    }, locals.cmsFetch);

    // Group by werkjaar
    const byYear = {};
    for (const verslag of data.docs ?? []) {
        const year = verslag.werkjaar ?? 'Onbekend';
        if (!byYear[year]) byYear[year] = [];
        byYear[year].push(verslag);
    }

    const years = Object.keys(byYear).sort((a, b) => b - a);

    return { byYear, years };
}
