import { prisma } from '@app/infra/prisma/client';
import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IUser,
} from '@shared/entities';

import { IUserRepository } from '../interfaces/user';

export class UserRepository implements IUserRepository {
  async findAll(
    name: string | undefined,
    skip: number,
    take: number,
  ): Promise<IUser[]> {
    return await prisma.user.findMany({
      skip,
      take,
      where: {
        name: name ? { contains: name } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
        status: true,
        last_access: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IUser>> {
    const { name, take, skip } = params;
    const count = await prisma.user.count({
      where: { name: name ? { contains: name } : undefined },
    });
    const users = await prisma.user.findMany({
      skip,
      take,
      where: {
        name: name ? { contains: name } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
        status: true,
        last_access: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      count,
      rows: users,
    };
  }

  async findById(id: number): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
        status: true,
        last_access: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: IUser): Promise<IUser> {
    return await prisma.user.create({
      data: {
        ...data,
        password: String(data.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
        status: true,
        last_access: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(id: number, data: IUser): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        role: true,
        status: true,
        last_access: true,
        created_at: true,
        updated_at: true,
      },
      data,
    });
  }

  async changePassword(id: number, data: IUser): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateLastAccess(id: number): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data: { last_access: new Date() },
    });
  }

  async delete(id: number): Promise<IUser> {
    return await prisma.user.delete({ where: { id } });
  }
}
