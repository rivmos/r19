import classNames from 'classnames';
import { IFolder } from '@/@types/explorer';
import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { PiFolderSimpleThin, PiFolderSimpleFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCurrentFolder, setRenaming, setSelectedFolder, updateFolder, explorerSelectors } from '@/store/slices/explorerSlice';
import { apiCreateOrUpdateFolder } from '@/services/FolderService';
import { trimString } from '@/utils/helper/string';
import { IContextMenu } from '@/@types/explorer';
import useResponsive from '@/utils/hooks/useResponsive';

const Folder = ({ folder, onContextMenu }: { folder: IFolder, onContextMenu: (e: React.MouseEvent, item: IContextMenu['item']) => void }) => {

    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const selectedFolder = useAppSelector(explorerSelectors.useSelectedFolder);
    const currentFolder = useAppSelector(explorerSelectors.useCurrentFolder);
    const view = useAppSelector(state => state.appSetting.view);
    const isRenaming = useAppSelector(state => state.explorerSlice.isRenaming);
    const isSelected = selectedFolder === folder.id;
    const responsive = useResponsive();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isRenaming])

    const iconConfig = {
        size: view === 'grid' ? 36 : 12
    }

    const handleDblClick = () => {
        dispatch(setCurrentFolder(folder.id));
    }

    const handleClick = () => {
        dispatch(setSelectedFolder(folder.id));
        // if(responsive.smaller.sm){
            dispatch(setCurrentFolder(folder.id))
        // } 
    }

    const handleBlur = () => {
        dispatch(setSelectedFolder(null));
    };


    return (
        <div onBlur={handleBlur} className={classNames("flex items-center select-none cursor-pointer hover:bg-indigo-50 p-1 border-b gap-1", { 'w-16 flex-col items-start justify-center border-b-0 gap-0 rounded-md': view === 'grid' }, { 'bg-indigo-200': isSelected })} onContextMenu={(e) => onContextMenu(e, {...folder, type: 'folder'})} onClick={handleClick} onDoubleClick={handleDblClick}>
            {isSelected ? <PiFolderSimpleFill size={iconConfig.size} className="text-indigo-500" /> : <PiFolderSimpleThin size={iconConfig.size} className="text-indigo-500" />}
            {(isRenaming && isSelected) ?
                <Formik
                    initialValues={{
                        name: folder.name
                    }}
                    onSubmit={async (values) => {
                        if(folder.name === values.name) {
                            dispatch(setRenaming(false));
                            return;
                        };                        ;
                        const res = await apiCreateOrUpdateFolder<IFolder, any>({ ...values, parentId: currentFolder, id: folder.id });
                        if (res.data) {
                            dispatch(updateFolder(res.data));
                            dispatch(setRenaming(false));
                        }
                    }}
                >
                    {
                        (props) => (
                            <Form className='flex'>
                                <Field id="name" name="name" onBlur={props.submitForm} ref={inputRef} placeholder="" className="w-12 h-4 !p-1 text-center bg-indigo-400 text-white rounded-md focus:border-0 focus:ring-0 focus:outline-none text-xs" autoComplete="off" />
                                <button type="submit" className='hidden'>Submit</button>
                            </Form>
                        )
                    }
                </Formik> :
                <span className={classNames("text-xs rounded-xl")}>
                    {view === 'grid' ? trimString(folder.name) : folder.name}
                </span>
            }
        </div >
    )
}

export default Folder