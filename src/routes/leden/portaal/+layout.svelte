<script>
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";

    /** @type {import('./$types').LayoutData} */
    export let data;

    const navItems = [
        { href: "/leden/portaal", label: "Dashboard" },
        { href: "/leden/portaal/verslagen", label: "Verslagen" },
        { href: "/leden/portaal/wie-is-wie", label: "Wie is wie" },
        { href: "/leden/portaal/ledenlijst", label: "Ledenlijst" },
        { href: "/leden/portaal/huisreglement", label: "Huisreglement" },
    ];
</script>

<div class="portal-shell">
    <aside class="sidebar">
        <div class="sidebar-header">
            <a href="/leden/portaal" class="brand">
                <span class="brand-name">Probus</span>
                <span class="brand-sub">LEIEGALM</span>
            </a>
        </div>

        <nav class="nav">
            {#each navItems as item}
                <a
                    href={item.href}
                    class="nav-item"
                    class:active={$page.url.pathname === item.href ||
                        ($page.url.pathname.startsWith(item.href + "/") &&
                            item.href !== "/leden/portaal")}
                >
                    {item.label}
                </a>
            {/each}
        </nav>

        <div class="sidebar-footer">
            <span class="user-name">{data.lid?.naam ?? ""}</span>
            <form method="POST" action="/leden/portaal?/logout" use:enhance>
                <button type="submit" class="logout-btn">Afmelden</button>
            </form>
        </div>
    </aside>

    <main class="portal-main">
        <slot />
    </main>
</div>

<style>
    .portal-shell {
        display: flex;
        min-height: calc(100vh - 72px);
    }

    /* Sidebar */
    .sidebar {
        width: 250px;
        flex-shrink: 0;
        background: var(--accent);
        display: flex;
        flex-direction: column;
        position: sticky;
        top: 72px;
        height: calc(100vh - 72px);
        overflow-y: auto;
    }

    .sidebar-header {
        padding: var(--sp-lg) var(--sp-md) var(--sp-md);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .brand {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        overflow-wrap: break-word;
        word-wrap: break-word;
    }

    .brand-name {
        font-family: var(--font-serif);
        font-size: 1.15rem;
        color: #fff;
        line-height: 1.2;
    }

    .brand-sub {
        font-size: 0.65rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.55);
    }

    .nav {
        flex: 1;
        padding: var(--sp-sm) 0;
        display: flex;
        flex-direction: column;
    }

    .nav-item {
        padding: 0.65rem var(--sp-md);
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.75);
        text-decoration: none;
        transition:
            background var(--dur),
            color var(--dur);
        border-left: 3px solid transparent;
    }

    .nav-item:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #fff;
    }

    .nav-item.active {
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
        border-left-color: var(--gold, #b8922a);
    }

    .sidebar-footer {
        padding: var(--sp-sm) var(--sp-md);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .user-name {
        font-size: 0.78rem;
        color: rgba(255, 255, 255, 0.6);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .logout-btn {
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: rgba(255, 255, 255, 0.7);
        padding: 0.35rem 0.75rem;
        font-size: 0.75rem;
        cursor: pointer;
        text-align: left;
        transition:
            background var(--dur),
            color var(--dur);
    }

    .logout-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    /* Main area */
    .portal-main {
        flex: 1;
        padding: var(--sp-xl) var(--sp-lg);
        min-width: 0;
    }

    @media (max-width: 640px) {
        .portal-shell {
            flex-direction: column;
        }

        .sidebar {
            width: 100%;
            height: auto;
            position: static;
        }

        .nav {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0;
        }

        .nav-item {
            border-left: none;
            border-bottom: 3px solid transparent;
        }

        .nav-item.active {
            border-left-color: transparent;
            border-bottom-color: var(--gold, #b8922a);
        }
    }
</style>
