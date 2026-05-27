import { app } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { seedDefaultUsers } from './services/seed.service';

async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();
    await seedDefaultUsers();
  } catch {
    console.error('API started without database access. DB routes will return DATABASE_NOT_CONNECTED.');
  }

  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API', error);
  process.exit(1);
});
