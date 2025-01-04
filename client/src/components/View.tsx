import { useEffect } from "react"
import Folder from "./Folder"
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllFolders, useCurrentFolder, useFolders } from "@/store/slices/doc.data";
import useContextMenu from "@/utils/hooks/useContextMenu";
import FolderContextMenu from "./FolderContextMenu";
import classNames from "classnames";
import NewFolder from "./NewFolder";
import { isEmpty } from 'lodash';
import EmptyFolderState from "./EmptyFolderState";
import { useIsUploading } from "@/store/slices/app.setting";
import FileUploader from "./FileUploader";

const View = () => {

  const dispatch = useAppDispatch()

  const folders = useAppSelector(useFolders);
  const view = useAppSelector(state => state.appSetting.view);
  const isCreatingFolder = useAppSelector(state => state.docData.isCreatingFolder);
  const isUploading = useAppSelector(useIsUploading);
  const currentFolder = useAppSelector(useCurrentFolder);

  const { contextMenu, handleContextMenu } = useContextMenu();

  useEffect(() => {
    dispatch(getAllFolders(currentFolder));
  }, [currentFolder]);

  // if(isUploading) {
  //   return <FileUploader />
  // }

  return (
    <div className={classNames("p-4 h-screen relative", { '!p-0': view === 'list' })}>
      <div
        className={classNames(
          "flex gap-2 flex-wrap",
          { 'flex-col justify-center !gap-0': view === 'list' }
        )}
      >
        {
          !isEmpty(folders) ?
            folders.map((folder) => (
              <Folder key={folder.id} folder={folder} onContextMenu={handleContextMenu} />
            )) :
            // (isCreatingFolder ? null : <EmptyFolderState />)
            <div className="flex justify-center items-center w-full h-full">This folder is empty.</div>
        }
        {isCreatingFolder && <NewFolder />}
      </div>
      {contextMenu.show && <div className="flex max-h-full justify-center items-center"><FolderContextMenu contextMenu={contextMenu} /></div>}
      {isUploading &&
        <>
          <div className="absolute top-0 left-0 w-full backdrop-blur-sm z-20">
            <FileUploader />
          </div>
        </>
      }
    </div>

  )
}

export default View