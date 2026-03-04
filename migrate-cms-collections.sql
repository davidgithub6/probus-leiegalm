CREATE TABLE IF NOT EXISTS verslagen (
    id integer PRIMARY KEY NOT NULL,
    werkjaar numeric NOT NULL,
    maand text NOT NULL,
    inhoud text,
    bijlage_id integer,
    updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    FOREIGN KEY (bijlage_id) REFERENCES media(id) ON UPDATE no action ON DELETE set null
);
CREATE INDEX IF NOT EXISTS verslagen_bijlage_idx ON verslagen (bijlage_id);
CREATE INDEX IF NOT EXISTS verslagen_updated_at_idx ON verslagen (updated_at);
CREATE INDEX IF NOT EXISTS verslagen_created_at_idx ON verslagen (created_at);

CREATE TABLE IF NOT EXISTS wie_is_wie (
    id integer PRIMARY KEY NOT NULL,
    naam text NOT NULL,
    omschrijving text,
    foto_id integer,
    volgorde numeric DEFAULT 0,
    updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    FOREIGN KEY (foto_id) REFERENCES media(id) ON UPDATE no action ON DELETE set null
);
CREATE INDEX IF NOT EXISTS wie_is_wie_foto_idx ON wie_is_wie (foto_id);
CREATE INDEX IF NOT EXISTS wie_is_wie_updated_at_idx ON wie_is_wie (updated_at);
CREATE INDEX IF NOT EXISTS wie_is_wie_created_at_idx ON wie_is_wie (created_at);

CREATE TABLE IF NOT EXISTS uitnodigingen (
    id integer PRIMARY KEY NOT NULL,
    email text NOT NULL,
    token text,
    expires_at text,
    gebruikt integer DEFAULT 0,
    updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS uitnodigingen_token_idx ON uitnodigingen (token);
CREATE INDEX IF NOT EXISTS uitnodigingen_updated_at_idx ON uitnodigingen (updated_at);
CREATE INDEX IF NOT EXISTS uitnodigingen_created_at_idx ON uitnodigingen (created_at);
