/**
 * Payload CMS API client
 * Used by SvelteKit server-side load functions to fetch content from the CMS.
 */

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3000';

/**
 * Fetch documents from a Payload collection.
 * @param {string} collection - Collection slug (e.g. 'evenementen')
 * @param {Record<string, string>} [query] - Query parameters (sort, where, limit, etc.)
 * @param {typeof fetch} [fetcher] - Fetch function; pass Cloudflare service binding in production
 * @returns {Promise<{docs: any[], totalDocs: number, totalPages: number}>}
 */
export async function fetchCollection(collection, query = {}, fetcher = globalThis.fetch) {
    const params = new URLSearchParams(query);
    const res = await fetcher(`${CMS_URL}/api/${collection}?${params}`);
    if (!res.ok) {
        console.error(`CMS fetch failed for ${collection}: ${res.status}`);
        return { docs: [], totalDocs: 0, totalPages: 0 };
    }
    return res.json();
}

/**
 * Fetch a single document by ID from a Payload collection.
 * @param {string} collection - Collection slug
 * @param {string} id - Document ID
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<any|null>}
 */
export async function fetchDocument(collection, id, fetcher = globalThis.fetch) {
    const res = await fetcher(`${CMS_URL}/api/${collection}/${id}`);
    if (!res.ok) return null;
    return res.json();
}

/**
 * Fetch a page by slug from the Paginas collection.
 * @param {string} slug - Page slug (e.g. 'homepage', 'betekenis')
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<any|null>}
 */
export async function fetchPage(slug, fetcher = globalThis.fetch) {
    const data = await fetchCollection('paginas', {
        'where[slug][equals]': slug,
        limit: '1',
    }, fetcher);
    return data.docs?.[0] || null;
}

/**
 * Fetch upcoming events sorted by date.
 * @param {number} [limit=50] - Maximum number of events
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<any[]>}
 */
export async function fetchUpcomingEvents(limit = 50, fetcher = globalThis.fetch) {
    const now = new Date().toISOString();
    const data = await fetchCollection('evenementen', {
        'where[datum][greater_than_equal]': now,
        sort: 'datum',
        limit: String(limit),
    }, fetcher);
    return data.docs || [];
}

/**
 * Fetch all events for a given year.
 * @param {number} year
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<any[]>}
 */
export async function fetchEventsByYear(year, fetcher = globalThis.fetch) {
    const data = await fetchCollection('evenementen', {
        'where[datum][greater_than_equal]': `${year}-01-01T00:00:00.000Z`,
        'where[datum][less_than]': `${year + 1}-01-01T00:00:00.000Z`,
        sort: 'datum',
        limit: '100',
    }, fetcher);
    return data.docs || [];
}

/**
 * Fetch board members sorted by volgorde.
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<any[]>}
 */
export async function fetchBestuursleden(fetcher = globalThis.fetch) {
    const data = await fetchCollection('bestuursleden', {
        sort: 'volgorde',
        limit: '20',
    }, fetcher);
    return data.docs || [];
}

/**
 * Fetch foto albums.
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<any[]>}
 */
export async function fetchFotoAlbums(fetcher = globalThis.fetch) {
    const data = await fetchCollection('fotoalbums', {
        sort: '-datum',
        limit: '50',
        depth: '1',
    }, fetcher);
    return data.docs || [];
}
