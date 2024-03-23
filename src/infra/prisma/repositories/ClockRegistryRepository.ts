import { ICreateClockRegistryDTO } from "@dtos/ICreateClockRegistryDTO";
import { IClockRegistry } from "@models/IClockRegistry";
import { prisma } from "@providers/prisma";
import dayjs from "dayjs";
import { IClockRegistryRepository } from "repositories/IClockRegistryRepository";
import { IEmployeeReportDTO } from "@dtos/IEmployeeReportDTO";

export class ClockRegistryRepository implements IClockRegistryRepository{
    async getRegistriesByUserId(id: string, sort: "asc" | "desc" = "asc"): Promise<IClockRegistry[]> {
        const registries = await prisma.clockRegistry.findMany({
            where: {
                user_id: id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar_url: true
                    }
                }
            },
            orderBy: {
                marked_at: sort
            }
        })

        return registries as IClockRegistry[]
    }

    async getRegistriesOfCurrentDayByUserId(id: string, sort?: "asc" | "desc" | undefined): Promise<IClockRegistry[]> {
        const currentDay = dayjs()

        const registries = await prisma.clockRegistry.findMany({
            where: {
                user_id: id,
                marked_at: {
                    gte: currentDay.startOf("day").toDate(),
                    lte: currentDay.endOf("day").toDate()
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar_url: true
                    }
                }
            },
            orderBy: {
                marked_at: sort
            }
        })

        return registries as IClockRegistry[]
    }

    async createRegistry({ 
        category, 
        is_business_day, 
        marked_at, 
        userId
    }: ICreateClockRegistryDTO): Promise<IClockRegistry> {
        const newRegistry = await prisma.clockRegistry.create({
            data: {
                category,
                is_business_day,
                marked_at,
                user_id: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar_url: true
                    }
                }
            },
        })

        return newRegistry as IClockRegistry
    }
    
    async getMonthlyEmployeeRegistries({ month, userId, year}: IEmployeeReportDTO): Promise<Omit<IClockRegistry, "user">[]> {
        const dateIn = dayjs(`${year}-${month + 1}-01`)
        const dateAt = dateIn.endOf('month')
        
        const registries = await prisma.clockRegistry.findMany({
            where: {
                user_id: userId,
                marked_at: {
                    gte: dateIn.toDate(),
                    lte: dateAt.toDate()
                }
            },
        })

        return registries as Omit<IClockRegistry, "user">[]
    }
}