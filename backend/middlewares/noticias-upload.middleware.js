import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const uploadDir = path.resolve('public/uploads/noticias');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    const nomeBase = path
      .basename(file.originalname, extensao)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'imagem';

    cb(null, `${Date.now()}-${nomeBase}${extensao}`);
  },
});

function fileFilter(_req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }

  cb(new Error('Apenas arquivos de imagem são permitidos.'));
}

export const uploadNoticiaImagem = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single('foto');
