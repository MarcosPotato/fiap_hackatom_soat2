import { prisma } from "@providers/prisma";
import { IUser } from "@models/IUser";
import { GetParams, IUserRepository } from "repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async getUserById(id: string, options?: GetParams): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        employee: {
          select: {
            registration: true,
            address: !!options?.employee,
            celphone: !!options?.employee,
            cpf: !!options?.employee,
            job_role: !!options?.employee,
            pib: !!options?.employee,
            telphone: !!options?.employee,
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    if(options?.employee){
      return {
        id: user.id,
        name: user.name,
        registration: user.employee.registration,
        email: user.email,
        password: user.password,
        avatar_url: user.avatar_url,
        blocked: user.blocked,
        address: user.employee.address,
        celphone: user.employee.celphone,
        cpf: user.employee.cpf,
        job_role: user.employee.job_role,
        pib: user.employee.pib,
        telphone: user.employee.telphone,
        blocked_at: user.blocked_at,
        created_at: user.created_at,
      };
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
