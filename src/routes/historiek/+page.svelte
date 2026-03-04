<svelte:head>
    <title>Historiek — Probus LEIEGALM</title>
    <meta
        name="description"
        content="De geschiedenis van Probus LEIEGALM Menen-Wevelgem, opgericht in 1997."
    />
</svelte:head>

<article class="page-hero">
    <div class="container">
        <span class="label">Chroniek</span>
        <h1>Onze Historiek</h1>
        <span class="gold-rule"></span>
        <p class="subtitle">
            Van een informele kring in 1997 tot een bloeiende club — het verhaal
            van Probus LEIEGALM.
        </p>
    </div>
</article>

<section class="timeline-section container">
    <div class="timeline">
        <div class="tl-item">
            <div class="tl-marker">
                <span class="year">1997</span>
                <div class="dot"></div>
            </div>
            <div class="tl-content">
                <h2>De stichting</h2>
                <p>
                    Op 17 november 1997 werd de kiem gelegd voor Probus LEIEGALM
                    Menen-Wevelgem. Een groep enthousiaste pioniers —
                    gepensioneerde professionals uit de regio — besloot de
                    Probus-gedachte naar een hoek van West-Vlaanderen te
                    brengen.
                </p>
            </div>
        </div>

        <div class="tl-item">
            <div class="tl-marker">
                <span class="year">1998</span>
                <div class="dot"></div>
            </div>
            <div class="tl-content">
                <h2>Officiële inaugratie</h2>
                <p>
                    Op 26 juni 1998 vond de plechtige erkenning en inhuldiging
                    van de club plaats. Dit markeerde het begin van een reeks
                    maandelijkse bijeenkomsten, lezingen en vriendschappelijke
                    ontmoetingen die tot de dag van vandaag doorgaan.
                </p>
            </div>
        </div>

        <div class="tl-item">
            <div class="tl-marker">
                <span class="year">2000+</span>
                <div class="dot"></div>
            </div>
            <div class="tl-content">
                <h2>Groei & verankering</h2>
                <p>
                    Gedurende de eerste decennia consolideerde de club haar
                    positie in de regio. Bedrijfsbezoeken, culturele uitstappen
                    en gastlezingen werden vaste pijlers van het jaarlijkse
                    programma.
                </p>
            </div>
        </div>

        <div class="tl-item highlight">
            <div class="tl-marker">
                <span class="year">Heden</span>
                <div class="dot"></div>
            </div>
            <div class="tl-content">
                <h2>Een levende gemeenschap</h2>
                <p>
                    Vandaag telt onze club een diverse groep leden die met
                    dezelfde passie en interesse samenkomen in <strong
                        >Restaurant Vijverhof</strong
                    > te Wevelgem. De Probus-waarden — vriendschap, intellectuele
                    stimulans en respect — blijven de hoeksteen van elke bijeenkomst.
                </p>
                <a
                    href="/bestuur"
                    class="btn-outline"
                    style="margin-top: var(--sp-sm); display: inline-block;"
                >
                    Huidig bestuur →
                </a>
            </div>
        </div>
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

    .timeline-section {
        padding: var(--sp-lg) var(--sp-md);
        max-width: 800px;
    }

    .timeline {
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
    }

    .timeline::before {
        content: "";
        position: absolute;
        left: 96px;
        top: 28px;
        bottom: 28px;
        width: 1px;
        background: var(--border);
    }

    .tl-item {
        display: grid;
        grid-template-columns: 140px 1fr;
        gap: var(--sp-md);
        padding-bottom: var(--sp-lg);
    }

    .tl-marker {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
        padding-top: 4px;
        position: relative;
    }

    .year {
        font-family: var(--font-serif);
        font-size: 1.1rem;
        color: var(--accent);
        font-weight: 600;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--border);
        border: 2px solid var(--surface);
        outline: 1px solid var(--border);
        position: absolute;
        right: -21px;
        top: 28px;
    }

    .tl-item.highlight .dot {
        background: var(--accent-gold);
        outline-color: var(--accent-gold);
    }

    .tl-content {
        padding-left: var(--sp-md);
    }

    .tl-content h2 {
        font-size: 1.35rem;
        margin-bottom: 0.6rem;
        color: var(--accent);
    }

    .tl-content p {
        color: var(--text-muted);
        line-height: 1.8;
        font-size: 0.95rem;
    }

    @media (max-width: 640px) {
        .timeline::before {
            left: 0;
        }
        .tl-item {
            grid-template-columns: 1fr;
        }
        .tl-marker {
            flex-direction: row;
            align-items: center;
        }
        .dot {
            position: static;
        }
    }
</style>
