import { IContextMenu, IFile, IFolder } from '@/@types/explorer';
import { apiDownloadFile } from '@/services/FileService';
import { useAppDispatch } from '@/store';
import { deleteFile, deleteFolder, setCurrentFolder, setIsCreatingFolder, setRenaming, setSelectedFolder } from '@/store/slices/explorerSlice';
import { downloadBlob } from '@/utils/helper/download';
import { MdDeleteOutline, MdOutlineDriveFileRenameOutline, MdFolderOpen, MdOutlineDownload } from "react-icons/md";
import { VscNewFolder } from 'react-icons/vsc';

const ContextMenu = ({ contextMenu }: { contextMenu: IContextMenu }) => {
    const dispatch = useAppDispatch()

    const handleOpen = () => {
        dispatch(setCurrentFolder(contextMenu.item.id));
    }

    const handleRename = () => {
        dispatch(setRenaming(true));
        dispatch(setSelectedFolder(contextMenu.item.id));
    }

    const handleDelete = async () => {
        try {
            contextMenu.item.type === 'file' ? dispatch(deleteFile(contextMenu.item.id)) : dispatch(deleteFolder(contextMenu.item.id));
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const handleDownload = async () => {
        try {
            const res = await apiDownloadFile<Blob, { id: string }>({ id: contextMenu.item.id });
            if(res){
                downloadBlob(res.data, (contextMenu.item as IFile).name);
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const handleCreateNewFolder = () => {
        dispatch(setIsCreatingFolder(true));
        dispatch(setSelectedFolder(null));
    };


    return (
        <div
            className="fixed bg-white flex flex-col gap-1 rounded-lg shadow-xl border border-gray-100 
               overflow-hidden w-48 p-2 animate-in fade-in 
               duration-200"
            style={{
                top: contextMenu.y,
                left: contextMenu.x,
            }}
        >
            {contextMenu.item.type === 'folder' && <button
                onClick={handleOpen}
                className="w-full flex items-center space-x-3 
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdFolderOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Open</span>
            </button>}

            {contextMenu.item.type === 'file' && <button
                onClick={handleDownload}
                className="w-full flex items-center space-x-3 
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdOutlineDownload className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Download</span>
            </button>}

            <div className="h-px bg-gray-100 mx-3" />

            <button
                onClick={handleRename}
                className="w-full flex items-center space-x-3 
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdOutlineDriveFileRenameOutline className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Rename</span>
            </button>

            <div className="h-px bg-gray-100 mx-3" />

            <button
                onClick={handleCreateNewFolder}
                className="w-full flex items-center space-x-3 
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <VscNewFolder className="w-4 h-4 text-blue-500" />
                <span className="text-sm">New Folder</span>
            </button>

            <button
                onClick={handleDelete}
                className="w-full flex items-center space-x-3 
                 text-red-600 hover:bg-red-50 transition-colors 
                 duration-150"
            >
                <MdDeleteOutline className="w-4 h-4" />
                <span className="text-sm">Delete</span>
            </button>

        </div>
    )
}

export default ContextMenu