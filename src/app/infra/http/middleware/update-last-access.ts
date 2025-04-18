import { FastifyReply, FastifyRequest } from 'fastify';

import { app } from '@app/app';
import { UserRepository } from '@modules/users/repositories/user-repository';
import {
  EXPIRED_TOKEN,
  INVALID_TOKEN,
  TOKEN_NOT_FOUND,
} from '@shared/constants/messages';

export const updateLastAccess = (userRepository: UserRepository) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(401).send({ message: TOKEN_NOT_FOUND });
      }

      const token = authorization.split(' ')[1];
      const { id } = app.jwt.verify<{ id: string }>(token);

      await userRepository.updateLastAccess(id);

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
