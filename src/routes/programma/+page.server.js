import { fetchEventsByYear } from '$lib/api.js';

export async function load({ locals }) {
    const year = new Date().getFullYear();
    const docs = await fetchEventsByYear(year, locals.cmsFetch);
    return { events: docs };
}
