import { useAppDispatch, useAppSelector } from "@/store";
import { setIsUploading, setView } from "@/store/slices/app.setting";
import { setIsCreatingFolder, setSelectedFolder } from "@/store/slices/explorerSlice";
import { CiSettings, CiCircleList, CiGrid41, CiFolderOn } from "react-icons/ci";
import { PiUploadThin } from "react-icons/pi";
import { VscNewFolder } from "react-icons/vsc";

const Toolbar = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.appSetting.view);

  const toggleView = () => {
    dispatch(setView(view === "grid" ? "list" : "grid"));
  };

  const handleCreateNewFolder = () => {
    dispatch(setIsCreatingFolder(true));
    dispatch(setSelectedFolder(null));
  };

  const handleUpload = () => {
    dispatch(setIsUploading(true));
  };

  return (
    <div className="w-full bg-gray-50 border-b-[1px] px-2 sm:px-4 py-2">
      <div className="flex items-center justify-between sm:justify-end space-x-2">
        
        {/* Toggle View Button */}
        <button
          onClick={toggleView}
          className="flex items-center hover:bg-indigo-50 p-1 w-8 h-8 justify-center rounded-md"
          aria-label={view === "grid" ? "Switch to list view" : "Switch to grid view"}
        >
          {view === "grid" ? (
            <CiCircleList className="h-5 w-5" />
          ) : (
            <CiGrid41 className="h-5 w-5" />
          )}
        </button>

        {/* Upload Button */}
        <button
          className="flex items-center hover:bg-indigo-50 p-1 w-8 h-8 justify-center rounded-md"
          aria-label="Upload"
          onClick={handleUpload}
        >
          <PiUploadThin className="h-5 w-5" />
        </button>

        {/* Create New Folder Button */}
        <button
          className="flex items-center hover:bg-indigo-50 p-1 w-8 h-8 justify-center rounded-md"
          aria-label="Create new folder"
          onClick={handleCreateNewFolder}
        >
          <VscNewFolder className="h-5 w-5" />
        </button>

        {/* Settings Button */}
        <button
          className="flex items-center hover:bg-indigo-50 p-1 w-8 h-8 justify-center rounded-md"
          aria-label="Settings"
        >
          <CiSettings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
