import { UserRepository } from '@infra/prisma/repositories/UserRepository';
import { AuthenticateUserUseCase } from '@useCases/authentication/AuthenticateUserUseCase';
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
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

    const userInfo = await authenticateUserUseCase.execute({
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
