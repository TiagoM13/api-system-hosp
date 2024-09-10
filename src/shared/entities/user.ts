export type IUser = {
  id?: number;
  name: string;
  email: string;
  role: string;
  image_url?: string | null;
  status?: string;
  last_access?: Date | null;
  password?: string;
};
