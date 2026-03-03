import { fetchEventsByYear } from '$lib/api.js';

export async function load() {
    const year = new Date().getFullYear();
    const docs = await fetchEventsByYear(year);
    return { events: docs };
}
