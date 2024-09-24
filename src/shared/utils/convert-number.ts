import { Decimal } from '@prisma/client/runtime/library';

export const convertDecimalToNumber = (value?: number | Decimal | null) => {
  return value ? Number(value) : null;
};
