<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import ProbusLogo from "$lib/components/ProbusLogo.svelte";

    let scrolled = $state(false);
    let menuOpen = $state(false);

    onMount(() => {
        const onScroll = () => {
            scrolled = window.scrollY > 40;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    });

    const nav = [
        { href: "/", label: "Start" },
        { href: "/betekenis", label: "Betekenis" },
        { href: "/historiek", label: "Historiek" },
        { href: "/hymne", label: "Hymne" },
        { href: "/bestuur", label: "Bestuur" },
        { href: "/programma", label: "Programma" },
        { href: "/fotos", label: "Foto's" },
    ];
</script>

<header class:scrolled>
    <div class="inner container">
        <!-- Logo -->
        <a href="/" class="logo" aria-label="Probus Leiegalm">
            <div class="logo-mark" aria-hidden="true">
                <ProbusLogo size={42} />
            </div>
            <div class="logo-text">
                <span class="logo-name">Probus</span>
                <span class="logo-sub">Leiegalm · Menen-Wevelgem</span>
            </div>
        </a>

        <!-- Desktop Nav -->
        <nav class="desktop-nav" aria-label="Hoofdnavigatie">
            {#each nav as { href, label }}
                <a {href} class:active={page.url.pathname === href}>{label}</a>
            {/each}
        </nav>

        <!-- CTA -->
        <div class="cta-group">
            <a
                href="/leden"
                class="btn-leden"
                class:active={page.url.pathname === "/leden"}
            >
                Ledenpagina
            </a>
            <button
                class="hamburger"
                onclick={() => (menuOpen = !menuOpen)}
                aria-label="Menu"
            >
                <span></span><span></span><span></span>
            </button>
        </div>
    </div>

    <!-- Mobile Nav -->
    {#if menuOpen}
        <nav class="mobile-nav" aria-label="Mobiele navigatie">
            {#each nav as { href, label }}
                <a
                    {href}
                    onclick={() => (menuOpen = false)}
                    class:active={page.url.pathname === href}>{label}</a
                >
            {/each}
            <a
                href="/leden"
                onclick={() => (menuOpen = false)}
                class="mobile-leden">Ledenpagina</a
            >
        </nav>
    {/if}
</header>

<style>
    header {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(248, 246, 242, 0.92);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-bottom: 1px solid transparent;
        transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
    }

    header.scrolled {
        border-bottom-color: var(--border);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
    }

    .inner {
        display: flex;
        align-items: center;
        gap: 2rem;
        height: 72px;
    }

    /* Logo */
    .logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
        color: var(--accent);
    }

    .logo-mark {
        color: var(--accent);
    }
    .logo-mark svg {
        display: block;
    }

    .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
    }

    .logo-name {
        font-family: var(--font-serif);
        font-size: 1.15rem;
        font-weight: 600;
        color: var(--accent);
        letter-spacing: 0.02em;
    }

    .logo-sub {
        font-family: var(--font-sans);
        font-size: 0.65rem;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-top: 3px;
    }

    /* Desktop Nav */
    .desktop-nav {
        display: flex;
        align-items: center;
        gap: 1.75rem;
        margin-left: auto;
    }

    .desktop-nav a {
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.04em;
        color: var(--text-muted);
        padding-bottom: 2px;
        border-bottom: 1.5px solid transparent;
        transition:
            color 0.2s ease,
            border-color 0.2s ease;
    }

    .desktop-nav a:hover,
    .desktop-nav a.active {
        color: var(--accent);
        border-bottom-color: var(--accent-gold);
    }

    /* CTA */
    .cta-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-left: 1rem;
    }

    .btn-leden {
        padding: 0.55rem 1.25rem;
        background: var(--accent);
        color: #fff;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        border: 1.5px solid var(--accent);
        transition:
            background 0.2s ease,
            color 0.2s ease;
    }
    .btn-leden:hover,
    .btn-leden.active {
        background: transparent;
        color: var(--accent);
    }

    /* Hamburger */
    .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        padding: 4px;
    }

    .hamburger span {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--accent);
        border-radius: 2px;
    }

    /* Mobile Nav */
    .mobile-nav {
        display: none;
        flex-direction: column;
        padding: var(--sp-sm) var(--sp-md) var(--sp-md);
        border-top: 1px solid var(--border);
        gap: 0.25rem;
    }

    .mobile-nav a {
        padding: 0.65rem 0;
        font-weight: 500;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border-light);
    }

    .mobile-nav a.active {
        color: var(--accent);
    }

    .mobile-leden {
        margin-top: 0.5rem;
        padding: 0.75rem 1.25rem !important;
        background: var(--accent);
        color: #fff !important;
        text-align: center;
        font-weight: 600;
        letter-spacing: 0.06em;
        border: none !important;
    }

    @media (max-width: 860px) {
        .desktop-nav {
            display: none;
        }
        .hamburger {
            display: flex;
        }
        .btn-leden {
            display: none;
        }
        .mobile-nav {
            display: flex;
        }
        .inner {
            gap: 1rem;
        }
    }
</style>
