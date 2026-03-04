import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    // Add new collection columns to payload_locked_documents_rels
    // (SQLite ALTER TABLE ADD COLUMN does not support inline FK constraints)
    // Idempotent: columns may already exist if migration was applied manually
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`verslagen_id\` integer;`).catch(() => {})
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`wie_is_wie_id\` integer;`).catch(() => {})
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`uitnodigingen_id\` integer;`).catch(() => {})

    await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_verslagen_id_idx\` ON \`payload_locked_documents_rels\` (\`verslagen_id\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_wie_is_wie_id_idx\` ON \`payload_locked_documents_rels\` (\`wie_is_wie_id\`);`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_uitnodigingen_id_idx\` ON \`payload_locked_documents_rels\` (\`uitnodigingen_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // SQLite does not support DROP COLUMN in all versions; indexes can be dropped
    await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_verslagen_id_idx\`;`)
    await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_wie_is_wie_id_idx\`;`)
    await db.run(sql`DROP INDEX IF EXISTS \`payload_locked_documents_rels_uitnodigingen_id_idx\`;`)
}
