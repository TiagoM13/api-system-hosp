import z from 'zod';

import { AppError } from '@app/errors/app-client';

export const appointmentParamId = z.object({
  patientId: z.string().uuid(),
});

export const appointmentParamsSchema = z.object({
  patientId: z.string().uuid(),
  appointmentId: z.coerce.number().int(),
});

export const appointmentQuerySchema = z
  .object({
    name: z.string().optional(),
    page: z.coerce.number().default(1),
    items_per_page: z.coerce.number().max(500).default(10),
    appointment_type: z.string().optional(),
    start_date: z.preprocess(
      val => {
        if (typeof val === 'string' && val.trim() === '') return undefined;

        if (typeof val === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(val)) {
          throw new AppError(
            'Data de início inválida. Use o formato YYYY-MM-DD',
          );
        }
        return typeof val === 'string' ? new Date(val) : val;
      },
      z
        .date({
          invalid_type_error:
            'Data de início inválida. Use o formato YYYY-MM-DD',
        })
        .optional(),
    ),
    end_date: z.preprocess(
      val => {
        if (typeof val === 'string' && val.trim() === '') return undefined;

        if (typeof val === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(val)) {
          throw new AppError('Data de fim inválida. Use o formato YYYY-MM-DD');
        }
        return typeof val === 'string' ? new Date(val) : val;
      },
      z
        .date({
          invalid_type_error: 'Data de fim inválida. Use o formato YYYY-MM-DD',
        })
        .optional(),
    ),
  })
  .refine(
    data => {
      if (data.start_date && data.end_date) {
        return data.start_date <= data.end_date;
      }
      return true;
    },
    {
      message: 'A data de início não pode ser maior que a data de fim',
      path: ['start_date'],
    },
  );
