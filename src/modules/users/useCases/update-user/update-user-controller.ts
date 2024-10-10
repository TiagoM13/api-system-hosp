import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { userDataSchema } from '@modules/users/schemas';
import { IUser } from '@shared/entities';
import { paramIdSchema } from '@shared/utils';

import { UpdateUserService } from './update-user-service';

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUserService: UpdateUserService) {
    super();
  }

  async handle(): Promise<FastifyReply> {
    const { id } = paramIdSchema.parse(this.request.params);
    const data = userDataSchema.parse(this.request.body);
    const loggedInUser = this.request.user as IUser;

    const updatedUser = await this.updateUserService.execute(
      id,
      data,
      loggedInUser,
    );

    return this.ok({
      success: true,
      user: updatedUser,
    });
  }
}
