import { type BaseController } from './baseController';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bindController(controller: BaseController): any {
  return controller.execute.bind(controller);
}
