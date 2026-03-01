<script>
    let password = $state("");
    let error = $state("");
    let loading = $state(false);

    async function login(e) {
        e.preventDefault();
        loading = true;
        error = "";
        // Simulate — replace with PocketBase auth call
        await new Promise((r) => setTimeout(r, 800));
        if (password === "probus") {
            window.location.href = "/leden/portaal";
        } else {
            error = "Onjuist paswoord. Contacteer de secretaris.";
        }
        loading = false;
    }
</script>

<svelte:head>
    <title>Ledenpagina — Probus LEIEGALM</title>
    <meta
        name="description"
        content="Beveiligd ledenportaal van Probus LEIEGALM Menen-Wevelgem."
    />
</svelte:head>

<div class="login-page">
    <div class="login-panel">
        <!-- Procedural crest in top panel -->
        <div class="panel-header">
            <svg
                viewBox="0 0 80 80"
                fill="none"
                width="56"
                height="56"
                aria-hidden="true"
            >
                <circle
                    cx="40"
                    cy="40"
                    r="38"
                    stroke="rgba(255,255,255,.4)"
                    stroke-width="1.2"
                />
                <path
                    d="M20 40 L40 22 L60 40 L40 58 Z"
                    stroke="rgba(255,255,255,.5)"
                    stroke-width="1.5"
                    fill="none"
                />
                <circle cx="40" cy="40" r="6" fill="rgba(184,146,42,.8)" />
            </svg>
            <h1>Ledenportaal</h1>
            <p class="tagline">Enkel voor leden van Probus LEIEGALM</p>
        </div>

        <form onsubmit={login} class="login-form">
            <div class="field">
                <label for="pwd">Paswoord</label>
                <input
                    id="pwd"
                    type="password"
                    placeholder="••••••••"
                    bind:value={password}
                    autocomplete="current-password"
                    required
                />
            </div>

            {#if error}
                <p class="error-msg" role="alert">{error}</p>
            {/if}

            <button type="submit" class="btn-submit" disabled={loading}>
                {loading ? "Even geduld…" : "Aanmelden"}
            </button>
        </form>

        <div class="help-links">
            <a href="mailto:secretariaat@leiegalm.be">Paswoord vergeten?</a>
            <span>·</span>
            <a href="/">Terug naar start</a>
        </div>
    </div>

    <!-- Decorative background grid -->
    <div class="bg-deco" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="rgba(27,58,92,.06)"
                        stroke-width="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
</div>

<style>
    .login-page {
        position: relative;
        min-height: calc(100vh - 72px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--sp-xl) var(--sp-md);
        overflow: hidden;
    }

    /* Background decorative grid */
    .bg-deco {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
    }

    /* Login panel */
    .login-panel {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 420px;
        background: var(--surface);
        border: 1px solid var(--border);
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
    }

    .panel-header {
        background: var(--accent);
        padding: var(--sp-lg) var(--sp-lg) var(--sp-md);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .panel-header h1 {
        font-family: var(--font-serif);
        font-size: 1.6rem;
        color: #fff;
    }

    .tagline {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    /* Form */
    .login-form {
        padding: var(--sp-lg);
        display: flex;
        flex-direction: column;
        gap: var(--sp-sm);
    }

    .field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    label {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    input[type="password"] {
        padding: 0.75rem var(--sp-sm);
        border: 1.5px solid var(--border);
        background: var(--surface-alt);
        font-size: 1.1rem;
        letter-spacing: 0.15em;
        transition:
            border-color var(--dur),
            box-shadow var(--dur);
    }

    input[type="password"]:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(27, 58, 92, 0.08);
    }

    .error-msg {
        font-size: 0.82rem;
        color: #b44;
        background: rgba(180, 68, 68, 0.06);
        border: 1px solid rgba(180, 68, 68, 0.2);
        padding: 0.5rem 0.75rem;
    }

    .btn-submit {
        width: 100%;
        padding: 0.9rem;
        background: var(--accent);
        color: #fff;
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        transition:
            background var(--dur) var(--ease),
            opacity var(--dur);
        margin-top: 0.25rem;
    }

    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    .btn-submit:not(:disabled):hover {
        background: #0f2740;
    }

    .help-links {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        padding: var(--sp-sm) var(--sp-lg) var(--sp-md);
        border-top: 1px solid var(--border);
        font-size: 0.78rem;
        color: var(--text-muted);
    }

    .help-links a {
        text-decoration: underline;
    }
    .help-links a:hover {
        color: var(--accent);
    }
</style>
