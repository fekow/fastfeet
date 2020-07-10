import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // vai pra ca caso nao funcionar destination
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
