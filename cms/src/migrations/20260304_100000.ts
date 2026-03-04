import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    // verslagen
    await db.run(sql`CREATE TABLE \`verslagen\` (
        \`id\` integer PRIMARY KEY NOT NULL,
        \`werkjaar\` numeric NOT NULL,
        \`maand\` text NOT NULL,
        \`inhoud\` text,
        \`bijlage_id\` integer,
        \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        FOREIGN KEY (\`bijlage_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
    );`)
    await db.run(sql`CREATE INDEX \`verslagen_bijlage_idx\` ON \`verslagen\` (\`bijlage_id\`);`)
    await db.run(sql`CREATE INDEX \`verslagen_updated_at_idx\` ON \`verslagen\` (\`updated_at\`);`)
    await db.run(sql`CREATE INDEX \`verslagen_created_at_idx\` ON \`verslagen\` (\`created_at\`);`)

    // wie_is_wie
    await db.run(sql`CREATE TABLE \`wie_is_wie\` (
        \`id\` integer PRIMARY KEY NOT NULL,
        \`naam\` text NOT NULL,
        \`omschrijving\` text,
        \`foto_id\` integer,
        \`volgorde\` numeric DEFAULT 0,
        \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        FOREIGN KEY (\`foto_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
    );`)
    await db.run(sql`CREATE INDEX \`wie_is_wie_foto_idx\` ON \`wie_is_wie\` (\`foto_id\`);`)
    await db.run(sql`CREATE INDEX \`wie_is_wie_updated_at_idx\` ON \`wie_is_wie\` (\`updated_at\`);`)
    await db.run(sql`CREATE INDEX \`wie_is_wie_created_at_idx\` ON \`wie_is_wie\` (\`created_at\`);`)

    // uitnodigingen
    await db.run(sql`CREATE TABLE \`uitnodigingen\` (
        \`id\` integer PRIMARY KEY NOT NULL,
        \`email\` text NOT NULL,
        \`token\` text,
        \`expires_at\` text,
        \`gebruikt\` integer DEFAULT false,
        \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
    );`)
    await db.run(sql`CREATE UNIQUE INDEX \`uitnodigingen_token_idx\` ON \`uitnodigingen\` (\`token\`);`)
    await db.run(sql`CREATE INDEX \`uitnodigingen_updated_at_idx\` ON \`uitnodigingen\` (\`updated_at\`);`)
    await db.run(sql`CREATE INDEX \`uitnodigingen_created_at_idx\` ON \`uitnodigingen\` (\`created_at\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.run(sql`DROP TABLE IF EXISTS \`verslagen\`;`)
    await db.run(sql`DROP TABLE IF EXISTS \`wie_is_wie\`;`)
    await db.run(sql`DROP TABLE IF EXISTS \`uitnodigingen\`;`)
}
