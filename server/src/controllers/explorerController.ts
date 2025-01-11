import express, { Request, Response } from 'express';
import File, { IFile } from '../models/File';
import Folder, { IFolder } from '../models/Folder';
import path from 'path';
import archiver, { Archiver } from 'archiver';
import mongoose from 'mongoose';

const router = express.Router();

interface FolderRequest extends Request {
    body: {
        parentId?: string; // Adjust type based on your expected data
    };
}

interface DeleteRequest extends Request {
    body: {
        files: mongoose.Types.ObjectId[],
        folders: mongoose.Types.ObjectId[]
    };
}

type IFolderPopulated = Omit<IFolder, "files"> & {
    files: IFile[]; // Override 'files' to be an array of IFile
};

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

const rec = async (archiver: Archiver, folders: IFolderPopulated[]) => {
    folders.forEach(folder => {
        folder.files?.forEach(file => {
            const filePath = path.join(__dirname, '../uploads', file.filename); // Adjust path as necessary
            archiver.file(filePath, { name: `${folder.name}/${file.name}` });
        })
    });
}

export const addFoldersToZip = async (
    zip: Archiver,
    folderIds: mongoose.Types.ObjectId[],
    innerPath: string
): Promise<void> => {
    const foldersInDb = await Folder.find({ _id: { $in: folderIds } }).populate('files subFolders').exec();

    for (const folder of foldersInDb) {
        const currentPath = innerPath + folder.name + '/';

        // Add files in the current folder
        if (folder.files?.length) {
            for (const file of folder.files) {
                //@ts-ignore
                const filePath = path.join(__dirname, '../uploads', file.filename); // Adjust path as necessary
                //@ts-ignore
                zip.file(filePath, { name: `${currentPath}${file.name}` });
            }
        }

        // Recursively add subfolders
        if (folder.subFolders?.length) {
            await addFoldersToZip(zip, folder.subFolders, currentPath);
        }
    }
};


router.post('/download', async (req: DeleteRequest, res: Response): Promise<any> => {
    const { files, folders } = req.body;

    try {
        // Fetch files and folders from the database
        const filesInDb = await File.find({ _id: { $in: files } });
        const foldersInDb = await Folder.find({ _id: { $in: folders } }).populate('files').exec();

        if (!filesInDb.length && !foldersInDb.length) {
            return res.status(404).json({ message: 'No content found' });
        }

        // Create a zip stream
        const zip = archiver('zip', { zlib: { level: 9 } });
        const zipFileName = 'download.zip';

        res.attachment(zipFileName);
        zip.pipe(res);

        // Add files directly to the ZIP
        filesInDb.forEach(file => {
            const filePath = path.join(__dirname, '../uploads', file.filename);
            zip.file(filePath, { name: file.name });
        });

        // Add folders recursively
        await addFoldersToZip(zip, folders, '');

        // Finalize the ZIP file
        await zip.finalize();
    } catch (error) {
        console.error('Error creating ZIP file:', error);
        res.status(500).json({ error: 'Could not create the zip file.' });
    }
});


export default router