import { ClockRegistryRepository } from '@infra/prisma/repositories/ClockRegistryRepository';
import { MarkRegistryUseCase } from '@useCases/registries/MarkRegistryUseCase';
import { GetMonthlyReportUseCase } from '@useCases/reports/GetMonthlyReportUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';

const registryParams = z.object({
  userId: z.string().min(1, 'User id must be informed'),
});

const handleReportParams = z.object({
  month: z.enum(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']),
  year: z.coerce.number(),
});

export const ClockRegsitryController = {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = registryParams.parse(request.params);

    const clockRegistryRepository = new ClockRegistryRepository();

    const registries = await clockRegistryRepository.getRegistriesByUserId(userId, 'desc');

    return reply.status(200).send({ registries });
  },
  async create(request: FastifyRequest, reply: FastifyReply) {
    //@ts-expect-error - Retrieve user id
    const userId = request.userId;

    const markRegistryUseCase = container.resolve(MarkRegistryUseCase);

    await markRegistryUseCase.execute({
      userId,
    });

    return reply.status(204).send();
  },

  async userReport(request: FastifyRequest, reply: FastifyReply) {
    //@ts-expect-error - Retrieve user id
    const userId = request.userId;

    const { month, year } = handleReportParams.parse(request.body);

    const getMonthlyReportUseCase = container.resolve(GetMonthlyReportUseCase);

    await getMonthlyReportUseCase.execute({
      userId,
      month,
      year,
    });

    return reply.status(204).send();
  },
};
