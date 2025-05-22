import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function main() {
  const client = createClient({
    url: 'file:local.db',
  });

  const db = drizzle(client);

  console.log('Running migrations...');

  await migrate(db, { migrationsFolder: 'drizzle' });

  console.log('Migrations completed!');

  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed!');
  console.error(err);
  process.exit(1);
}); 