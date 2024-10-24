import { UploadController } from './upload-controller';
import { UploadService } from './upload-service';

export const makeUploadService = (): UploadService => {
  return new UploadService();
};

export const makeUploadController = (): UploadController => {
  return new UploadController(makeUploadService());
};
