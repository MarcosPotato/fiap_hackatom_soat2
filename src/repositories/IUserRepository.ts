import { IUser } from '@models/IUser';

export interface IUserRepository {
  getUserById(id: string): Promise<IUser | null>;
  getUserByRegistation(registration: string): Promise<IUser | null>;
}
