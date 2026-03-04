import { fetchCollection, absoluteUrl } from '$lib/api.js';

export async function load({ platform, locals }) {
    const db = platform?.env?.DB;
    const [ledenResult, pageData] = await Promise.all([
        db
            ? db.prepare('SELECT naam, email, created_at FROM leden_accounts ORDER BY naam ASC').all()
            : Promise.resolve({ results: [] }),
        fetchCollection('paginas', {
            'where[slug][equals]': 'ledenlijst',
            limit: '1',
            depth: '1',
        }, locals.cmsFetch),
    ]);

    const page = pageData.docs?.[0] ?? null;

    return {
        leden: ledenResult.results ?? [],
        bijlage: page?.bijlage ? { ...page.bijlage, url: absoluteUrl(page.bijlage.url) } : null,
    };
}
