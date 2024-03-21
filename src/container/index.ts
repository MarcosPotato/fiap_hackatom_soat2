import { ClockRegistryRepository } from '@infra/prisma/repositories/ClockRegistryRepository';
import { UserRepository } from '@infra/prisma/repositories/UserRepository';
import { IClockRegistryRepository } from 'repositories/IClockRegistryRepository';
import { IUserRepository } from 'repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IClockRegistryRepository>('ClockRegistryRepository', ClockRegistryRepository);
