import { useEffect } from "react"
import Folder from "./Folder"
import { useAppDispatch, useAppSelector } from "@/store";
import { getExplorer, explorerSelectors } from "@/store/slices/explorerSlice";
import useContextMenu from "@/utils/hooks/useContextMenu";
import ContextMenu from "./ContextMenu";
import classNames from "classnames";
import NewFolder from "./NewFolder";
import { isEmpty } from 'lodash';
import { useIsCreatingNotebook, useIsUploading } from "@/store/slices/app.setting";
import FileUploader from "./FileUploader";
import File from "./File";
import NotebookCreator from "./NotebookCreator";

const View = () => {

  const dispatch = useAppDispatch()

  const folders = useAppSelector(explorerSelectors.useFolders);
  const files = useAppSelector(explorerSelectors.useFiles);
  const view = useAppSelector(state => state.appSetting.view);
  const currentFolder = useAppSelector(explorerSelectors.useCurrentFolder);
  const isCreatingFolder = useAppSelector(state => state.explorerSlice.isCreatingFolder);
  const isUploading = useAppSelector(useIsUploading);
  const isCreatingNotebook = useAppSelector(useIsCreatingNotebook);

  const { contextMenu, handleContextMenu } = useContextMenu();

  useEffect(() => {
    dispatch(getExplorer(currentFolder));
  }, [currentFolder]);

  return (
    <div className={classNames("p-4 h-screen relative", { '!p-0': view === 'list' })}>
      <div
        className={classNames(
          "flex gap-2 flex-wrap",
          { 'flex-col justify-center !gap-0': view === 'list' }
        )}
      >
        {/* If no data and not creating new folder */}
        {((!isCreatingFolder && isEmpty(files) && isEmpty(folders)) && <div className="flex justify-center items-center w-full h-full">This folder is empty.</div>)}

        {/* mapping folders */}
        {
          folders.map((folder) => (
            <Folder key={folder.id} folder={folder} onContextMenu={handleContextMenu} />
          ))
        }

        {/* mapping files */}
        {
          files.map((file) => (
            <File key={file.id} file={file} onContextMenu={handleContextMenu} />
          ))
        }

        {/* If creating new folder */}
        {isCreatingFolder && <NewFolder />}
      </div>

      {/* right click menu */}
      {contextMenu.show && <div className="flex max-h-full justify-center items-center"><ContextMenu contextMenu={contextMenu} /></div>}

      {/* file uploader */}
      {isUploading &&
        <>
          <div className="h-full w-full backdrop-blur-sm absolute top-0 left-0"></div>
          <div className="w-full backdrop-blur-sm z-20">
            <FileUploader />
          </div>
        </>
      }

      {
        isCreatingNotebook &&
        <>
          <div className="h-full w-full backdrop-blur-sm absolute top-0 left-0"></div>
          <div className="w-full backdrop-blur-sm z-20">
            <NotebookCreator />
          </div>
        </>
      }
    </div>

  )
}

export default View