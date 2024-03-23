import { IUser } from '@models/IUser';

export interface GetParams {
  employee?: boolean;
}

export interface IUserRepository {
  getUserById(id: string, options?: GetParams): Promise<IUser | null>;
  getUserByRegistation(registration: string): Promise<IUser | null>;
}
