import { IContextMenu, IFolder } from '@/@types/explorer';
import { apiDeleteFolder } from '@/services/FolderService';
import { useAppDispatch } from '@/store';
import { deleteFolder, setCurrentFolder, setRenaming, setSelectedFolder } from '@/store/slices/doc.data';
import { MdDeleteOutline, MdOutlineDriveFileRenameOutline, MdFolderOpen } from "react-icons/md";

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
            const res = await apiDeleteFolder<IFolder, { id: string }>({ id: contextMenu.item.id });
            if (res) {
                dispatch(deleteFolder(contextMenu.item.id))
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
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
            <button
                onClick={handleOpen}
                className="w-full flex items-center space-x-3 
                 text-gray-700 hover:bg-gray-50 transition-colors 
                 duration-150"
            >
                <MdFolderOpen className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Open</span>
            </button>

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