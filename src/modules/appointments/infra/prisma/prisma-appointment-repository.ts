/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppointmentStatus, Prisma } from '@prisma/client';

import { prisma } from '@app/infra/prisma/client';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import {
  FindEntitiesAndCountResult,
  IAppointment,
  FindAppointmentsAndCountParams,
  FindAllAppointmentsAndCountParams,
} from '@shared/entities';

export class PrismaAppointmentRepository implements AppointmentRepository {
  async findAllAppointments(
    params: FindAllAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>> {
    const { name, skip, take, appointment_type, scheduled_date, status } =
      params;

    const where: Prisma.AppointmentWhereInput = {
      ...(appointment_type && { appointment_type }),
      ...(scheduled_date && {
        scheduled_date: {
          gte: scheduled_date,
          lt: new Date(scheduled_date.getTime() + 24 * 60 * 60 * 1000), // Adiciona 1 dia
        },
      }),
      ...(status && { status }),
      patient: {
        ...(name && { name: { contains: name } }),
      },
    };

    const totalAppointments = await prisma.appointment.count({ where });
    const appointments = await prisma.appointment.findMany({
      skip,
      take,
      where,
      orderBy: {
        created_at: 'desc',
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
    const { patient_id, skip, take, appointment_type, scheduled_date, status } =
      params;

    const where: Prisma.AppointmentWhereInput = {
      patient_id: patient_id,
      ...(appointment_type && { appointment_type }),
      ...(scheduled_date && {
        scheduled_date: {
          gte: scheduled_date,
          lt: new Date(scheduled_date.getTime() + 24 * 60 * 60 * 1000), // Adiciona 1 dia
        },
      }),
      ...(status && { status }),
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
    data: Partial<IAppointment>,
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
  ): Promise<AppointmentStatus> {
    const appointment = await prisma.appointment.update({
      where: { id: appointment_id },
      data: {
        status,
      },
      select: { status: true },
    });
    return appointment.status;
  }
}
