import { Role, Status } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { app } from '@app/app';
import {
  EXPIRED_TOKEN,
  INVALID_TOKEN,
  TOKEN_NOT_FOUND,
  USER_INACTIVE,
  USER_NOT_AUTHORIZED,
} from '@shared/constants/messages';

interface TokenData {
  id: string;
  role: Role;
  status: Status;
}

export const verifyAuthorization = (roleIds: Role[] = []) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(401).send({ message: TOKEN_NOT_FOUND });
      }

      const token = authorization.split(' ')[1];
      const { id, role, status } = app.jwt.verify<TokenData>(token);

      if (status === Status.INACTIVE) {
        return res.status(403).send({
          message: USER_INACTIVE,
        });
      }

      if (!roleIds.includes(role)) {
        return res.status(403).send({ message: USER_NOT_AUTHORIZED });
      }

      req.user = { id, role, status };

      return;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('expired')) {
          return res.status(401).send({ message: EXPIRED_TOKEN });
        }
      }

      return res.status(401).send({ message: INVALID_TOKEN });
    }
  };
};
