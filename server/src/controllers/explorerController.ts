import express, {Request, Response} from 'express';
import File from '../models/File';
import Folder from '../models/Folder';

const router = express.Router();

interface FolderRequest extends Request {
    query: {
        parentId?: string; // Adjust type based on your expected data
    };
}

router.get('/', async (req: FolderRequest, res: Response): Promise<any> => {

    const { parentId } = req.query;
    const query = parentId ? { parentId: parentId } : { parentId: null }

    try {
        const [folders, files] = await Promise.all([ Folder.find(query), File.find(query) ])

        return res.status(200).json({folders, files});
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching the content' });
    }
});

export default router