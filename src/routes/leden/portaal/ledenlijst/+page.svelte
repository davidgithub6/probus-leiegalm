<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Ledenlijst — Probus LEIEGALM</title>
</svelte:head>

<div class="page">
    <h1>Ledenlijst</h1>
    <p class="count">{data.leden.length} {data.leden.length === 1 ? 'lid' : 'leden'}</p>

    {#if data.leden.length === 0}
        <p class="empty">Geen leden gevonden.</p>
    {:else}
        <ul class="list">
            {#each data.leden as lid}
                <li class="item">
                    <span class="naam">{lid.naam}</span>
                    <span class="email">{lid.email}</span>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .page h1 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        color: var(--accent);
        margin-bottom: 0.25rem;
    }

    .count {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: var(--sp-lg);
    }

    .empty {
        color: var(--text-muted);
    }

    .list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-width: 600px;
    }

    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.6rem var(--sp-sm);
        background: var(--surface);
        border: 1px solid var(--border);
        font-size: 0.9rem;
    }

    .naam {
        font-weight: 600;
        color: var(--text);
    }

    .email {
        color: var(--text-muted);
        font-size: 0.82rem;
    }
</style>
