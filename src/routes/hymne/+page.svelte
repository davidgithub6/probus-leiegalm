<svelte:head>
    <title>Hymne — Probus LEIEGALM</title>
    <meta
        name="description"
        content="De hymne Leiegalm van Probus LEIEGALM Menen-Wevelgem."
    />
</svelte:head>

<article class="page-hero">
    <div class="container">
        <span class="label">Clublied</span>
        <h1>Hymne: <em>Leiegalm</em></h1>
        <span class="gold-rule"></span>
        <p class="subtitle">
            Het lied dat onze club haar naam gaf — een ode aan de Leie en aan de
            vriendschap.
        </p>
    </div>
</article>

<div class="photo-banner container">
    <figure class="koor-figure">
        <img
            src="/koor.jpg"
            alt="Probus Leiegalm zingt de hymne"
            class="koor-photo"
        />
        <figcaption>Probus Leiegalm zingt de hymne</figcaption>
    </figure>
</div>

<section class="hymne-section container">
    <div class="verses-grid">
        <div class="verse">
            <span class="verse-label">1</span>
            <p>
                Langsheen de Leieboorden,<br />
                daar is het leven tof.<br />
                Daar komen Probus-leden<br />
                te saam in 't Vijverhof.<br />
                Hier aan de dis gezeten,<br />
                met open hart en geest,<br />
                bekijken zij het leven:<br />
                Hoe schoon het is geweest.
            </p>
        </div>

        <div class="verse">
            <span class="verse-label">2</span>
            <p>
                Hier wordt getoast op 't heden,<br />
                op vriendschap en begrip,<br />
                problemen aangesneden:<br />
                Europa op ons lip.<br />
                Wij zijn de post-actieven,<br />
                wij maken 't land niet rijk.<br />
                Wij werken naar believen,<br />
                doch met gebrek aan tijd!
            </p>
        </div>

        <div class="verse">
            <span class="verse-label">3</span>
            <p>
                De toekomst baart ons zorgen:<br />
                de aard' is in gevaar.<br />
                De kinderen van morgen,<br />
                wie heeft nog werk en waar?<br />
                Maar ons geloof in het leven<br />
                vieren wij hier te gaar.<br />
                Kom, laten wij dan geven<br />
                een heildronk op elkaar!
            </p>
        </div>
    </div>

    <p class="credit">
        Oorspronkelijke tekst: <em>De winter is vergangen</em> (XV eeuw)<br />
        Tekstbewerking voor Probus-senioren: Fr. Top-Torck (2005)
    </p>
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

    /* Full-width photo */
    .photo-banner {
        padding-top: var(--sp-lg);
    }
    .koor-figure {
        margin: 0;
    }
    .koor-photo {
        width: 100%;
        height: auto;
        display: block;
        border: 1px solid var(--border);
    }
    figcaption {
        font-size: 0.72rem;
        color: var(--text-muted);
        margin-top: 0.5rem;
        letter-spacing: 0.04em;
    }

    /* Lyrics */
    .hymne-section {
        padding: var(--sp-lg) var(--sp-md);
    }
    .verses-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--sp-xl);
        align-items: start;
    }
    .verse {
        display: grid;
        grid-template-columns: 24px 1fr;
        gap: var(--sp-sm);
        align-items: start;
    }
    .verse-label {
        font-family: var(--font-serif);
        font-size: 1rem;
        color: var(--accent-gold);
        font-weight: 600;
        padding-top: 0.25rem;
    }
    .verse p {
        font-family: var(--font-serif);
        font-size: 1.1rem;
        line-height: 2;
        color: var(--text);
    }
    .credit {
        font-size: 0.8rem;
        color: var(--text-muted);
        border-top: 1px solid var(--border);
        padding-top: var(--sp-md);
        margin-top: var(--sp-md);
        line-height: 1.7;
    }

    @media (max-width: 760px) {
        .verses-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-lg);
        }
    }
</style>
