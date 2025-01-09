import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsUploading, useIsUploading } from "@/store/slices/app.setting";
import { explorerSelectors, uploadFile } from "@/store/slices/explorerSlice";
import { PiUploadThin } from "react-icons/pi";
import { VscClose } from "react-icons/vsc";
import { apiUploadFile } from "@/services/FolderService";
import { IFile } from "@/@types/explorer";

const FileUploader = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentFolder = useAppSelector(explorerSelectors.useCurrentFolder);

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
    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = droppedFiles.filter((file) => file.size > maxSize);

    if (invalidFiles.length > 0) {
      setError("Some files exceed the 5MB limit");
      return;
    }

    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCloseUploadScreen = () => {
    dispatch(setIsUploading(false));
  };

  const handleUpload = async () => { 
    await dispatch(uploadFile({parentId: currentFolder, files: files}))
    dispatch(setIsUploading(false));
  }


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseUploadScreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="inset-0 flex items-center justify-center h-full bg-opacity-50 z-50"
    >
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={handleCloseUploadScreen}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <VscClose className="w-5 h-5" />
        </button>
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <PiUploadThin className="sm:w-16 sm:h-16 w-8 h-8 text-gray-400" />
            <div className="text-sm sm:text-lg font-semibold text-gray-700">
              Drag and drop files here
            </div>
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
            <div className="text-xs sm:text-sm text-gray-500">Maximum file size: 5MB</div>
          </div>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-600">
            {error}
          </div>
        )}
        {files.length > 0 && (
          <div className="mt-4 flex flex-col gap-2 z">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md shadow-sm"
              >
                <span className="text-sm truncate">{file.name}</span>
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
        <button
          onClick={handleUpload}
          className="mt-6 w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Upload Now
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
