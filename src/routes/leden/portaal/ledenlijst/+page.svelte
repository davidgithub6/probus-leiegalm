<script>
    /** @type {import('./').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Ledenlijst — Probus LEIEGALM</title>
</svelte:head>

<div class='page'>
    <div class='page-header'>
        <h1>Ledenlijst</h1>
        {#if data.bijlage?.url}
            <a href={data.bijlage.url} target='_blank' rel='noopener noreferrer' class='btn-pdf' download>
                <svg viewBox='0 0 20 20' fill='currentColor' width='16' height='16' aria-hidden='true'>
                    <path d='M10 2a1 1 0 00-1 1v7.586L6.707 8.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 10.586V3a1 1 0 00-1-1z' />
                    <path d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' />
                </svg>
                Ledenlijst downloaden (PDF)
            </a>
        {/if}
    </div>
    <p class='count'>{data.leden.length} {data.leden.length === 1 ? 'lid' : 'leden'}</p>

    {#if data.leden.length === 0}
        <p class='empty'>Geen leden gevonden.</p>
    {:else}
        <ul class='list'>
            {#each data.leden as lid}
                <li class='item'>
                    <span class='naam'>{lid.naam}</span>
                    <span class='email'>{lid.email}</span>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .page-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: var(--sp-md);
        flex-wrap: wrap;
        margin-bottom: 0.25rem;
    }

    .page-header h1 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        color: var(--accent);
    }

    .btn-pdf {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 1rem;
        background: var(--accent);
        color: #fff;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        text-decoration: none;
        white-space: nowrap;
        transition: background var(--dur) var(--ease);
    }

    .btn-pdf:hover {
        background: #0f2740;
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
