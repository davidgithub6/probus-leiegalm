import { fetchPage } from '$lib/api.js';
import { lexicalToHtml } from '$lib/lexical.js';

export async function load({ locals }) {
    const page = await fetchPage('huisreglement', locals.cmsFetch);
    return {
        titel: page?.titel ?? 'Huisreglement',
        inhoudHtml: lexicalToHtml(page?.inhoud),
    };
}
