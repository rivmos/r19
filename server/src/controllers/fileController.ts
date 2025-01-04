import express from 'express';
import { uploadFile } from '../utils/multer.config';
import { MulterError } from 'multer';
import Folder from '../models/Folder';
import File from '../models/File';

const router = express.Router()

router.post('/upload', (req, res, next) => {
    uploadFile.array('files[]')(req, res, (err) => {
        if (err instanceof MulterError) {
            // Multer-specific errors
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // General errors
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully', file: req.files });
    });
});

export default router;