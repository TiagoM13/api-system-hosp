import { Status } from '@prisma/client';

import { prisma } from '@app/infra/prisma/client';
import { DoctorRepository } from '@modules/doctors/repositories/doctor-repository';
import {
  FindEntitiesAndCountParams,
  FindEntitiesAndCountResult,
  IDoctor,
} from '@shared/entities';

export class PrismaDoctorRepository implements DoctorRepository {
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
        id: 'desc',
      },
    });

    return { count, rows: doctors };
  }

  async findById(id: string): Promise<IDoctor | null> {
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

  async update(id: string, data: Partial<IDoctor>): Promise<IDoctor> {
    return await prisma.doctor.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: string, status: Status): Promise<Status> {
    const doctor = await prisma.doctor.update({
      where: { id },
      data: { status },
      select: { status: true },
    });

    return doctor.status;
  }

  async delete(id: string): Promise<IDoctor> {
    return await prisma.doctor.delete({
      where: { id },
    });
  }
}
