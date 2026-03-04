-- Leden portal auth tables (not managed by Payload)

CREATE TABLE IF NOT EXISTS leden_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    naam TEXT NOT NULL,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE TABLE IF NOT EXISTS leden_sessions (
    token TEXT PRIMARY KEY NOT NULL,
    lid_id INTEGER NOT NULL,
    expires_at TEXT NOT NULL,
    FOREIGN KEY (lid_id) REFERENCES leden_accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS leden_otp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    used INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS leden_otp_email_idx ON leden_otp (email);
