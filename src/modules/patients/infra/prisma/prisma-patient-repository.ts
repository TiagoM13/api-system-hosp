import { Prisma, Status } from '@prisma/client';

import { prisma } from '@app/infra/prisma/client';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';
import {
  type FindAllPatientsAndCountParams,
  type FindEntitiesAndCountResult,
  IPatient,
} from '@shared/entities';
import { convertDecimalToNumber } from '@shared/utils';

export class PrismaPatientRepository implements PatientRepository {
  async findAndCountAll(
    params: FindAllPatientsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IPatient>> {
    const { name, take, skip, cpf, cns, status } = params;

    const where: Prisma.PatientWhereInput = {
      ...(name && { name: { contains: name } }),
      ...(cpf && { cpf }),
      ...(cns && { cns }),
      ...(status && { status }),
    };

    const count = await prisma.patient.count({ where });
    const patients = await prisma.patient.findMany({
      skip,
      take,
      where,
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      count,
      rows: patients.map(patient => ({
        ...patient,
        height: convertDecimalToNumber(patient.height),
        weight: convertDecimalToNumber(patient.weight),
      })),
    };
  }

  async findById(id: string): Promise<IPatient | null> {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        _count: true,
        appointments: {
          orderBy: {
            scheduled_date: 'desc',
          },
          include: {
            doctor: true,
          },
        },
      },
    });

    if (!patient) return null;

    return {
      ...patient,
      height: convertDecimalToNumber(patient.height),
      weight: convertDecimalToNumber(patient.weight),
    };
  }

  async findByCPF(cpf: string): Promise<IPatient | null> {
    return await prisma.patient.findUnique({
      where: { cpf },
    });
  }

  async findByCNS(cns: string): Promise<IPatient | null> {
    return await prisma.patient.findUnique({
      where: { cns },
    });
  }

  async findFirstByCPF(cpf: string, id: string): Promise<IPatient | null> {
    return await prisma.patient.findFirst({
      where: {
        cpf,
        id: { not: id },
      },
    });
  }

  async findFirstByCNS(cns: string, id: string): Promise<IPatient | null> {
    return await prisma.patient.findFirst({
      where: {
        cns,
        id: { not: id },
      },
    });
  }

  async create(data: IPatient): Promise<IPatient> {
    const patient = await prisma.patient.create({ data });

    return {
      ...patient,
      height: convertDecimalToNumber(patient.height),
      weight: convertDecimalToNumber(patient.weight),
    };
  }

  async update(id: string, data: Partial<IPatient>): Promise<IPatient> {
    const patient = await prisma.patient.update({
      where: { id },
      data,
    });

    return {
      ...patient,
      height: convertDecimalToNumber(patient.height),
      weight: convertDecimalToNumber(patient.weight),
    };
  }

  async updateStatus(id: string, status: Status): Promise<Status> {
    const patient = await prisma.patient.update({
      where: { id },
      data: { status },
      select: { status: true },
    });

    return patient.status;
  }
}
