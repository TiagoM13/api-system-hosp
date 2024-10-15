import { prisma } from '@app/infra/prisma/client';
import {
  FindEntitiesAndCountResult,
  IAppointment,
  FindAppointmentsAndCountParams,
} from '@shared/entities';

import { IAppointmentRepository } from '../interfaces/appointment';

export class AppointmentRepository implements IAppointmentRepository {
  async findAll(
    patientId: string,
    skip: number,
    take: number,
    appointment_type?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<IAppointment[]> {
    return await prisma.appointment.findMany({
      skip,
      take,
      where: {
        patient_id: patientId,
        appointment_type: appointment_type ? appointment_type : undefined,
        created_at: {
          ...(startDate ? { gte: startDate } : {}),
          ...(endDate ? { lte: endDate } : {}),
        },
      },
    });
  }

  async findAndCountAll(
    params: FindAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>> {
    const {
      patientId,
      skip,
      take,
      appointmentType: appointment_type,
      startDate,
      endDate,
    } = params;

    const count = await prisma.appointment.count({
      where: {
        patient_id: patientId,
        appointment_type: appointment_type ? appointment_type : undefined,
        created_at: {
          ...(startDate ? { gte: startDate } : {}),
          ...(endDate ? { lte: endDate } : {}),
        },
      },
    });

    const appointments = await prisma.appointment.findMany({
      skip,
      take,
      where: {
        patient_id: patientId,
        appointment_type: appointment_type ? appointment_type : undefined,
        created_at: {
          ...(startDate ? { gte: startDate } : {}),
          ...(endDate ? { lte: endDate } : {}),
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      count,
      rows: appointments,
    };
  }

  async findById(appointment_id: number): Promise<IAppointment | null> {
    return prisma.appointment.findUnique({
      where: { id: appointment_id },
    });
  }

  async count(
    patientId: string,
    appointment_type?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<number> {
    return await prisma.appointment.count({
      where: {
        patient_id: patientId,
        appointment_type: appointment_type ? appointment_type : undefined,
        created_at: {
          ...(startDate ? { gte: startDate } : {}),
          ...(endDate ? { lte: endDate } : {}),
        },
      },
    });
  }

  async create(patient_id: string, data: IAppointment): Promise<IAppointment> {
    return await prisma.appointment.create({
      data: {
        ...data,
        patient_id,
      },
    });
  }

  async update(
    appointment_id: number,
    data: IAppointment,
  ): Promise<IAppointment | null> {
    return await prisma.appointment.update({
      where: { id: appointment_id },
      data: {
        ...data,
      },
    });
  }
}
