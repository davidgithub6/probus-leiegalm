<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Wie is wie — Probus LEIEGALM</title>
</svelte:head>

<div class="page">
    <h1>Wie is wie</h1>

    {#if data.personen.length === 0}
        <p class="empty">Nog geen profielen beschikbaar.</p>
    {:else}
        <div class="grid">
            {#each data.personen as persoon}
                <div class="card">
                    <div class="photo-wrap">
                        {#if persoon.foto?.url}
                            <img
                                src={persoon.foto.url}
                                alt={persoon.naam}
                                loading="lazy"
                            />
                        {:else}
                            <div class="photo-placeholder" aria-hidden="true">
                                <svg viewBox="0 0 60 60" fill="none" width="40" height="40">
                                    <circle cx="30" cy="22" r="12" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M6 54c0-13.25 10.75-24 24-24s24 10.75 24 24" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </div>
                        {/if}
                    </div>
                    <div class="card-body">
                        <h2 class="naam">{persoon.naam}</h2>
                        {#if persoon.omschrijving}
                            <p class="omschrijving">{persoon.omschrijving}</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
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

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--sp-md);
    }

    .card {
        background: var(--surface);
        border: 1px solid var(--border);
        overflow: hidden;
    }

    .photo-wrap {
        aspect-ratio: 3 / 4;
        background: var(--surface-alt);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .photo-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
    }

    .photo-placeholder {
        color: var(--border);
    }

    .card-body {
        padding: var(--sp-sm) var(--sp-md);
    }

    .naam {
        font-family: var(--font-serif);
        font-size: 1rem;
        color: var(--accent);
        margin-bottom: 0.3rem;
    }

    .omschrijving {
        font-size: 0.82rem;
        color: var(--text-muted);
        line-height: 1.5;
    }
</style>
