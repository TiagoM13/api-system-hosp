import { IUser } from "@shared/entities";
import { prisma } from "@app/database/prisma";

export class UserRepository {
    async findAll(name: string | undefined, skip: number, take: number): Promise<IUser[]> {
        return await prisma.user.findMany({
            skip,
            take,
            where: {
                name: name ? { contains: name } : undefined
            },
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                user_type: true,
                status: true,
                last_access: true,
                created_at: true,
                updated_at: true
            }
        });
    }

    async findById(id: number): Promise<IUser | null> {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                user_type: true,
                status: true,
                last_access: true,
                created_at: true,
                updated_at: true
            }
        })
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    async count(name: string | undefined): Promise<number> {
        return await prisma.user.count({
            where: {
                name: name ? { contains: name } : undefined
            }
        });
    }

    async create(data: IUser): Promise<IUser> {
        return await prisma.user.create({
            data: {
                ...data,
                password: String(data.password)
            },
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                user_type: true,
                status: true,
                last_access: true,
                created_at: true,
                updated_at: true
            },
        })
    }

    async update(id: number, data: IUser): Promise<IUser> {
        return await prisma.user.update({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                user_type: true,
                status: true,
                last_access: true,
                created_at: true,
                updated_at: true
            },
            data
        })
    }

    async changePassword(id: number, data: IUser): Promise<IUser> {
        return await prisma.user.update({
            where: { id },
            data
        })
    }

    async delete(id: number): Promise<IUser> {
        return await prisma.user.delete({ where: { id } })
    }
}