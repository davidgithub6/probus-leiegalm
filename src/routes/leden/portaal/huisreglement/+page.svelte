<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Huisreglement — Probus LEIEGALM</title>
</svelte:head>

<div class="page">
    <h1>{data.titel}</h1>

    {#if data.inhoudHtml}
        <div class="inhoud prose">
            {@html data.inhoudHtml}
        </div>
    {:else}
        <p class="empty">Het huisreglement is nog niet beschikbaar.</p>
    {/if}
</div>

<style>
    .page {
        max-width: 700px;
    }

    .page h1 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        color: var(--accent);
        margin-bottom: var(--sp-lg);
    }

    .empty {
        color: var(--text-muted);
    }

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
