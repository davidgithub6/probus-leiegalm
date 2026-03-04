<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const MAANDEN = ['', 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
        'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
</script>

<svelte:head>
    <title>Verslagen — Probus LEIEGALM</title>
</svelte:head>

<div class="page">
    <h1>Verslagen</h1>

    {#if data.years.length === 0}
        <p class="empty">Nog geen verslagen beschikbaar.</p>
    {:else}
        {#each data.years as year}
            <section class="year-group">
                <h2 class="year-heading">Werkjaar {year}–{Number(year) + 1}</h2>
                <ul class="verslag-list">
                    {#each data.byYear[year] as v}
                        <li>
                            <a href="/leden/portaal/verslagen/{v.id}" class="verslag-row">
                                <span class="maand">{MAANDEN[Number(v.maand)] ?? v.maand}</span>
                                {#if v.bijlage}
                                    <span class="badge">PDF</span>
                                {/if}
                            </a>
                        </li>
                    {/each}
                </ul>
            </section>
        {/each}
    {/if}
</div>

<style>
    .page h1 {
        font-family: var(--font-serif);
        font-size: 1.8rem;
        color: var(--accent);
        margin-bottom: var(--sp-lg);
    }

    .empty {
        color: var(--text-muted);
    }

    .year-group {
        margin-bottom: var(--sp-lg);
    }

    .year-heading {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 0.5rem;
        padding-bottom: 0.35rem;
        border-bottom: 1px solid var(--border);
    }

    .verslag-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .verslag-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.6rem var(--sp-sm);
        background: var(--surface);
        border: 1px solid var(--border);
        text-decoration: none;
        font-size: 0.9rem;
        color: var(--text);
        transition: border-color var(--dur), background var(--dur);
    }

    .verslag-row:hover {
        border-color: var(--accent);
        background: var(--surface-alt);
    }

    .maand {
        flex: 1;
    }

    .badge {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        background: var(--accent);
        color: #fff;
        padding: 0.15rem 0.4rem;
    }
</style>
