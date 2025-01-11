import { IContextMenu, IFile, IFolder } from '@/@types/explorer';
import { apiDownloadFile } from '@/services/FileService';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteFile, deleteFolder, deleteMultiple, ISelected, setCurrentFolder, setIsCreatingFolder, setRenaming, setSelected } from '@/store/slices/explorerSlice';
import { downloadBlob } from '@/utils/helper/download';
import { MdDeleteOutline, MdOutlineDriveFileRenameOutline, MdFolderOpen, MdOutlineDownload } from "react-icons/md";
import { VscNewFolder } from 'react-icons/vsc';
import { groupByType } from '@/utils/helper/multiSelect';
import { apiDownloadMultiple } from '@/services/ExplorerService';
import { apiDownloadFolder } from '@/services/FolderService';


const ContextMenu = ({ contextMenu, multi }: {
    contextMenu: IContextMenu, multi: {
        fileInSelection: boolean,
        folderInSelection: boolean,
        isMultiSelection: boolean
    }
}) => {

    const dispatch = useAppDispatch()

    const selected = useAppSelector(state => state.explorerSlice.selected);

    const handleOpen = () => {
        dispatch(setCurrentFolder(contextMenu.item.id));
    }

    const handleRename = () => {
        dispatch(setRenaming(true));
        dispatch(setSelected({ isMulti: false, selection: { id: contextMenu.item.id, type: contextMenu.item.type } }));
    }

    const handleDelete = async () => {
        try {
            contextMenu.item.type === 'file' ? dispatch(deleteFile(contextMenu.item.id)) : dispatch(deleteFolder(contextMenu.item.id));
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const handleDeleteAll = async () => {

        const { files, folders } = groupByType(selected);

        try {
            dispatch(deleteMultiple({ files, folders }));
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const handleDownloadFile = async () => {
        try {
            const res = await apiDownloadFile<Blob, { id: string }>({ id: contextMenu.item.id });
            if (res) {
                downloadBlob(res.data, (contextMenu.item as IFile).name);
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };


    const handleDownloadFolder = async () => {
        try {
            const res = await apiDownloadFolder<Blob, { id: string }>({ id: contextMenu.item.id });
            if (res) {
                downloadBlob(res.data, (contextMenu.item as IFolder).name + '.zip');
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    
    const handleDownloadSingleItem = () => {
        contextMenu.item.type === 'file' ? handleDownloadFile() : handleDownloadFolder();
    }

    const handleDownloadAll = async () => {
        const { files, folders } = groupByType(selected);
        try {
            const res = await apiDownloadMultiple<Blob, { files: string[], folders: string[] }>({ files, folders });
            if (res) {
                downloadBlob(res.data, 'download.zip');
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const handleCreateNewFolder = () => {
        dispatch(setIsCreatingFolder(true));
        dispatch(setSelected(null));
    };

    return (
        <div
            className="fixed bg-white flex flex-col gap-1 rounded-lg shadow-xl border bord
            er-gray-100 
               overflow-hidden w-48 p-2 animate-in fade-in 
               duration-200"
            style={{
                top: Math.min(contextMenu.y, window.innerHeight - 200), // Prevent overflow
                left: Math.min(contextMenu.x, window.innerWidth - 200), // Adjust width dynamically
            }}
        >
            {(contextMenu.item.type === 'folder' && !multi.isMultiSelection) && <button
                onClick={handleOpen}
                className="w-full flex items-center space-x-3 p-1
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdFolderOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Open</span>
            </button>}

            <button
                onClick={() => multi.isMultiSelection ? handleDownloadAll() : handleDownloadSingleItem()}
                className="w-full flex items-center space-x-3 p-1
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdOutlineDownload className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Download {multi.isMultiSelection ? 'All' : ''}</span>
            </button>

            {/* <div className="h-px bg-gray-100 mx-3" /> */}

            {!multi.isMultiSelection && <button
                onClick={handleRename}
                className="w-full flex items-center space-x-3 p-1
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdOutlineDriveFileRenameOutline className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Rename</span>
            </button>}

            {/* <div className="h-px bg-gray-100 mx-3" /> */}

            {!multi.isMultiSelection && <button
                onClick={handleCreateNewFolder}
                className="w-full flex items-center space-x-3 p-1
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <VscNewFolder className="w-4 h-4 text-blue-500" />
                <span className="text-sm">New Folder</span>
            </button>}

            <button
                onClick={() => multi.isMultiSelection ? handleDeleteAll() : handleDelete()}
                className="w-full flex items-center space-x-3 p-1
                 text-red-600 hover:bg-red-50 transition-colors 
                 duration-150"
            >
                <MdDeleteOutline className="w-4 h-4" />
                <span className="text-sm">Delete {multi.isMultiSelection ? 'All' : ''}</span>
            </button>

        </div>
    )
}

export default ContextMenu