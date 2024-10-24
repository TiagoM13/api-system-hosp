/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@app/infra/prisma/client';
import {
  FindEntitiesAndCountResult,
  IAppointment,
  FindAppointmentsAndCountParams,
  FindAllAppointmentsAndCountParams,
} from '@shared/entities';
import { AppointmentStatus } from '@shared/enums';

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

  async findAllAppointments(
    params: FindAllAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>> {
    const { skip, take, appointment_type, startDate, endDate } = params;

    const where: any = {
      appointment_type: appointment_type ? appointment_type : undefined,
      scheduled_date: {
        ...(startDate ? { gte: startDate } : {}),
        ...(endDate ? { lte: endDate } : {}),
      },
    };

    const totalAppointments = await prisma.appointment.count({ where });
    const appointments = await prisma.appointment.findMany({
      skip,
      take,
      where,
      orderBy: {
        scheduled_date: 'desc',
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    return {
      count: totalAppointments,
      rows: appointments,
    };
  }

  async findAndCountAll(
    params: FindAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>> {
    const { patientId, skip, take, appointment_type, startDate, endDate } =
      params;

    const where: any = {
      patient_id: patientId,
      ...(appointment_type && { appointment_type }),
      ...(startDate && { scheduled_date: { gte: startDate } }),
      ...(endDate && { scheduled_date: { lte: endDate } }),
    };

    const count = await prisma.appointment.count({
      where,
      orderBy: {
        scheduled_date: 'desc',
      },
    });

    const appointments = await prisma.appointment.findMany({
      skip,
      take,
      where,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        doctor: true,
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
      include: {
        doctor: true,
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

  async updateAppointmentStatus(
    appointment_id: number,
    status: AppointmentStatus,
  ): Promise<IAppointment> {
    return await prisma.appointment.update({
      where: { id: appointment_id },
      data: {
        status,
      },
    });
  }
}
