import { prisma } from '@app/infra/prisma/client';
import {
  FindEntitiesAndCountParams,
  FindEntitiesAndCountResult,
  IDoctor,
} from '@shared/entities';

import { IDoctorRepository } from '../interfaces/doctor';

export class DoctorRepository implements IDoctorRepository {
  async findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IDoctor>> {
    const { name, skip, take } = params;
    const count = await prisma.doctor.count({
      where: {
        name: name ? { contains: name } : undefined,
      },
    });
    const doctors = await prisma.doctor.findMany({
      skip,
      take,
      where: {
        name: name ? { contains: name } : undefined,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return { count, rows: doctors };
  }

  async findById(id: number): Promise<IDoctor | null> {
    return await prisma.doctor.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmailOrCrm(email: string, crm: string): Promise<IDoctor | null> {
    return await prisma.doctor.findFirst({
      where: {
        OR: [
          { email: email ? email : undefined },
          { crm: crm ? crm : undefined },
        ],
      },
    });
  }

  async findByCNS(cns: string): Promise<IDoctor | null> {
    return await prisma.doctor.findFirst({
      where: {
        cns,
      },
    });
  }

  async create(data: IDoctor): Promise<IDoctor> {
    return await prisma.doctor.create({
      data,
    });
  }

  async update(id: number, data: IDoctor): Promise<IDoctor> {
    return await prisma.doctor.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<IDoctor> {
    return await prisma.doctor.delete({
      where: { id },
    });
  }
}
