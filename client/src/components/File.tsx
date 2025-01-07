import classNames from 'classnames';
import { IContextMenu, IFile, IFolder } from '@/@types/explorer';
import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { PiFolderSimpleThin, PiFolderSimpleFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCurrentFolder, setRenaming, setSelectedFolder, updateFolder, useCurrentFolder, useSelectedFolder } from '@/store/slices/doc.data';
import { apiCreateOrUpdateFolder } from '@/services/FolderService';
import { trimString } from '@/utils/helper/string';
import { AiOutlineFileUnknown, AiOutlineFilePdf, AiOutlineAudio } from "react-icons/ai";


function FileIcon({ mimeType, size }) {
  const mimeIconMap = {
    'application/pdf': <AiOutlineFilePdf size={size}/>,
    'audio/mpeg': <AiOutlineAudio size={size}/>,
  };
  const icon = mimeIconMap[mimeType] || <AiOutlineFileUnknown size={size} />; // Default icon
  return icon;
}


const File = ({ file, onContextMenu }: { file: IFile, onContextMenu: (e: React.MouseEvent, item: IContextMenu['item']) => void }) => {

    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const selectedFolder = useAppSelector(useSelectedFolder)
    const currentFolder = useAppSelector(useCurrentFolder)
    const view = useAppSelector(state => state.appSetting.view)
    const isRenaming = useAppSelector(state => state.docData.isRenaming)
    const isSelected = selectedFolder === file.id

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isRenaming])

    const iconConfig = {
        size: view === 'grid' ? 36 : 12
    }

    // const handleDblClick = () => {
    //     dispatch(setCurrentFolder(file));
    // }

    const handleClick = () => {
        if(isSelected) return
        dispatch(setSelectedFolder(file.id));
    }


    return (
        <div className={classNames("flex items-center select-none cursor-pointer hover:bg-indigo-50 p-1 border-b gap-1", { 'w-16 flex-col items-start justify-center border-b-0 gap-0 rounded-md': view === 'grid' }, { 'bg-indigo-200': isSelected })} onContextMenu={(e) => onContextMenu(e, {id: file.id, type: 'file'})} onClick={handleClick} >
            {/* {isSelected ? <PiFolderSimpleFill size={iconConfig.size} className="text-indigo-500" /> : <PiFolderSimpleThin size={iconConfig.size} className="text-indigo-500" />} */}
            <FileIcon mimeType={file.mimetype} size={iconConfig.size}/>
            {(isRenaming && isSelected) ?
                <Formik
                    initialValues={{
                        name: file.name
                    }}
                    onSubmit={async (values) => {
                        if(file.name === values.name) {
                            dispatch(setRenaming(false));
                            return;
                        };                        ;
                        const res = await apiCreateOrUpdateFolder<IFolder, any>({ ...values, parentId: currentFolder.id, id: file.id });
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
                    {view === 'grid' ? trimString(file.name) : file.name}
                </span>
            }
        </div >
    )
}

export default File