import { Role, Status } from '@prisma/client';

export type IUser = {
  id?: number;
  name: string;
  email: string;
  role: Role;
  image_url?: string | null;
  status?: Status;
  last_access?: Date | null;
  password?: string;
};
