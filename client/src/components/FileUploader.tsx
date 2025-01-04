import { apiUploadFile } from '@/services/FolderService';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsUploading, useIsUploading } from '@/store/slices/app.setting';
import { useCurrentFolder } from '@/store/slices/doc.data';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PiUploadThin } from "react-icons/pi";
import { VscClose } from "react-icons/vsc";

const FileUploader = () => {

    const dispatch = useAppDispatch();

    const ref = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);

    const isUploading = useAppSelector(useIsUploading);
    const currentFolder = useAppSelector(useCurrentFolder);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setError(null);

        const droppedFiles = Array.from(e.dataTransfer.files);

        // Add validation here if needed
        const maxSize = 5 * 1024 * 1024; // 5MB
        const invalidFiles = droppedFiles.filter(file => file.size > maxSize);

        if (invalidFiles.length > 0) {
            setError('Some files exceed the 5MB limit');
            return;
        }

        setFiles(prev => [...prev, ...droppedFiles]);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...selectedFiles]);
        }
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleCloseUploadScreen = () => {
        dispatch(setIsUploading(false));
    }

    const handleUpload = async () => {
        const res = await apiUploadFile({parentId: currentFolder, files: files})
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            console.log('ran');
            if (e.key === 'Escape') {
                handleCloseUploadScreen();
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div ref={ref} className="relative flex-col w-full min-h-screen justify-center flex items-center mx-auto">
            <div className='absolute top-0 right-0'>
                <button
                    onClick={handleCloseUploadScreen}
                    className="p-1 hover:bg-gray-200 rounded"
                >
                    <VscClose className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center gap-4">
                    <PiUploadThin className="w-12 h-12 text-gray-400" />
                    <div className="text-lg font-medium">Drag and drop files here</div>
                    <div className="text-sm text-gray-500">or</div>
                    <label className="cursor-pointer">
                        <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Browse Files
                        </span>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileInput}
                            multiple
                        />
                    </label>
                    <div className="text-sm text-gray-500">Maximum file size: 5MB</div>
                </div>
                <button
                    type='button'
                    onClick={handleUpload}
                >
                    Upload Now
                </button>
            </div>

            {/* {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-sm truncate">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                            </div>
                            <button
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-gray-200 rounded"
                            >
                                <VscClose className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;