<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const quickLinks = [
        { href: '/leden/portaal/verslagen', label: 'Verslagen', desc: 'Verslagen van vergaderingen' },
        { href: '/leden/portaal/wie-is-wie', label: 'Wie is wie', desc: 'Ereleden en profielen' },
        { href: '/leden/portaal/ledenlijst', label: 'Ledenlijst', desc: 'Overzicht van alle leden' },
        { href: '/leden/portaal/huisreglement', label: 'Huisreglement', desc: 'Reglement van de club' },
    ];
</script>

<svelte:head>
    <title>Ledenportaal — Probus LEIEGALM</title>
</svelte:head>

<div class="dashboard">
    <header class="dash-header">
        <h1>Welkom, {data.lid?.naam ?? 'lid'}.</h1>
        <p class="sub">U bent aangemeld bij het ledenportaal van Probus LEIEGALM.</p>
    </header>

    <div class="quick-grid">
        {#each quickLinks as link}
            <a href={link.href} class="quick-card">
                <span class="card-label">{link.label}</span>
                <span class="card-desc">{link.desc}</span>
            </a>
        {/each}
    </div>
</div>

<style>
    .dashboard {
        max-width: 780px;
    }

    .dash-header {
        margin-bottom: var(--sp-xl);
    }

    .dash-header h1 {
        font-family: var(--font-serif);
        font-size: 2rem;
        color: var(--accent);
        margin-bottom: 0.35rem;
    }

    .sub {
        color: var(--text-muted);
        font-size: 0.9rem;
    }

    .quick-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--sp-md);
    }

    .quick-card {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: var(--sp-md);
        background: var(--surface);
        border: 1px solid var(--border);
        text-decoration: none;
        transition:
            border-color var(--dur),
            box-shadow var(--dur);
    }

    .quick-card:hover {
        border-color: var(--accent);
        box-shadow: 0 4px 16px rgba(27, 58, 92, 0.08);
    }

    .card-label {
        font-weight: 700;
        font-size: 0.95rem;
        color: var(--accent);
    }

    .card-desc {
        font-size: 0.8rem;
        color: var(--text-muted);
    }
</style>
