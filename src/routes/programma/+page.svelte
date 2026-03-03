<script>
    export let data;

    const MONTHS = ['JAN','FEB','MRT','APR','MEI','JUN','JUL','AUG','SEP','OKT','NOV','DEC'];

    const events = data.events.map(ev => {
        const d = new Date(ev.datum);
        return {
            day: String(d.getUTCDate()).padStart(2, '0'),
            month: MONTHS[d.getUTCMonth()],
            year: String(d.getUTCFullYear()),
            cat: ev.categorie,
            title: ev.titel,
            loc: ev.locatie,
            time: ev.tijd ?? '',
            highlight: ev.uitgelicht,
        };
    });

    const catColors = {
        Vergadering: "navy",
        Lezing: "gold",
        Uitstap: "teal",
        Bedrijf: "navy",
        Diner: "gold",
    };
</script>

<svelte:head>
    <title>Programma 2026 — Probus LEIEGALM</title>
    <meta
        name="description"
        content="Het activiteitenprogramma 2026 van Probus LEIEGALM Menen-Wevelgem."
    />
</svelte:head>

<article class="page-hero">
    <div class="container">
        <span class="label">Kalender</span>
        <h1>Programma 2026</h1>
        <span class="gold-rule"></span>
        <p class="subtitle">
            Alle activiteiten van het werkjaar 2026 voor leden van Probus
            LEIEGALM.
        </p>
    </div>
</article>

<section class="container prog-section">
    <div class="event-list">
        {#each events as ev}
            <div class="event-row" class:highlight={ev.highlight}>
                <div class="date-col">
                    <span class="day">{ev.day}</span>
                    <span class="month">{ev.month}</span>
                    <span class="year-sm">{ev.year}</span>
                </div>
                <div class="cat-col">
                    <span class="cat cat-{catColors[ev.cat] ?? 'navy'}"
                        >{ev.cat}</span
                    >
                </div>
                <div class="info-col">
                    <h3>{ev.title}</h3>
                    <p class="loc">📍 {ev.loc}</p>
                </div>
                <div class="time-col">{ev.time}</div>
            </div>
        {/each}
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

    .prog-section {
        padding: var(--sp-xl) 0;
    }

    .event-list {
        display: flex;
        flex-direction: column;
        gap: 1px;
        background: var(--border);
    }

    .event-row {
        display: grid;
        grid-template-columns: 90px 110px 1fr 70px;
        gap: var(--sp-md);
        align-items: center;
        background: var(--surface);
        padding: var(--sp-sm) var(--sp-md);
        transition: background var(--dur) var(--ease);
    }

    .event-row:hover {
        background: var(--surface-alt);
    }
    .event-row.highlight {
        border-left: 3px solid var(--accent-gold);
    }

    .date-col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .day {
        font-family: var(--font-serif);
        font-size: 1.75rem;
        color: var(--accent);
        line-height: 1;
    }

    .month {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: var(--accent-gold);
    }

    .year-sm {
        font-size: 0.6rem;
        color: var(--text-muted);
    }

    .cat {
        display: inline-block;
        padding: 3px 10px;
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .cat-navy {
        background: rgba(27, 58, 92, 0.08);
        color: var(--accent);
    }
    .cat-gold {
        background: rgba(184, 146, 42, 0.1);
        color: #8a6a14;
    }
    .cat-teal {
        background: rgba(0, 100, 100, 0.08);
        color: #005454;
    }

    .info-col h3 {
        font-family: var(--font-serif);
        font-size: 1rem;
    }

    .loc {
        font-size: 0.78rem;
        color: var(--text-muted);
        margin-top: 2px;
    }

    .time-col {
        font-family: var(--font-mono, monospace);
        font-size: 0.8rem;
        color: var(--text-muted);
        text-align: right;
    }

    @media (max-width: 700px) {
        .event-row {
            grid-template-columns: 70px 1fr;
            grid-template-rows: auto auto;
        }
        .cat-col {
            grid-column: 2;
            grid-row: 1;
        }
        .info-col {
            grid-column: 1/-1;
            grid-row: 2;
        }
        .time-col {
            display: none;
        }
    }
</style>
