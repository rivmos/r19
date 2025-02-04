import classNames from 'classnames';
import { IContextMenu, IFile, IFolder } from '@/@types/explorer';
import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setRenaming, setSelected, explorerSelectors, makeIsSelectedSelector, updateFile } from '@/store/slices/explorerSlice';
import { trimString } from '@/utils/helper/string';
import { AiOutlineFileUnknown, AiOutlineFilePdf, AiOutlineAudio, AiOutlineFileImage } from "react-icons/ai";
import { apiDownloadFile, apiUpdateFile } from '@/services/FileService';
import { downloadBlob } from '@/utils/helper/download';
import { BsFileEarmarkText } from "react-icons/bs";
import useKeyboard from '@/utils/hooks/useKeyboard';

function FileIcon({ mimeType, size }) {
    // Define an array of mappings for MIME types and their corresponding icons
    const mimeTypeMappings = [
        { types: ['text/plain'], icon: <BsFileEarmarkText size={size} /> },
        { types: ['application/pdf'], icon: <AiOutlineFilePdf size={size} /> },
        { types: ['audio/mpeg', 'audio/wav', 'audio/ogg'], icon: <AiOutlineAudio size={size} /> },
        {
            types: [
                "image/jpeg",   // JPEG images
                "image/png",    // PNG images
                "image/gif",    // GIF images
                "image/webp",   // WebP images
                "image/svg+xml",// SVG images
                "image/bmp",    // Bitmap images
                "image/x-icon", // Icon files
                "image/vnd.microsoft.icon", // ICO files (alternative)
                "image/tiff",   // TIFF images
                "image/heif",   // HEIF images
                "image/heic",   // HEIC images
                "image/avif"    // AVIF images
            ], icon: <AiOutlineFileImage size={size} />
        },
    ];

    // Find the first matching icon
    const match = mimeTypeMappings.find(mapping => mapping.types.includes(mimeType));

    // Return the matched icon or a default icon
    return match?.icon || <AiOutlineFileUnknown size={size} />;
}


const File = ({ file, onContextMenu }: { file: IFile, onContextMenu: (e: React.MouseEvent, item: IContextMenu['item']) => void }) => {

    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const selectedFolder = useAppSelector(explorerSelectors.useSelectedFolder);
    const isSelected = useAppSelector(makeIsSelectedSelector({ id: file.id, type: 'file' }));
    const view = useAppSelector(state => state.appSetting.view);
    const isRenaming = useAppSelector(state => state.explorerSlice.isRenaming);
    // const isSelected = selectedFolder === file.id

    useKeyboard(fileRef.current);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isRenaming])

    const iconConfig = {
        size: view === 'grid' ? 36 : 12
    }

    const handleClick = (e) => {
        dispatch(setSelected({ isMulti: e.ctrlKey || e.metaKey, selection: { id: file.id, type: 'file' } }));
    }


    const handleDblClick = async () => {
        try {
            const res = await apiDownloadFile<Blob, { id: string }>({ id: file.id });
            if (res) {
                downloadBlob(res.data, file.name);
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const dotIndex = file.name.lastIndexOf('.');
    const onlyName = file.name.substring(0, dotIndex);
    const onlyExtention = file.name.substring(dotIndex);


    return (
        <div ref={fileRef} className={classNames("flex items-center select-none cursor-pointer hover:bg-indigo-50 p-1 border-b gap-1", { 'w-16 flex-col items-start justify-center border-b-0 gap-0 rounded-md': view === 'grid' }, { 'bg-indigo-200': isSelected })} onContextMenu={(e) => onContextMenu(e, { ...file, type: 'file' })} onClick={handleClick} onDoubleClick={handleDblClick}>
            <FileIcon mimeType={file.mimetype} size={iconConfig.size} />
            {(isRenaming && isSelected) ?
                <Formik
                    initialValues={{
                        name: onlyName, // to separate the editing of the extention
                        extention: onlyExtention
                    }}
                    onSubmit={async (values) => {
                        if (onlyName === values.name) {
                            dispatch(setRenaming(false));
                            return;
                        };

                        await dispatch(updateFile({ name: values.name + values.extention, id: file.id }));
                        dispatch(setRenaming(false));

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