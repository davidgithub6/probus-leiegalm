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

<section class="hymne-section container">
    <div class="two-col">
        <div class="lyrics-block">
            <div class="verse">
                <span class="verse-label">1</span>
                <p>
                    Waar de Leie zachtjes stroomt,<br />
                    En het hart van vriendschap droomt,<br />
                    Daar weerklinkt ons hoogste lied,<br />
                    Dat ons hart en ziel gebiedt.
                </p>
            </div>

            <div class="refrain">
                <span class="verse-label refrain-label">Refrein</span>
                <p>
                    Leiegalm, o Leiegalm,<br />
                    In de wind een zachte psalm.<br />
                    Probus bindt ons hand in hand,<br />
                    In dit schone Vlaanderland.
                </p>
            </div>

            <div class="verse">
                <span class="verse-label">2</span>
                <p>
                    Kennis, wijsheid, diep respect,<br />
                    In ons midden opgewekt.<br />
                    Gisteren is voorbijgegaan,<br />
                    Morgen komt met nieuwe glans.
                </p>
            </div>

            <div class="refrain">
                <span class="verse-label refrain-label">Refrein</span>
                <p>
                    Leiegalm, o Leiegalm,<br />
                    In de wind een zachte psalm.<br />
                    Probus bindt ons hand in hand,<br />
                    In dit schone Vlaanderland.
                </p>
            </div>

            <div class="verse">
                <span class="verse-label">3</span>
                <p>
                    Als de avond daalt en rust,<br />
                    Probus-geest ons hart bewust,<br />
                    Samen oud maar immer jong,<br />
                    Klinkt opnieuw ons trouwe zong.
                </p>
            </div>
        </div>

        <div class="note-visual" aria-hidden="true">
            <svg
                viewBox="0 0 200 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <!-- Staff lines -->
                {#each [60, 90, 120, 150, 180] as y}
                    <line
                        x1="20"
                        y1={y}
                        x2="180"
                        y2={y}
                        stroke="#1b3a5c"
                        stroke-width="1.5"
                        opacity=".25"
                    />
                {/each}
                <!-- Treble clef approximation -->
                <path
                    d="M80 30 C100 10 120 40 100 80 C120 100 90 140 80 160 C70 180 78 200 90 200 C110 200 118 180 100 170"
                    stroke="#b8922a"
                    stroke-width="2.5"
                    fill="none"
                    opacity=".7"
                />
                <!-- Note heads -->
                <ellipse
                    cx="130"
                    cy="90"
                    rx="10"
                    ry="7"
                    fill="#1b3a5c"
                    opacity=".3"
                    transform="rotate(-18 130 90)"
                />
                <ellipse
                    cx="155"
                    cy="75"
                    rx="10"
                    ry="7"
                    fill="#1b3a5c"
                    opacity=".3"
                    transform="rotate(-18 155 75)"
                />
                <ellipse
                    cx="110"
                    cy="120"
                    rx="10"
                    ry="7"
                    fill="#b8922a"
                    opacity=".5"
                    transform="rotate(-18 110 120)"
                />
                <!-- Stems -->
                <line
                    x1="140"
                    y1="90"
                    x2="140"
                    y2="50"
                    stroke="#1b3a5c"
                    stroke-width="1.5"
                    opacity=".3"
                />
                <line
                    x1="165"
                    y1="75"
                    x2="165"
                    y2="35"
                    stroke="#1b3a5c"
                    stroke-width="1.5"
                    opacity=".3"
                />
                <line
                    x1="120"
                    y1="120"
                    x2="120"
                    y2="80"
                    stroke="#b8922a"
                    stroke-width="1.5"
                    opacity=".5"
                />
            </svg>
        </div>
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

    .hymne-section {
        padding: var(--sp-xl) 0;
    }

    .two-col {
        display: grid;
        grid-template-columns: 1fr 220px;
        gap: var(--sp-xl);
        align-items: start;
    }

    .lyrics-block {
        display: flex;
        flex-direction: column;
        gap: var(--sp-md);
    }

    .verse,
    .refrain {
        display: grid;
        grid-template-columns: 24px 1fr;
        gap: var(--sp-md);
        align-items: start;
    }

    .verse-label {
        font-family: var(--font-serif);
        font-size: 1rem;
        color: var(--accent-gold);
        font-weight: 600;
        padding-top: 0.2rem;
    }

    .refrain {
        background: var(--surface);
        border-left: 3px solid var(--accent-gold);
        padding: var(--sp-sm) var(--sp-sm) var(--sp-sm) var(--sp-md);
    }

    .refrain-label {
        font-size: 0.7rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }

    .verse p,
    .refrain p {
        font-family: var(--font-serif);
        font-size: 1.2rem;
        line-height: 1.9;
        color: var(--text);
    }

    .refrain p {
        color: var(--accent);
        font-style: italic;
    }

    .note-visual {
        position: sticky;
        top: 90px;
        opacity: 0.6;
    }

    .note-visual svg {
        width: 100%;
    }

    @media (max-width: 640px) {
        .two-col {
            grid-template-columns: 1fr;
        }
        .note-visual {
            display: none;
        }
    }
</style>
