import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.run(sql`ALTER TABLE \`paginas\` ADD COLUMN \`bijlage_id\` integer REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null;`)
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`paginas_bijlage_idx\` ON \`paginas\` (\`bijlage_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    await db.run(sql`DROP INDEX IF EXISTS \`paginas_bijlage_idx\`;`)
}
