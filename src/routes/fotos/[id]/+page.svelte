<script>
    export let data;

    const { album } = data;
    const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];

    const d = new Date(album.datum);
    const datumLabel = `${MAANDEN[d.getUTCMonth()].charAt(0).toUpperCase() + MAANDEN[d.getUTCMonth()].slice(1)} ${d.getUTCFullYear()}`;

    let lightboxSrc = null;
    let lightboxAlt = '';
    let lightboxIndex = 0;

    function openLightbox(i) {
        lightboxIndex = i;
        lightboxSrc = album.fotos[i].url;
        lightboxAlt = album.fotos[i].alt;
    }

    function closeLightbox() {
        lightboxSrc = null;
    }

    function prev() {
        lightboxIndex = (lightboxIndex - 1 + album.fotos.length) % album.fotos.length;
        lightboxSrc = album.fotos[lightboxIndex].url;
        lightboxAlt = album.fotos[lightboxIndex].alt;
    }

    function next() {
        lightboxIndex = (lightboxIndex + 1) % album.fotos.length;
        lightboxSrc = album.fotos[lightboxIndex].url;
        lightboxAlt = album.fotos[lightboxIndex].alt;
    }

    function onKeydown(e) {
        if (!lightboxSrc) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    }
</script>

<svelte:window on:keydown={onKeydown} />

<svelte:head>
    <title>{album.titel} — Foto's — Probus LEIEGALM</title>
</svelte:head>

<article class="page-hero">
    {#if album.coverUrl}
        <div class="hero-img-wrap">
            <img src={album.coverUrl} alt={album.titel} class="hero-img" />
            <div class="hero-overlay"></div>
        </div>
    {/if}
    <div class="container hero-content">
        <a href="/fotos" class="back-link">← Terug naar galerij</a>
        <span class="label">{datumLabel}</span>
        <h1>{album.titel}</h1>
        <span class="gold-rule"></span>
        <p class="subtitle">{album.fotos.length} foto's</p>
    </div>
</article>

<section class="container photo-section">
    {#if album.fotos.length === 0}
        <p class="empty">Nog geen foto's in dit album.</p>
    {:else}
        <div class="photo-grid">
            {#each album.fotos as foto, i}
                <button class="photo-btn" on:click={() => openLightbox(i)} title={foto.beschrijving || foto.alt}>
                    <img src={foto.url} alt={foto.alt} class="thumb" loading="lazy" />
                    {#if foto.beschrijving}
                        <span class="photo-caption">{foto.beschrijving}</span>
                    {/if}
                </button>
            {/each}
        </div>
    {/if}
</section>

<!-- Lightbox -->
{#if lightboxSrc}
    <div class="lightbox" role="dialog" aria-modal="true" aria-label={lightboxAlt}>
        <button class="lb-close" on:click={closeLightbox} aria-label="Sluiten">✕</button>
        <button class="lb-nav lb-prev" on:click={prev} aria-label="Vorige">‹</button>
        <div class="lb-img-wrap" on:click={closeLightbox}>
            <img
                src={lightboxSrc}
                alt={lightboxAlt}
                class="lb-img"
                on:click|stopPropagation
            />
        </div>
        <button class="lb-nav lb-next" on:click={next} aria-label="Volgende">›</button>
        <div class="lb-counter">{lightboxIndex + 1} / {album.fotos.length}</div>
    </div>
{/if}

<style>
    .page-hero {
        position: relative;
        padding: var(--sp-xl) 0 var(--sp-lg);
        border-bottom: 1px solid var(--border);
    }

    .hero-img-wrap {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: 0;
    }

    .hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 30%;
        filter: brightness(0.35);
    }

    .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 40%, rgba(10,20,40,0.6));
    }

    .hero-content {
        position: relative;
        z-index: 1;
    }

    .page-hero h1 {
        font-size: clamp(2rem, 4vw, 3.2rem);
        margin: 0.5rem 0 var(--sp-sm);
        color: var(--accent);
    }

    .hero-img-wrap ~ .hero-content h1 {
        color: #fff;
    }

    .hero-img-wrap ~ .hero-content .label,
    .hero-img-wrap ~ .hero-content .subtitle {
        color: rgba(255,255,255,0.75);
    }

    .back-link {
        display: inline-block;
        font-size: 0.85rem;
        color: var(--accent-gold);
        text-decoration: none;
        margin-bottom: var(--sp-sm);
        letter-spacing: 0.04em;
    }

    .back-link:hover {
        text-decoration: underline;
    }

    .subtitle {
        font-size: 1rem;
        color: var(--text-muted);
    }

    .photo-section {
        padding: var(--sp-xl) 0;
    }

    .empty {
        color: var(--text-muted);
        font-style: italic;
    }

    .photo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: var(--sp-sm);
    }

    .photo-btn {
        all: unset;
        cursor: pointer;
        display: block;
        position: relative;
        overflow: hidden;
        aspect-ratio: 4 / 3;
        background: var(--surface);
        border: 1px solid var(--border);
    }

    .photo-btn:hover .thumb {
        transform: scale(1.05);
    }

    .photo-btn:hover .photo-caption {
        opacity: 1;
    }

    .thumb {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s var(--ease);
    }

    .photo-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 6px 10px;
        background: rgba(0,0,0,0.55);
        color: #fff;
        font-size: 0.75rem;
        line-height: 1.3;
        opacity: 0;
        transition: opacity 0.2s;
    }

    /* Lightbox */
    .lightbox {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(0,0,0,0.92);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lb-img-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 60px 80px;
        cursor: zoom-out;
        max-height: 100vh;
    }

    .lb-img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        cursor: default;
        box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    }

    .lb-close {
        position: absolute;
        top: 16px;
        right: 20px;
        background: none;
        border: none;
        color: #fff;
        font-size: 1.6rem;
        cursor: pointer;
        opacity: 0.7;
        line-height: 1;
        padding: 4px 8px;
    }

    .lb-close:hover { opacity: 1; }

    .lb-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #fff;
        font-size: 3rem;
        cursor: pointer;
        opacity: 0.5;
        padding: 0 20px;
        line-height: 1;
        user-select: none;
    }

    .lb-nav:hover { opacity: 1; }
    .lb-prev { left: 0; }
    .lb-next { right: 0; }

    .lb-counter {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255,255,255,0.6);
        font-size: 0.8rem;
        letter-spacing: 0.05em;
    }
</style>
