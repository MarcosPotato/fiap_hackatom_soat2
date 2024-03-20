import AppError from '@errors/AppError';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from 'repositories/IUserRepository';

interface IRequest {
  registration: string;
  password: string;
}

interface IResponse {
  id: string;
  name: string;
  registration: string;
  email: string;
  avatar_url?: string | null;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ password, registration }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.getUserByRegistation(registration);

    if (!user) {
      throw new AppError('Invalid registation/pass');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid registation/pass');
    }

    return {
      id: user.id,
      name: user.name,
      registration: user.registration,
      email: user.email,
      avatar_url: user.avatar_url,
    };
  }
}
