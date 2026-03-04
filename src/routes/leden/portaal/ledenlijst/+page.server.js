export async function load({ platform }) {
    const db = platform?.env?.DB;
    if (!db) return { leden: [] };

    const result = await db.prepare(
        'SELECT naam, email, created_at FROM leden_accounts ORDER BY naam ASC'
    ).all();

    return { leden: result.results ?? [] };
}
