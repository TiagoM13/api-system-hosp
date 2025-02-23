import { Status } from '@prisma/client';
import dayjs from 'dayjs';

import { prisma } from '@app/infra/prisma/client';

export class PatientStatusService {
  static async execute() {
    const threeMonthsAgo = dayjs().subtract(3, 'month');

    const patients = await prisma.patient.findMany({
      where: {
        status: Status.ACTIVE,
        appointments: {
          some: {
            scheduled_date: { lt: threeMonthsAgo.toDate() },
          },
        },
      },
      include: {
        appointments: {
          select: {
            scheduled_date: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (patients.length === 0) {
      return;
    }

    const updates = patients.map(patient => {
      return prisma.patient.update({
        where: { id: patient.id },
        data: { status: Status.INACTIVE },
      });
    });

    await Promise.all(updates);
  }
}
