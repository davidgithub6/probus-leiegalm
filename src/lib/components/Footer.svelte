<script>
    import CrestVisual from "$lib/components/CrestVisual.svelte";

    const links = [
        { href: "/betekenis", label: "Betekenis" },
        { href: "/historiek", label: "Historiek" },
        { href: "/hymne", label: "Hymne" },
        { href: "/bestuur", label: "Bestuur" },
        { href: "/programma", label: "Programma" },
        { href: "/fotos", label: "Foto's" },
        { href: "/leden", label: "Ledenpagina" },
    ];
</script>

<footer>
    <div class="inner container">
        <div class="crest-col">
            <CrestVisual />
        </div>

        <div class="info-col">
            <span class="label">Probus LEIEGALM</span>
            <h2>Menen-Wevelgem</h2>
            <p>
                Opgericht 1997 · Club voor gepensioneerde professionals die
                streven naar vriendschap en intellectuele verrijking.
            </p>
            <div class="meeting">
                <span class="label">Clublokaal</span>
                <p>Restaurant Vijverhof, Wevelgem</p>
            </div>
        </div>

        <div class="links-col">
            <span class="label">Navigatie</span>
            <ul>
                {#each links as { href, label }}
                    <li><a {href}>{label}</a></li>
                {/each}
            </ul>
        </div>

        <div class="external-col">
            <span class="label">Extern</span>
            <ul>
                <li>
                    <a
                        href="https://www.probusbelgium.be"
                        target="_blank"
                        rel="noopener">Probus Belgium</a
                    >
                </li>
                <li><a href="/archief">Archief</a></li>
                <li><a href="/privacy">Privacy</a></li>
            </ul>
        </div>
    </div>

    <div class="bottom">
        <div class="container bottom-inner">
            <p class="copyright">
                © {new Date().getFullYear()} Probus LEIEGALM Menen-Wevelgem. Alle
                rechten voorbehouden.
            </p>
            <p class="built">Est. MCMXCVII</p>
        </div>
    </div>
</footer>

<style>
    footer {
        background: var(--accent);
        color: rgba(255, 255, 255, 0.85);
        padding: var(--sp-xl) 0 0;
        margin-top: var(--sp-xl);
    }

    .inner {
        display: grid;
        grid-template-columns: 160px 1fr 1fr 1fr;
        gap: var(--sp-lg);
        align-items: start;
    }

    .crest-col {
        opacity: 0.6;
    }

    h2 {
        font-family: var(--font-serif);
        font-size: 1.5rem;
        color: #fff;
        margin: 0.25rem 0 0.75rem;
    }

    .info-col p,
    .meeting p {
        font-size: 0.85rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.65);
        max-width: 260px;
    }

    .meeting {
        margin-top: var(--sp-sm);
    }
    .meeting .label {
        margin-bottom: 4px;
    }

    .label {
        color: var(--accent-gold);
        display: block;
        margin-bottom: 0.5rem;
    }

    .links-col ul,
    .external-col ul {
        display: flex;
        flex-direction: column;
        gap: 0.45rem;
    }

    .links-col a,
    .external-col a {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.65);
        transition: color 0.2s;
    }

    .links-col a:hover,
    .external-col a:hover {
        color: var(--accent-gold);
    }

    .bottom {
        margin-top: var(--sp-lg);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: var(--sp-sm) 0;
    }

    .bottom-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .copyright,
    .built {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.4);
        letter-spacing: 0.04em;
    }

    @media (max-width: 900px) {
        .inner {
            grid-template-columns: 1fr 1fr;
        }
        .crest-col {
            display: none;
        }
    }

    @media (max-width: 560px) {
        .inner {
            grid-template-columns: 1fr;
        }
        .bottom-inner {
            flex-direction: column;
            gap: 0.25rem;
            text-align: center;
        }
    }
</style>
