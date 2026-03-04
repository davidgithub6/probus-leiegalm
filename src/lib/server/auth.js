/** @type {number} Session duration in days */
const SESSION_DAYS = 30;

/** @type {number} OTP expiry in minutes */
const OTP_MINUTES = 10;

/** Generate a 6-digit OTP code */
export function generateOTP() {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return String(arr[0] % 1_000_000).padStart(6, '0');
}

/** Generate a cryptographically random session token */
export function generateToken() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a session for a member and return the token + expiry.
 * @param {D1Database} db
 * @param {number} lidId
 */
export async function createSession(db, lidId) {
    const token = generateToken();
    const expires = new Date();
    expires.setDate(expires.getDate() + SESSION_DAYS);

    await db.prepare(
        'INSERT INTO leden_sessions (token, lid_id, expires_at) VALUES (?, ?, ?)'
    ).bind(token, lidId, expires.toISOString()).run();

    return { token, expires };
}

/**
 * Validate a session token and return the member, or null.
 * @param {D1Database} db
 * @param {string|undefined} token
 */
export async function validateSession(db, token) {
    if (!token) return null;
    const row = await db.prepare(
        `SELECT s.token, a.id AS lid_id, a.email, a.naam
         FROM leden_sessions s
         JOIN leden_accounts a ON a.id = s.lid_id
         WHERE s.token = ? AND s.expires_at > datetime('now')`
    ).bind(token).first();
    return row ?? null;
}

/**
 * Store an OTP for an email (deletes previous codes first).
 * @param {D1Database} db
 * @param {string} email
 */
export async function storeOTP(db, email) {
    const code = generateOTP();
    const expires = new Date(Date.now() + OTP_MINUTES * 60 * 1000).toISOString();
    await db.prepare('DELETE FROM leden_otp WHERE email = ?').bind(email).run();
    await db.prepare(
        'INSERT INTO leden_otp (email, code, expires_at) VALUES (?, ?, ?)'
    ).bind(email, code, expires).run();
    return code;
}

/**
 * Validate an OTP code and mark it used. Returns true if valid.
 * @param {D1Database} db
 * @param {string} email
 * @param {string} code
 */
export async function validateOTP(db, email, code) {
    const row = await db.prepare(
        `SELECT id FROM leden_otp WHERE email = ? AND code = ? AND expires_at > datetime('now') AND used = 0`
    ).bind(email, code).first();
    if (!row) return false;
    await db.prepare('UPDATE leden_otp SET used = 1 WHERE id = ?').bind(row.id).run();
    return true;
}

/**
 * Send an email via Resend. Silently skips if API key is absent.
 * @param {string|undefined} apiKey
 * @param {{ to: string; subject: string; html: string; from?: string }} opts
 */
export async function sendEmail(apiKey, opts) {
    if (!apiKey) {
        console.warn('[auth] RESEND_API_KEY not set — email not sent to', opts.to);
        return;
    }
    const from = opts.from ?? 'Probus LEIEGALM <noreply@probus-leiegalm.be>';
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html }),
    });
    if (!res.ok) {
        const err = await res.text().catch(() => '');
        console.error('[auth] Resend error:', res.status, err);
    }
}

/** Cookie options for the session cookie */
export const SESSION_COOKIE = /** @type {import('@sveltejs/kit').CookieSerializeOptions & { path: string }} */ ({
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
});
