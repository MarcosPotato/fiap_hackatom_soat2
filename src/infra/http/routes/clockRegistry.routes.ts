import { FastifyInstance } from 'fastify';
import { ClockRegsitryController } from '../controllers/ClockRegsitryController';
import { verifyJWT } from '../middlewares/verify-jwt';

export async function clockRegistryRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.get('/registries/:userId', ClockRegsitryController.index);
  app.post('/registries/report', ClockRegsitryController.userReport);
  app.patch('/mark-registry', ClockRegsitryController.create);
}
