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
        {#each [{ role: "Voorzitter", initial: "V", desc: "Leidt de algemene vergaderingen en vertegenwoordigt de club naar buiten." }, { role: "Ondervoorzitter", initial: "O", desc: "Ondersteunt de voorzitter en neemt het roer over bij diens afwezigheid." }, { role: "Secretaris", initial: "S", desc: "Beheert de correspondentie, notulen en ledenadministratie." }, { role: "Penningmeester", initial: "P", desc: "Bewaakt de financiën en rapporteert jaarlijks aan de leden." }, { role: "Activiteitencoördinator", initial: "A", desc: "Organiseert lezingen, uitstappen en bedrijfsbezoeken." }, { role: "Archivaris", initial: "A", desc: "Bewaart en ontsluidt de historische documenten en foto's van de club." }] as m}
            <div class="board-card">
                <div class="avatar" aria-hidden="true">
                    <svg viewBox="0 0 80 80" fill="none">
                        <circle
                            cx="40"
                            cy="40"
                            r="39"
                            stroke="var(--accent)"
                            stroke-width="1"
                            opacity=".3"
                        />
                        <circle
                            cx="40"
                            cy="30"
                            r="14"
                            stroke="var(--accent)"
                            stroke-width="1.2"
                            opacity=".5"
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
                            font-size="18"
                            opacity=".8">{m.initial}</text
                        >
                    </svg>
                </div>
                <div class="member-info">
                    <span class="role-label label">{m.role}</span>
                    <p class="name">[Naam]</p>
                    <p class="desc">{m.desc}</p>
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

    .board-section {
        padding: var(--sp-xl) 0;
    }

    .board-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--sp-md);
    }

    .board-card {
        background: var(--surface);
        border: 1px solid var(--border);
        padding: var(--sp-md);
        display: flex;
        gap: var(--sp-md);
        align-items: flex-start;
        transition:
            transform var(--dur) var(--ease),
            box-shadow var(--dur) var(--ease);
    }

    .board-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow);
        border-color: var(--accent-gold);
    }

    .avatar {
        width: 64px;
        flex-shrink: 0;
    }
    .avatar svg {
        width: 64px;
        height: 64px;
    }

    .role-label {
        display: block;
        margin-bottom: 0.2rem;
    }

    .name {
        font-family: var(--font-serif);
        font-size: 1.1rem;
        color: var(--accent);
        margin-bottom: 0.25rem;
    }

    .desc {
        font-size: 0.8rem;
        color: var(--text-muted);
        line-height: 1.55;
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

    @media (max-width: 580px) {
        .board-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
