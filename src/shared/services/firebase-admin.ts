import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";
require('dotenv').config()

import admin from 'firebase-admin';

import { serviceAccount } from '../keys/firebase-key';

const serviceAccountVar: any = serviceAccount;

const BUCKET = process.env.BUCKET_FIREBASE;

console.log(serviceAccountVar);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccountVar),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  const file = req.file;
  const uuid = uuidv4();
  const fileFormat = file.originalname.split('.').pop();
  const filename = `${uuid}.${fileFormat}`;
  
  let prefix = '';

  if (file.mimetype.startsWith('image/') && req.path.includes('/companies')) {
    prefix = 'companies/images/';
  } else if (file.mimetype.startsWith('image/') && req.path.includes('/users')) {
    prefix = 'users/images/'
  };

  const storageFile = bucket.file(prefix + filename);

  const stream = storageFile.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    }
  });

  stream.on("error", (e: any) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    await storageFile.makePublic();

    (file as any).firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${prefix}${filename}`;
    (file as any).filename = filename;

    next();
  });

  stream.end(file.buffer);
};

export default uploadFile;