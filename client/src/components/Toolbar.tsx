import { useAppDispatch, useAppSelector } from "@/store";
import { setView } from "@/store/slices/app.setting";
import { setIsCreatingFolder, setSelectedFolder } from "@/store/slices/doc.data";
import { CiSettings, CiCircleList, CiGrid41, CiFolderOn } from "react-icons/ci";

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

  return (
    <div className="w-full bg-gray-50 border-b-[1px] px-2 sm:px-4 py-2">
      {/* Right section */}
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

        {/* Settings Button */}
        <button
          className="flex items-center hover:bg-indigo-50 p-1 w-8 h-8 justify-center rounded-md"
          aria-label="Settings"
        >
          <CiSettings className="h-5 w-5" />
        </button>

        {/* Create New Folder Button */}
        <button
          className="flex items-center hover:bg-indigo-50 p-1 w-8 h-8 justify-center rounded-md"
          aria-label="Create new folder"
          onClick={handleCreateNewFolder}
        >
          <CiFolderOn className="h-5 w-5" />
          <span className="hidden sm:inline-block sm:ml-1">+</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
