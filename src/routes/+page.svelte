<script>
    import HeroVisual from "$lib/components/HeroVisual.svelte";

    export let data;

    const highlights = [
        {
            label: "Opgericht",
            value: "1997",
            desc: "Onze club brengt al bijna 30 jaar gepensioneerde professionals samen.",
        },
        {
            label: "Clublokaal",
            value: "Vijverhof",
            desc: "Maandelijkse bijeenkomsten in Restaurant Vijverhof te Wevelgem.",
        },
        {
            label: "Missie",
            value: "Probus",
            desc: "Vriendschap en intellectuele stimulans als hoeksteen van onze vereniging.",
        },
    ];

    const MONTHS = ['JAN','FEB','MRT','APR','MEI','JUN','JUL','AUG','SEP','OKT','NOV','DEC'];

    const agenda = data.agenda.map(ev => {
        const d = new Date(ev.datum);
        return {
            day: String(d.getUTCDate()).padStart(2, '0'),
            month: MONTHS[d.getUTCMonth()],
            title: ev.titel,
            loc: ev.locatie,
        };
    });
</script>

<svelte:head>
    <title>Probus LEIEGALM — Menen-Wevelgem</title>
    <meta
        name="description"
        content="Probus LEIEGALM is een Belgische Probus-club voor gepensioneerde professionals in de regio Menen-Wevelgem. Vriendschap en intellectuele stimulans."
    />
</svelte:head>

<!-- ── HERO ───────────────────────────────────────────────── -->
<section class="hero">
    <div class="container hero-grid">
        <div class="hero-text">
            <span class="eyebrow label">Est. 1997 · Menen-Wevelgem</span>
            <h1>Probus<br /><em>Leiegalm</em></h1>
            <span class="gold-rule"></span>
            <p class="lead">
                Een kring van gepensioneerde professionals gebonden door
                vriendschap, intellectuele nieuwsgierigheid en gedeelde
                levenservaring.
            </p>
            <div class="hero-cta">
                <a href="/betekenis" class="btn-primary">Meer over Probus</a>
                <a href="/programma" class="btn-outline">Programma 2026</a>
            </div>
        </div>
        <div class="hero-visual">
            <HeroVisual />
        </div>
    </div>
</section>

<hr class="divider container" />

<!-- ── HIGHLIGHTS ─────────────────────────────────────────── -->
<section class="highlights container">
    {#each highlights as h}
        <div class="card">
            <span class="label">{h.label}</span>
            <p class="card-value">{h.value}</p>
            <p class="card-desc">{h.desc}</p>
        </div>
    {/each}
</section>

<hr class="divider container" />

<!-- ── AGENDA PREVIEW ─────────────────────────────────────── -->
<section class="agenda-section container">
    <div class="section-header">
        <div>
            <span class="label">Kalender</span>
            <h2>Eerstvolgende activiteiten</h2>
        </div>
        <a href="/programma" class="btn-outline">Volledig programma</a>
    </div>
    <div class="agenda-list">
        {#each agenda as ev}
            <div class="agenda-item">
                <div class="date-box">
                    <span class="day">{ev.day}</span>
                    <span class="month">{ev.month}</span>
                </div>
                <div class="ev-info">
                    <h3>{ev.title}</h3>
                    <p>{ev.loc}</p>
                </div>
                <a
                    href="/programma"
                    class="ev-link"
                    aria-label="Meer over {ev.title}">→</a
                >
            </div>
        {/each}
    </div>
</section>

<!-- ── QUOTE BLOCK ────────────────────────────────────────── -->
<section class="quote-block">
    <div class="container">
        <blockquote>
            "Probus is de ontmoetingsplaats van gelijken in een sfeer van
            vriendschap, tolerantie en wederzijds respect."
        </blockquote>
        <cite>— Probus Belgium Charter</cite>
    </div>
</section>

<style>
    /* Hero */
    .hero {
        padding: var(--sp-xl) 0 var(--sp-lg);
    }

    .hero-grid {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: var(--sp-xl);
        align-items: center;
    }

    .eyebrow {
        display: block;
        margin-bottom: var(--sp-xs);
    }

    h1 {
        font-size: clamp(3rem, 6vw, 5.5rem);
        color: var(--accent);
        margin-bottom: var(--sp-sm);
    }

    h1 em {
        font-style: italic;
        color: var(--text);
    }

    .lead {
        font-size: 1.1rem;
        color: var(--text-muted);
        max-width: 480px;
        margin-bottom: var(--sp-md);
    }

    .hero-cta {
        display: flex;
        gap: var(--sp-sm);
        flex-wrap: wrap;
    }

    .hero-visual {
        display: flex;
        justify-content: center;
    }

    /* Highlights */
    .highlights {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--sp-md);
    }

    .card {
        background: var(--surface);
        border: 1px solid var(--border);
        padding: var(--sp-md) var(--sp-md) var(--sp-md);
        transition:
            transform var(--dur) var(--ease),
            box-shadow var(--dur) var(--ease);
    }

    .card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
    }

    .card .label {
        display: block;
        margin-bottom: 0.35rem;
    }

    .card-value {
        font-family: var(--font-serif);
        font-size: 2rem;
        color: var(--accent);
        margin-bottom: 0.35rem;
    }

    .card-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.5;
    }

    /* Agenda Section */
    .agenda-section {
        padding-bottom: var(--sp-xl);
    }

    .section-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: var(--sp-md);
    }

    .section-header h2 {
        font-size: 1.75rem;
        margin-top: 0.25rem;
    }

    .agenda-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .agenda-item {
        display: grid;
        grid-template-columns: 80px 1fr auto;
        align-items: center;
        gap: var(--sp-md);
        background: var(--surface);
        border: 1px solid var(--border);
        padding: var(--sp-sm) var(--sp-md);
        transition: border-color var(--dur) var(--ease);
    }

    .agenda-item:hover {
        border-color: var(--accent-gold);
    }

    .date-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--surface-alt);
        border-right: 1px solid var(--border);
        margin: -0.5rem 0 -0.5rem -0.5rem;
        padding: 0.5rem 0;
        min-width: 64px;
        text-align: center;
    }

    .day {
        font-family: var(--font-serif);
        font-size: 1.6rem;
        color: var(--accent);
        line-height: 1;
    }

    .month {
        font-size: 0.6rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        color: var(--text-muted);
    }

    .ev-info h3 {
        font-family: var(--font-serif);
        font-size: 1.05rem;
    }

    .ev-info p {
        font-size: 0.78rem;
        color: var(--text-muted);
    }

    .ev-link {
        font-size: 1.2rem;
        color: var(--text-muted);
        padding: 0.5rem;
        transition:
            color var(--dur) var(--ease),
            transform var(--dur) var(--ease);
    }

    .ev-link:hover {
        color: var(--accent-gold);
        transform: translateX(3px);
    }

    /* Quote */
    .quote-block {
        background: var(--accent);
        padding: var(--sp-xl) 0;
    }

    .quote-block blockquote {
        font-family: var(--font-serif);
        font-size: clamp(1.2rem, 2.5vw, 1.75rem);
        font-style: italic;
        color: rgba(255, 255, 255, 0.9);
        max-width: 760px;
        margin-bottom: var(--sp-sm);
    }

    .quote-block cite {
        font-size: 0.8rem;
        color: var(--accent-gold);
        letter-spacing: 0.1em;
    }

    @media (max-width: 860px) {
        .hero-grid {
            grid-template-columns: 1fr;
        }
        .hero-visual {
            display: none;
        }
        .highlights {
            grid-template-columns: 1fr;
        }
        .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--sp-sm);
        }
        .agenda-item {
            grid-template-columns: 64px 1fr auto;
        }
    }
</style>
