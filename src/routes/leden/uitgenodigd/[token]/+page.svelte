<script>
    import { enhance } from '$app/forms';

    let { form } = $props();

    let loading = $state(false);
</script>

<svelte:head>
    <title>Registreren — Probus LEIEGALM</title>
</svelte:head>

<div class="login-page">
    <div class="login-panel">
        <div class="panel-header">
            <svg viewBox="0 0 80 80" fill="none" width="56" height="56" aria-hidden="true">
                <circle cx="40" cy="40" r="38" stroke="rgba(255,255,255,.4)" stroke-width="1.2" />
                <path d="M20 40 L40 22 L60 40 L40 58 Z" stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none" />
                <circle cx="40" cy="40" r="6" fill="rgba(184,146,42,.8)" />
            </svg>
            <h1>Welkom</h1>
            <p class="tagline">Registreer uw account</p>
        </div>

        <form
            method="POST"
            use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    await update();
                    loading = false;
                };
            }}
            class="login-form"
        >
            <div class="field">
                <label for="naam">Volledige naam</label>
                <input
                    id="naam"
                    name="naam"
                    type="text"
                    placeholder="Voornaam Achternaam"
                    autocomplete="name"
                    required
                    value={form?.naam ?? ''}
                />
            </div>

            {#if form?.error}
                <p class="error-msg" role="alert">{form.error}</p>
            {/if}

            <button type="submit" class="btn-submit" disabled={loading}>
                {loading ? 'Even geduld…' : 'Account aanmaken'}
            </button>
        </form>

        <div class="help-links">
            <a href="mailto:secretariaat@leiegalm.be">Hulp nodig?</a>
            <span>·</span>
            <a href="/">Terug naar start</a>
        </div>
    </div>

    <div class="bg-deco" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(27,58,92,.06)" stroke-width="1" />
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

    .bg-deco {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
    }

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

    input[type='text'] {
        padding: 0.75rem var(--sp-sm);
        border: 1.5px solid var(--border);
        background: var(--surface-alt);
        font-size: 1rem;
        transition:
            border-color var(--dur),
            box-shadow var(--dur);
    }

    input[type='text']:focus {
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
