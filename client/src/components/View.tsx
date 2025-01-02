import { useEffect } from "react"
import Folder from "./Folder"
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllFolders, useFolders } from "@/store/slices/doc.data";
import useContextMenu from "@/utils/hooks/useContextMenu";
import FolderContextMenu from "./FolderContextMenu";
import classNames from "classnames";
import NewFolder from "./NewFolder";

const View = () => {

    const dispatch = useAppDispatch()

    const folders = useAppSelector(useFolders);
    const view = useAppSelector(state => state.appSetting.view);
    const isCreatingFolder = useAppSelector(state => state.docData.isCreatingFolder);

    const { contextMenu, handleContextMenu } = useContextMenu();

    useEffect(() => {
        dispatch(getAllFolders());
    }, []);


    return (
        <div className={classNames("p-4 h-screen", { '!p-0' : view === 'list' })}>
        <div
          className={classNames(
            "flex gap-2 flex-wrap",
            { 'flex-col justify-center !gap-0': view === 'list' }
          )}
        >
          {folders.map((folder) => (
            <Folder key={folder.id} folder={folder} onContextMenu={handleContextMenu} />
          ))}
          {isCreatingFolder && <NewFolder />}
        </div>
        {contextMenu.show && <FolderContextMenu contextMenu={contextMenu} />}
      </div>
      
    )
}

export default View