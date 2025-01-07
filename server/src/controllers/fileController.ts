import express, { Request, Response } from 'express';
import { uploadFile } from '../utils/multer.config';
import { MulterError } from 'multer';
import Folder from '../models/Folder';
import File from '../models/File';

interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }

const router = express.Router()

router.get('/', async (req: Request, res: Response): Promise<any> => {

    const { parentId } = req.query;

    try {
        const files = await File.find(parentId ? { folderId:parentId } : { folderId: null });
        return res.status(200).json(files);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching folders' });
    }
});

router.post('/upload', uploadFile.array('files[]'), async (req, res) => {
    const { parentId } = req.body;
  
    try {
      if (!req.files || !(req.files instanceof Array)) {
        res.status(400).json({ error: 'No files were uploaded.' });
        return;
      }
  
      const savedFiles = [];
      for (const file of req.files as IFile[]) {
        const newFile = new File({ name: file.originalname, size: file.size, parentId:parentId, mimetype: file.mimetype, url: `/uploads/${file.originalname}` });
        const saved = await newFile.save();
        savedFiles.push(saved);
      }
  
      res.status(200).json({
        message: 'Files uploaded successfully',
        files: savedFiles,
      });
    } catch (error) {
        console.error('Upload Error:', error); // Log the full error to the console
      if (error instanceof MulterError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Server error during file upload.' });
      }
    }
  });
  
  

export default router;