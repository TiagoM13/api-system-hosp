import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { IUser } from '@shared/entities';
import { intIdParamSchema } from '@shared/utils';

import { updateUserSchema } from './update-user-schema';
import { UpdateUserService } from './update-user-service';

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUserService: UpdateUserService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = intIdParamSchema.parse(this.request.params);
    const dto = updateUserSchema.parse(this.request.body);
    const loggedInUser = this.request.user as IUser;

    const updatedUser = await this.updateUserService.execute(
      id,
      dto,
      loggedInUser,
    );

    return this.ok({
      success: true,
      user: updatedUser,
    });
  }
}
