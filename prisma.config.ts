import { config } from 'dotenv';
import path from 'node:path';
import type { PrismaConfig } from 'prisma/config';

config();

const prismaPath = 'src/prisma';

export default {
  schema: path.join(prismaPath, 'schema.prisma'),
  migrations: { path: path.join(prismaPath, 'migrations'), seed: 'tsx src/prisma/seed.ts' },
  views: { path: path.join(prismaPath, 'views') },
  typedSql: { path: path.join(prismaPath, 'queries') },
} satisfies PrismaConfig;
