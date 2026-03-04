import { fetchUpcomingEvents } from '$lib/api.js';

export async function load({ locals }) {
    const docs = await fetchUpcomingEvents(3, locals.cmsFetch);
    return { agenda: docs };
}
