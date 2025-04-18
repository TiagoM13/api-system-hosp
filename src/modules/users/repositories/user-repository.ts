import { Status } from '@prisma/client';

import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IUser,
} from '@shared/entities';

import { UpdateUserBasicInfoDTO } from '../useCases/update-user-basic-info/update-user-basic-info-schema';

export interface UserRepository {
  findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IUser>>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(dto: IUser): Promise<IUser>;
  update(id: string, dto: Partial<IUser>): Promise<IUser>;
  updateStatus(id: string, status: Status): Promise<Status>;
  changePassword(id: string, dto: Partial<IUser>): Promise<IUser>;
  delete(id: string): Promise<IUser>;
  updateLastAccess(id: string): Promise<IUser>;
  updateUserBasicInfo(id: string, dto: UpdateUserBasicInfoDTO): Promise<IUser>;
}
