import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { IUser } from '@shared/entities';
import { uuidParamSchema } from '@shared/utils';

import { updateUserBasicInfoSchema } from './update-user-basic-info-schema';
import { UpdateUserBasicInfoService } from './update-user-basic-info-service';

export class UpdateUserBasicInfoController extends BaseController {
  constructor(
    private readonly updateUserBasicInfoService: UpdateUserBasicInfoService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = uuidParamSchema.parse(this.request.params);
    const dto = updateUserBasicInfoSchema.parse(this.request.body);
    const loggedInUser = this.request.user as IUser;

    const user = await this.updateUserBasicInfoService.execute(
      id,
      dto,
      loggedInUser,
    );

    return this.ok({
      success: true,
      user,
    });
  }
}
