import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import { verifyAuthorization } from '@app/infra/http/middleware';
import { makeUploadController } from '@modules/upload/useCases/upload/upload-factory';
import { Role } from '@shared/enums';

export const uploadRoutes = async (app: FastifyInstance) => {
  app.post(
    '/upload',
    {
      preHandler: [
        verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      ],
    },
    bindController(makeUploadController()),
  );
};
