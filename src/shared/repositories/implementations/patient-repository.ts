import { prisma } from '@app/infra/prisma/client';
import { IPatient } from '@shared/entities';

import { convertDecimalToNumber } from '../../utils';
import { IPatientRepository } from '../interfaces/patient';

export class PatientRepository implements IPatientRepository {
  async findAll(
    name: string | undefined,
    skip: number,
    take: number,
  ): Promise<IPatient[]> {
    const patients = await prisma.patient.findMany({
      skip,
      take,
      where: {
        name: name ? { contains: name } : undefined,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return patients.map(patient => ({
      ...patient,
      height: convertDecimalToNumber(patient.height),
      weight: convertDecimalToNumber(patient.weight),
    }));
  }

  async findById(id: string): Promise<IPatient | null> {
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        _count: true,
        queries: true,
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

  async count(name: string | undefined): Promise<number> {
    return await prisma.patient.count({
      where: {
        name: name ? { contains: name } : undefined,
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

  async update(id: string, data: IPatient): Promise<IPatient> {
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
}
