<script>
    export let data;

    const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
    const HUES = [210, 190, 220, 175, 200, 215];

    const albums = data.albums.map((a, i) => {
        const d = new Date(a.datum);
        return {
            id: i + 1,
            title: a.titel,
            date: `${MAANDEN[d.getUTCMonth()].charAt(0).toUpperCase() + MAANDEN[d.getUTCMonth()].slice(1)} ${d.getUTCFullYear()}`,
            count: a.fotos?.length ?? 0,
        };
    });

    function hue(id) {
        return HUES[(id - 1) % HUES.length];
    }
</script>

<svelte:head>
    <title>Foto's — Probus LEIEGALM</title>
    <meta
        name="description"
        content="Foto's van activiteiten van Probus LEIEGALM Menen-Wevelgem."
    />
</svelte:head>

<article class="page-hero">
    <div class="container">
        <span class="label">Archief</span>
        <h1>Foto Galerij</h1>
        <span class="gold-rule"></span>
        <p class="subtitle">
            Herinneringen aan onze activiteiten, bewaard voor leden en vrienden
            van de club.
        </p>
    </div>
</article>

<section class="container gallery-section">
    <div class="album-grid">
        {#each albums as album}
            <a
                href="/leden"
                class="album-card"
                title="Bekijk {album.title} (enkel voor leden)"
            >
                <!-- Procedural cover via inline SVG + gradient -->
                <div
                    class="cover"
                    role="img"
                    aria-label="Album cover: {album.title}"
                >
                    <svg
                        viewBox="0 0 400 260"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient
                                id="grad{album.id}"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stop-color="hsl({hue(album.id)},30%,92%)"
                                />
                                <stop
                                    offset="100%"
                                    stop-color="hsl({hue(album.id)},20%,84%)"
                                />
                            </linearGradient>
                        </defs>
                        <rect
                            width="400"
                            height="260"
                            fill="url(#grad{album.id})"
                        />
                        <!-- dot grid -->
                        {#each Array(8) as _, r}
                            {#each Array(12) as _, c}
                                <circle
                                    cx={c * 38 + 12}
                                    cy={r * 38 + 12}
                                    r="1.5"
                                    fill="hsl({hue(album.id)},25%,65%)"
                                    opacity=".35"
                                />
                            {/each}
                        {/each}
                        <!-- concentric -->
                        {#each [60, 90, 120, 150] as rx}
                            <circle
                                cx="200"
                                cy="130"
                                r={rx}
                                fill="none"
                                stroke="hsl({hue(album.id)},25%,70%)"
                                stroke-width="1"
                                opacity=".4"
                            />
                        {/each}
                        <!-- Count badge -->
                        <text
                            x="50%"
                            y="52%"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            fill="hsl({hue(album.id)},30%,40%)"
                            font-family="Georgia,serif"
                            font-size="40"
                            opacity=".2">{album.count}×</text
                        >
                    </svg>
                    <div class="lock-badge" aria-hidden="true">🔒 Leden</div>
                </div>
                <div class="album-meta">
                    <span class="label"
                        >{album.date} · {album.count} foto's</span
                    >
                    <h2>{album.title}</h2>
                </div>
            </a>
        {/each}
    </div>

    <div class="teaser-note">
        <p>
            Foto's zijn enkel zichtbaar voor ingelogde leden. <a href="/leden"
                >Aanmelden →</a
            >
        </p>
    </div>
</section>

<style>
    .page-hero {
        padding: var(--sp-xl) 0 var(--sp-lg);
        border-bottom: 1px solid var(--border);
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

    .gallery-section {
        padding: var(--sp-xl) 0;
    }

    .album-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--sp-md);
    }

    .album-card {
        background: var(--surface);
        border: 1px solid var(--border);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition:
            transform var(--dur) var(--ease),
            box-shadow var(--dur) var(--ease),
            border-color var(--dur) var(--ease);
    }

    .album-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow);
        border-color: var(--accent-gold);
    }

    .cover {
        position: relative;
        overflow: hidden;
    }

    .cover svg {
        display: block;
        width: 100%;
        height: auto;
        transition: transform 0.4s var(--ease);
    }

    .album-card:hover .cover svg {
        transform: scale(1.04);
    }

    .lock-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(27, 58, 92, 0.85);
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        padding: 3px 8px;
    }

    .album-meta {
        padding: var(--sp-sm) var(--sp-md) var(--sp-md);
    }

    .album-meta .label {
        display: block;
        margin-bottom: 0.3rem;
    }

    .album-meta h2 {
        font-family: var(--font-serif);
        font-size: 1.05rem;
        color: var(--accent);
    }

    .teaser-note {
        margin-top: var(--sp-lg);
        padding: var(--sp-md);
        border: 1px solid var(--border);
        text-align: center;
        font-size: 0.9rem;
        color: var(--text-muted);
    }

    .teaser-note a {
        color: var(--accent);
        text-decoration: underline;
    }
</style>
