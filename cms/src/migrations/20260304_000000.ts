import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.run(sql`ALTER TABLE \`media\` ADD COLUMN \`focal_x\` numeric;`)
    await db.run(sql`ALTER TABLE \`media\` ADD COLUMN \`focal_y\` numeric;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // SQLite does not support DROP COLUMN in older versions; safe to leave
}
