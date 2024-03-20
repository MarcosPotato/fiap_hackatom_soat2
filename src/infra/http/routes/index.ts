import { FastifyInstance } from 'fastify';
import { authRoutes } from './authenticate.routes';

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes);
}
