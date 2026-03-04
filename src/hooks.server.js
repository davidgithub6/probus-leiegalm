/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cms = event.platform?.env?.CMS;
    event.locals.cmsFetch = cms
        ? (url, opts) => cms.fetch(url, opts)
        : globalThis.fetch;
    return resolve(event);
}
