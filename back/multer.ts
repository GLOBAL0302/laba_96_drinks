import multer from 'multer';
import config from './config';
import path from 'path';
import { promises as fs } from 'fs';
import { randomUUID } from 'node:crypto';

const imageStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    callback(null, destDir);
  },
  filename: (_req, file, callback) => {
    const ex = path.extname(file.originalname);
    callback(null, '/' + randomUUID() + ex);
  },
});

export const imagesUpload = multer({ storage: imageStorage });
