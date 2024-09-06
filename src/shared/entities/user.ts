export enum Role {
  ADMIN = 0,
  EDITOR = 1,
  CLINICAL = 2,
}

export type IUser = {
  id?: number;
  name: string;
  email: string;
  role: number;
  image_url?: string | null;
  status?: string;
  last_access?: Date | null;
  password?: string;
}
