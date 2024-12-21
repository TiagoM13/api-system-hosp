import { Status } from '@prisma/client';

import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IUser,
} from '@shared/entities';

export interface IUserRepository {
  findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IUser>>;
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(dto: IUser): Promise<IUser>;
  update(id: number, dto: Partial<IUser>): Promise<IUser>;
  updateStatus(id: number, status: Status): Promise<string>;
  changePassword(id: number, dto: Partial<IUser>): Promise<IUser>;
  delete(id: number): Promise<IUser>;
  updateLastAccess(id: number): Promise<IUser>;
}
