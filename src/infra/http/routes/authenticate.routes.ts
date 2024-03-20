import { FastifyInstance } from 'fastify';
import { AuthenticateController } from '../controllers/AuthenticationController';

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', AuthenticateController.index);
}
