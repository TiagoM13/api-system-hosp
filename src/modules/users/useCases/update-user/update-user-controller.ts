import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { schemaBody, schemaParams } from '@modules/users/schemas';
import { IUser } from '@shared/entities';

import { UpdateUserService } from './update-user-service';

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUserService: UpdateUserService) {
    super();
  }

  async handle(): Promise<FastifyReply> {
    const { userId } = schemaParams.parse(this.request.params);
    const data = schemaBody.parse(this.request.body);
    const loggedInUser = this.request.user as IUser;

    const updatedUser = await this.updateUserService.execute(
      userId,
      data,
      loggedInUser,
    );

    return this.ok({
      success: true,
      user: updatedUser,
    });
  }
}
