import { UploadController } from "./upload-controller"
import { UploadService } from "./upload-service"

export function uploadFactory() {
    const service = new UploadService()
    const controller = new UploadController(service)

    return controller
}

export default uploadFactory
