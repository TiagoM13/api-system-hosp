import { FastifyReply, FastifyRequest } from 'fastify';

import { app } from '@app/app';
import { Role } from '@shared/enums/role';

interface TokenData {
  id: number;
  role: Role;
  status: string;
}

export const verifyToken = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ message: 'Token não fornecido' });
    }

    const token = authorization.split(' ')[1];
    const decoded = app.jwt.verify<TokenData>(token);

    if (decoded.status === 'inativo') {
      return res
        .status(403)
        .send({ message: 'Usuário inativo! Você está sem acesso no momento' });
    }

    return (req.user = decoded);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('expired')) {
        return res.status(401).send({ message: 'O token expirou' });
      }
    }

    return res.status(401).send({ message: 'Token inválido' });
  }
};

export const verifyAuthorization = (roleIds: Role[] = []) => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(401).send({ message: 'Token não fornecido' });
      }

      const token = authorization.split(' ')[1];
      const { id, role, status } = app.jwt.verify<TokenData>(token);

      if (status === 'inativo') {
        return res.status(403).send({
          message: 'Usuário inativo! Você está sem acesso no momento',
        });
      }

      if (!roleIds.includes(role)) {
        return res
          .status(403)
          .send({ message: 'Acesso proibido! Tipo de usuário não autorizado' });
      }

      req.headers.id = String(id);
      req.headers.role = role;
      req.headers.status = String(status);

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
