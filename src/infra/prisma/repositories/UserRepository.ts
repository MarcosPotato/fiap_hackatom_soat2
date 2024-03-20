import { prisma } from "@providers/prisma";
import { IUser } from "@models/IUser";
import { IUserRepository } from "repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        employee: {
          select: {
            registration: true
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      registration: user.employee.registration,
      email: user.email,
      password: user.password,
      avatar_url: user.avatar_url,
      blocked: user.blocked,
      blocked_at: user.blocked_at,
      created_at: user.created_at,
    };
  }

  async getUserByRegistation(registration: string) {
    const user = await prisma.user.findFirst({
      where: {
        employee: {
          registration: registration
        }
      },
      include: {
        employee: {
          select: {
            registration: true
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      registration: user.employee.registration,
      email: user.email,
      password: user.password,
      avatar_url: user.avatar_url,
      blocked: user.blocked,
      blocked_at: user.blocked_at,
      created_at: user.created_at,
    };
  }
}
