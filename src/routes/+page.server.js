import { fetchUpcomingEvents } from '$lib/api.js';

export async function load() {
    const docs = await fetchUpcomingEvents(3);
    return { agenda: docs };
}
