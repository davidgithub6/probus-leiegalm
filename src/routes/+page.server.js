import { fetchUpcomingEvents, fetchPage } from '$lib/api.js';

export async function load({ locals }) {
    const [agenda, page] = await Promise.all([
        fetchUpcomingEvents(3, locals.cmsFetch),
        fetchPage('homepage', locals.cmsFetch),
    ]);
    return { agenda, heroTekst: page?.heroTekst ?? null };
}
