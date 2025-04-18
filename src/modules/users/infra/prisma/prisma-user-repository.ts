import { Status } from '@prisma/client';

import { prisma } from '@app/infra/prisma/client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import { UpdateUserBasicInfoDTO } from '@modules/users/useCases/update-user-basic-info/update-user-basic-info-schema';
import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IUser,
} from '@shared/entities';

export class PrismaUserRepository implements UserRepository {
  async findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IUser>> {
    const { name, take, skip } = params;
    const count = await prisma.user.count({
      where: { ...(name && { name: { contains: name } }) },
    });
    const users = await prisma.user.findMany({
      skip,
      take,
      where: {
        ...(name && { name: { contains: name } }),
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

  async findById(id: string): Promise<IUser | null> {
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

  async update(id: string, data: Partial<IUser>): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data,
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

  async updateStatus(id: string, status: Status): Promise<Status> {
    const doctor = await prisma.user.update({
      where: { id },
      data: { status },
      select: { status: true },
    });

    return doctor.status;
  }

  async updateUserBasicInfo(
    id: string,
    data: UpdateUserBasicInfoDTO,
  ): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async changePassword(id: string, data: Partial<IUser>): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateLastAccess(id: string): Promise<IUser> {
    return await prisma.user.update({
      where: { id },
      data: { last_access: new Date() },
    });
  }

  async delete(id: string): Promise<IUser> {
    return await prisma.user.delete({ where: { id } });
  }
}
