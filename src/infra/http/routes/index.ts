import { FastifyInstance } from 'fastify';
import { authRoutes } from './authenticate.routes';
import { clockRegistryRoutes } from './clockRegistry.routes';

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes);
  app.register(clockRegistryRoutes);
}
