import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './client';

// This will run migrations on the database, skipping the ones already applied
await migrate(db, {migrationsFolder: "./src/lib/db/drizzle"});
// Don't forget to close the connection, otherwise the script will hang
await connection.end();
