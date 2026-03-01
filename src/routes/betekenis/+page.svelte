<svelte:head>
    <title>Betekenis — Probus LEIEGALM</title>
    <meta
        name="description"
        content="Wat is Probus? De betekenis en missie van onze club voor gepensioneerde professionals in Menen-Wevelgem."
    />
</svelte:head>

<article class="page-hero">
    <div class="container">
        <span class="label">Visie & Missie</span>
        <h1>Betekenis van Probus</h1>
        <span class="gold-rule"></span>
        <p class="subtitle">
            Probus — een acroniem voor <strong>Pro</strong>fessional en
            <strong>Bus</strong>iness — is een wereldwijde beweging van clubs
            voor gepensioneerde professionals.
        </p>
    </div>
</article>

<section class="body-section container">
    <div class="two-col">
        <div class="prose">
            <h2>Wat is Probus?</h2>
            <p>
                Een Probus-club bringt gepensioneerden samen die gedurende hun
                carrière een verantwoordelijke functie hebben bekleed in de
                academische, artistieke, politieke, commerciële of industriële
                wereld.
            </p>
            <p>
                In tegenstelling tot serviceclubs (zoals Rotary of Lions) heeft
                Probus
                <em>geen</em> filantropische of fondsenwervende doelstellingen. De
                focus ligt volledig op de onderlinge band en persoonlijke verrijking
                van de leden.
            </p>
            <h2>Onze waarden</h2>
            <ul class="value-list">
                <li>
                    <span class="bullet">I.</span>
                    <div>
                        <strong>Vriendschap</strong><br />
                        Het leggen en koesteren van oprechte banden tussen mensen
                        met gedeelde ervaringen.
                    </div>
                </li>
                <li>
                    <span class="bullet">II.</span>
                    <div>
                        <strong>Intellectuele stimulans</strong><br />
                        Lezingen, bezoeken en discussies die de geest scherp houden.
                    </div>
                </li>
                <li>
                    <span class="bullet">III.</span>
                    <div>
                        <strong>Tolerantie & Respect</strong><br />
                        Een omgeving vrij van politieke, religieuze of commerciële
                        discussies.
                    </div>
                </li>
            </ul>
        </div>

        <div class="callout-block">
            <span class="label">Het Charter</span>
            <blockquote>
                "De essentie van Probus is de ontmoeting tussen gelijken in een
                sfeer van vriendschap, tolerantie en wederzijds respect."
            </blockquote>
            <div class="char-divider"></div>
            <p class="small-note">
                Probus Belgium werd gesticht in 1962 en telt vandaag honderden
                clubs verspreid over heel België.
            </p>
            <a
                href="https://www.probusbelgium.be"
                target="_blank"
                rel="noopener"
                class="btn-outline"
            >
                Probus Belgium →
            </a>
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

    .body-section {
        padding: var(--sp-xl) 0;
    }

    .two-col {
        display: grid;
        grid-template-columns: 1fr 360px;
        gap: var(--sp-xl);
        align-items: start;
    }

    .prose h2 {
        font-size: 1.5rem;
        margin: var(--sp-md) 0 0.75rem;
        color: var(--accent);
    }

    .prose p {
        color: var(--text-muted);
        line-height: 1.8;
        margin-bottom: 1rem;
    }

    .value-list {
        display: flex;
        flex-direction: column;
        gap: var(--sp-sm);
        margin-top: var(--sp-sm);
    }

    .value-list li {
        display: flex;
        gap: var(--sp-sm);
        align-items: start;
        padding-left: 0;
    }

    .bullet {
        font-family: var(--font-serif);
        font-size: 1.1rem;
        color: var(--accent-gold);
        min-width: 2rem;
        margin-top: 2px;
    }

    .value-list strong {
        color: var(--text);
    }
    .value-list div {
        font-size: 0.9rem;
        color: var(--text-muted);
        line-height: 1.6;
    }

    /* Callout */
    .callout-block {
        background: var(--accent);
        color: rgba(255, 255, 255, 0.85);
        padding: var(--sp-lg);
        position: sticky;
        top: 90px;
    }

    .callout-block .label {
        color: var(--accent-gold);
        margin-bottom: var(--sp-sm);
    }

    .callout-block blockquote {
        font-family: var(--font-serif);
        font-size: 1.15rem;
        font-style: italic;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: var(--sp-md);
    }

    .char-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.15);
        margin: var(--sp-sm) 0;
    }

    .small-note {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: var(--sp-md);
        line-height: 1.6;
    }

    .callout-block .btn-outline {
        border-color: rgba(255, 255, 255, 0.4);
        color: rgba(255, 255, 255, 0.9);
    }

    .callout-block .btn-outline:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    @media (max-width: 820px) {
        .two-col {
            grid-template-columns: 1fr;
        }
        .callout-block {
            position: static;
        }
    }
</style>
