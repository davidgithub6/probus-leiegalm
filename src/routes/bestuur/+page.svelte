<script>
    export let data;
</script>

<svelte:head>
    <title>Bestuur — Probus LEIEGALM</title>
    <meta
        name="description"
        content="Het bestuur van Probus LEIEGALM Menen-Wevelgem."
    />
</svelte:head>

<article class="page-hero">
    <div class="container">
        <span class="label">Governance</span>
        <h1>Het Bestuur</h1>
        <span class="gold-rule"></span>
        <p class="subtitle">De leden die onze club leiden en samenbrengen.</p>
    </div>
</article>

<section class="container board-section">
    <div class="board-grid">
        {#each data.bestuursleden as m}
            <div class="board-card">
                <div class="photo-wrap">
                    {#if m.fotoUrl}
                        <img
                            src={m.fotoUrl}
                            alt={m.naam}
                            class="photo"
                            style={m.fotoUrl && m.foto?.focalX != null
                                ? `object-position: ${m.foto.focalX}% ${m.foto.focalY}%`
                                : "object-position: center 15%"}
                        />
                    {:else}
                        <div class="photo-placeholder" aria-hidden="true">
                            <svg viewBox="0 0 80 80" fill="none">
                                <circle
                                    cx="40"
                                    cy="32"
                                    r="16"
                                    stroke="var(--accent)"
                                    stroke-width="1.2"
                                    opacity=".4"
                                />
                                <path
                                    d="M10 75 Q40 55 70 75"
                                    stroke="var(--accent)"
                                    stroke-width="1.2"
                                    opacity=".4"
                                    fill="none"
                                />
                                <text
                                    x="40"
                                    y="36"
                                    text-anchor="middle"
                                    dominant-baseline="middle"
                                    fill="var(--accent-gold)"
                                    font-family="Georgia,serif"
                                    font-size="22"
                                    opacity=".8">{m.naam[0]}</text
                                >
                            </svg>
                        </div>
                    {/if}
                </div>
                <div class="member-info">
                    <span class="role-label label">{m.functie}</span>
                    <p class="name">{m.naam}</p>
                    {#if m.beschrijving}
                        <p class="desc">{m.beschrijving}</p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <div class="admin-note">
        <p>
            Contacteer ons bestuur via <a href="mailto:secretariaat@leiegalm.be"
                >secretariaat@leiegalm.be</a
            >
        </p>
    </div>
</section>

<style>
    .page-hero {
        padding: var(--sp-xl) 0 var(--sp-lg);
    }

    .page-hero h1 {
        font-size: clamp(2.2rem, 4vw, 3.5rem);
        margin: 0.5rem 0 var(--sp-sm);
    }
    .subtitle {
        font-size: 1.1rem;
        color: var(--text-muted);
        max-width: 600px;
    }

    .board-section {
        padding: var(--sp-lg) var(--sp-md);
    }

    .board-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--sp-md);
    }

    .board-card {
        background: var(--surface);
        border: 1px solid var(--border);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition:
            transform var(--dur) var(--ease),
            box-shadow var(--dur) var(--ease);
    }

    .board-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
        border-color: var(--accent-gold);
    }

    .photo-wrap {
        width: 100%;
        aspect-ratio: 3 / 4;
        overflow: hidden;
        background: var(--bg);
    }

    .photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .photo-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, var(--accent) 6%, transparent);
    }

    .photo-placeholder svg {
        width: 60%;
        height: 60%;
        opacity: 0.6;
    }

    .member-info {
        padding: var(--sp-sm) var(--sp-md) var(--sp-md);
    }

    .role-label {
        display: block;
        margin-bottom: 0.25rem;
    }

    .name {
        font-family: var(--font-serif);
        font-size: 1.05rem;
        color: var(--accent);
        margin-bottom: 0.25rem;
    }

    .desc {
        font-size: 0.8rem;
        color: var(--text-muted);
        line-height: 1.55;
        margin: 0;
    }

    .admin-note {
        margin-top: var(--sp-lg);
        padding: var(--sp-md);
        border: 1px solid var(--border);
        text-align: center;
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .admin-note a {
        color: var(--accent);
        text-decoration: underline;
    }

    @media (max-width: 480px) {
        .board-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
