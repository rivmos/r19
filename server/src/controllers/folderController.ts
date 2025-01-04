import express, { Request, Response } from 'express';
import Folder from "../models/Folder";
import { uploadFile } from '../utils/multer.config';
import { MulterError } from 'multer';

const router = express.Router();

interface FolderRequest extends Request {
    query: {
        parentId?: string; // Adjust type based on your expected data
    };
}


router.get('/', async (req: FolderRequest, res: Response): Promise<any> => {

    const { parentId } = req.query;

    try {
        const folders = await Folder.find(parentId ? { parentId } : { parentId: null });
        return res.status(200).json(folders);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching folders' });
    }
});

router.get('/:id', async (req: FolderRequest, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const folder = await Folder.find({ id });
        return res.status(200).json(folder);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching the folder' });
    }
})

router.post('/', async (req: Request, res: Response): Promise<any> => {

    const { id, name, parentId } = req.body;

    try {
        if (id) {
            // If an 'id' is provided, update the existing folder
            const updatedFolder = await Folder.findByIdAndUpdate(
                id,
                { name, parentId },
                { new: true }  // Return the updated folder
            );

            if (!updatedFolder) {
                return res.status(404).json({ error: 'Folder not found' });
            }

            return res.status(200).json(updatedFolder);
        } else {
            // If no 'id' is provided, create a new folder
            const newFolder = new Folder({ name, parentId });
            const savedFolder = await newFolder.save();
            return res.status(200).json(savedFolder);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error processing the folder' });
    }
});

router.delete('/', async (req: Request, res: Response) => {

    const { id } = req.query;

    try {
        const deletedFolder = await Folder.deleteOne({ _id: id }); // Adjust field name

        if (deletedFolder.deletedCount > 0) {
            res.status(200).json({ message: 'Folder deleted successfully' });
        } else {
            res.status(404).json({ message: 'Folder not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting folder', error });
    }
});

export default router