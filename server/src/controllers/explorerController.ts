import express, { Request, Response } from 'express';
import File from '../models/File';
import Folder from '../models/Folder';
import path from 'path';
import archiver from 'archiver';

const router = express.Router();

interface FolderRequest extends Request {
    body: {
        parentId?: string; // Adjust type based on your expected data
    };
}

interface DeleteRequest extends Request {
    body: {
        files: string[],
        folders: string[]
    };
}

router.get('/', async (req: FolderRequest, res: Response): Promise<any> => {

    const { parentId } = req.query;
    const query = parentId ? { parentId: parentId } : { parentId: null }

    try {
        const [folders, files] = await Promise.all([Folder.find(query), File.find(query)])

        return res.status(200).json({ folders, files });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching the content' });
    }
});

router.delete('/', async (req: DeleteRequest, res: Response): Promise<any> => {

    const { files, folders } = req.body;

    try {
        if (files.length > 0) {
            await File.deleteMany({ _id: { $in: files } })
        }
        if (folders.length > 0) {
            await Folder.deleteMany({ _id: { $in: folders } })
        }

        return res.status(200).json({ message: 'Deleted Successfully' });;
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching the content' });
    }
});

router.post('/download', async (req: Request, res: Response): Promise<any> => {
    const { files } = req.body;

    // Fetch files from the database
    const filesInDb = await File.find({ _id: { $in: files } });

    if (filesInDb.length === 0) {
        return res.status(404).json({ message: 'No files found' });
    }

    // Set the filename for the zip file
    const zipFileName = 'download.zip';

    // Create a zip stream
    const zip = archiver('zip', { zlib: { level: 9 } });

    // Set the response to download the zip file
    res.attachment(zipFileName);
    zip.pipe(res);

    // Add each file to the zip stream
    filesInDb.forEach(file => {
        const filePath = path.join(__dirname, '../uploads', file.filename); // Adjust path as necessary
        zip.file(filePath, { name: file.name });
    });

    // Finalize the zip file
    zip.finalize();

    // Handle any errors
    zip.on('error', (err:any) => {
        console.error('Download error:', err);
        res.status(500).send({ error: 'Could not create the zip file.' });
    });
});

export default router