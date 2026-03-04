<script>
    import { lexicalToHtml } from '$lib/lexical.js';

    /** @type {import('./$types').PageData} */
    export let data;

    const MAANDEN = ['', 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

    const v = data.verslag;
    const titel = `${MAANDEN[Number(v.maand)] ?? v.maand} ${v.werkjaar}`;
    const inhoudHtml = lexicalToHtml(v.inhoud);
</script>

<svelte:head>
    <title>{titel} — Verslagen — Probus LEIEGALM</title>
</svelte:head>

<div class="verslag-page">
    <nav class="breadcrumb">
        <a href="/leden/portaal/verslagen">← Verslagen</a>
    </nav>

    <h1>{titel}</h1>

    {#if v.bijlage?.url}
        <a href={v.bijlage.url} class="pdf-link" target="_blank" rel="noopener">
            PDF downloaden
        </a>
    {/if}

    {#if inhoudHtml}
        <div class="inhoud prose">
            {@html inhoudHtml}
        </div>
    {:else}
        <p class="empty">Geen inhoud beschikbaar voor dit verslag.</p>
    {/if}
</div>

<style>
    .verslag-page {
        max-width: 700px;
    }

    .breadcrumb {
        margin-bottom: var(--sp-md);
    }

    .breadcrumb a {
        font-size: 0.82rem;
        color: var(--text-muted);
        text-decoration: none;
    }

    .breadcrumb a:hover {
        color: var(--accent);
    }

    h1 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        color: var(--accent);
        margin-bottom: var(--sp-md);
    }

    .pdf-link {
        display: inline-block;
        margin-bottom: var(--sp-md);
        padding: 0.5rem 1rem;
        background: var(--accent);
        color: #fff;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        text-decoration: none;
        transition: background var(--dur);
    }

    .pdf-link:hover {
        background: #0f2740;
    }

    .empty {
        color: var(--text-muted);
    }

    /* Prose styles */
    .prose :global(p) {
        margin-bottom: 0.9em;
        line-height: 1.7;
    }
    .prose :global(h2),
    .prose :global(h3) {
        font-family: var(--font-serif);
        color: var(--accent);
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }
    .prose :global(ul),
    .prose :global(ol) {
        padding-left: 1.5em;
        margin-bottom: 0.9em;
    }
    .prose :global(li) {
        margin-bottom: 0.3em;
        line-height: 1.6;
    }
    .prose :global(a) {
        color: var(--accent);
    }
    .prose :global(strong) {
        font-weight: 700;
    }
    .prose :global(blockquote) {
        border-left: 3px solid var(--border);
        margin-left: 0;
        padding-left: 1rem;
        color: var(--text-muted);
        font-style: italic;
    }
    .prose :global(hr) {
        border: none;
        border-top: 1px solid var(--border);
        margin: 1.5em 0;
    }
</style>
