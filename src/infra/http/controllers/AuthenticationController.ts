import { UserRepository } from '@infra/prisma/repositories/UserRepository';
import { AuthenticateUserService } from '@useCases/authentication/AuthenticateUserService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const requestBodyZ = z.object({
  registration: z.string().min(1, 'Registation must be informed'),
  password: z.string().min(1, 'Password must be informed'),
});

export const AuthenticateController = {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const { registration, password } = requestBodyZ.parse(request.body);

    const userRepository = new UserRepository();
    const authenticateUserService = new AuthenticateUserService(userRepository);

    const userInfo = await authenticateUserService.execute({
      registration,
      password,
    });

    const token = await reply.jwtSign(userInfo, {
      sign: {
        sub: userInfo.id,
      },
    });

    return reply.status(200).send({
      token: token,
      user: userInfo,
    });
  },
};
