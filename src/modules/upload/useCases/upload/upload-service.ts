import { MultipartFile } from "@fastify/multipart";
import { pipeline } from 'node:stream';
import util from 'node:util';
import path from "node:path";
import fs from 'node:fs';

import { AppError } from "@app/errors";

const pump = util.promisify(pipeline)

export class UploadService {
    async execute(uploadData: MultipartFile | undefined) {
        if (!uploadData) {
            throw new AppError("No file uploaded")
        }

        if (!uploadData.mimetype.startsWith("image/")) {
            throw new AppError("Only image files are allowed")
        }

        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const ext = path.extname(uploadData.filename);
        const filename = `image_${timestamp}${ext}`;
        const uploadPath = path.join(__dirname, '../../../../uploads', 'img', filename);

        await pump(uploadData.file, fs.createWriteStream(uploadPath))

        return uploadPath;
    }
}