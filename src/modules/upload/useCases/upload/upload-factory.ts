import { UploadController } from './upload-controller';
import { makeUploadService } from './upload-service';

export default function makeUploadController(): UploadController {
  return new UploadController(makeUploadService());
}
