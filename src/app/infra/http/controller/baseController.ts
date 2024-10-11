/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FastifyReply as Response,
  type FastifyRequest as Request,
} from 'fastify';

import { FindAndCountAll, formatPaginate } from '@shared/utils/format-paginate';

export abstract class BaseController {
  protected request!: Request;
  protected response!: Response;

  protected abstract handle(): Promise<Response>;

  public async execute(request: Request, response: Response): Promise<void> {
    this.request = request;
    this.response = response;

    await this.handle();
  }

  protected jsonResponse(statusCode: number, message: string): Response {
    return this.response.status(statusCode).send({ message });
  }

  protected ok<T>(dto?: T): Response {
    if (dto) return this.response.status(200).send(dto);

    return this.response.status(200).send();
  }

  protected paginate<T>(model: FindAndCountAll<T>, rowsKey: string): Response {
    return this.response.send({
      meta: formatPaginate(this.request.query as any, model),
      [rowsKey]: model.rows,
    });
  }

  protected created<T>(dto?: T): Response {
    if (dto) return this.response.status(201).send(dto);

    return this.response.status(201).send();
  }

  protected unauthorized(message: string): Response {
    return this.jsonResponse(401, message || 'Unauthorized');
  }

  notFound(message: string): Response {
    return this.response.status(404).send({ message: message || 'Not Found' });
  }

  internalServerError(message: string) {
    return this.response
      .status(500)
      .send({ message: message || 'Internal Server Error' });
  }
}
