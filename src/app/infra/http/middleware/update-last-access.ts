import { FastifyReply, FastifyRequest } from 'fastify';

import { app } from '@app/app';
import { UserRepository } from '@shared/repositories/implementations';

export const updateLastAccess = (userRepository: UserRepository) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(401).send({ message: 'Token não fornecido' });
      }

      const token = authorization.split(' ')[1];
      const { id } = app.jwt.verify<{ id: number }>(token);

      await userRepository.updateLastAccess(id);

      return;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('expired')) {
          return res.status(401).send({ message: 'O token expirou' });
        }
      }

      return res.status(401).send({ message: 'Token inválido' });
    }
  };
};
