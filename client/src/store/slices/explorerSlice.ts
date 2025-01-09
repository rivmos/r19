import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storeSetup";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFile, IFolder } from "@/@types/explorer";
import { apiGetExplorer } from "@/services/ExplorerService";
import { apiDeleteFile } from "@/services/FileService";
import { apiCreateOrUpdateFolder, apiDeleteFolder, apiUploadFile } from "@/services/FolderService";

export interface IInitialState {
    loading: boolean,
    isRenaming: boolean,
    isCreatingFolder: boolean,
    folders: IFolder[],
    files: IFile[],
    history: IFolder[],
    selectedFolder: string | null,
    currentFolder: string | null,
}

const initialState: IInitialState = {
    loading: false,
    isRenaming: false,
    isCreatingFolder: false,
    folders: [],
    files: [],
    history: [{ id: null, name: 'root' }],
    selectedFolder: null,
    currentFolder: null,
}

type GetExplorerRequest = {
    parentId: string
}

type GetExplorerResponse = {
    folders: IFolder[];
    files: IFile[];
}

export const getExplorer = createAsyncThunk('getExplorer', async (parentId: string) => {
    const res = await apiGetExplorer<GetExplorerResponse, GetExplorerRequest>({ parentId })
    return res.data
})

export const deleteFile = createAsyncThunk('deleteFile', async (id: string) => {
    const res = await apiDeleteFile<IFile, { id: string }>({ id });
    return res.data
})

export const uploadFile = createAsyncThunk('uploadFile', async (data: { parentId: string, files: File[] }) => {
    const res = await apiUploadFile<{ message: string, files: IFile[] }, { parentId: string, files: File[] }>(data);
    return res.data
})

export const deleteFolder = createAsyncThunk('deleteFolder', async (id: string) => {
    const res = await apiDeleteFolder<IFolder, { id: string }>({ id });
    return res.data
})

export const createOrUpdateFolder = createAsyncThunk('createOrUpdateFolder', async (data: IFolder) => {
    const res = await apiCreateOrUpdateFolder<IFolder, IFolder>(data);
    return res.data
})

const appSettingSlice = createSlice({
    name: 'explorerSlice',
    initialState,
    reducers: {
        setRenaming(state, action: PayloadAction<boolean>) {
            state.isRenaming = action.payload;
        },
        setSelectedFolder(state, action: PayloadAction<string | null>) {
            if (state.selectedFolder === action.payload) return
            state.selectedFolder = action.payload;
        },
        setCurrentFolder(state, action: PayloadAction<string | null>) {
            if (state.currentFolder === action.payload) return;

            // Update the current folder
            state.currentFolder = action.payload;

            // checking if the new folder already in historry
            const folderIndex = state.history.findIndex(item => item.id === action.payload);
            if (folderIndex !== -1) {
                // removing all history after the selected folder
                state.history = state.history.slice(0, folderIndex + 1);
            } else {
                // if new folder is not in history then adding 
                const selectedFolder = action.payload
                    ? state.folders.find(folder => folder.id === action.payload)
                    : { id: null, name: 'root' }; // if payload is null then moving to root folder
                if (selectedFolder) {
                    state.history.push(selectedFolder);
                }
            }
        },
        setIsCreatingFolder(state, action: PayloadAction<boolean>) {
            state.isCreatingFolder = action.payload;
        },
        updateFile(state, action: PayloadAction<IFile>) {
            state.files = state.files.map(file => file.id === action.payload.id ? action.payload : file);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExplorer.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getExplorer.fulfilled, (state, action) => {
                state.loading = false;
                state.folders = action.payload.folders;
                state.files = action.payload.files;
            })
            .addCase(getExplorer.rejected, (state, action) => {
                state.loading = false;
                console.error("Failed to fetch explorer data:", action);
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.files = state.files.filter(file => file.id != action.meta.arg);
            })
            .addCase(deleteFolder.fulfilled, (state, action) => {
                state.folders = state.folders.filter(folder => folder.id != action.meta.arg);
            })
            .addCase(createOrUpdateFolder.fulfilled, (state, action) => {
                if (action.meta.arg.id) {
                    state.folders = state.folders.map(folder => folder.id === action.payload.id ? action.payload : folder);
                    state.isRenaming = false;
                }
                else {
                    state.folders.push(action.payload);
                    state.isCreatingFolder = false;
                }
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                // state.folders = state.folders.filter(folder => folder.id != action.meta.arg);
                state.files = state.files.concat(action.payload.files);
            })

    }
})

export const { setRenaming, setSelectedFolder, setIsCreatingFolder, setCurrentFolder, updateFile } = appSettingSlice.actions;

export const explorerSelectors = {
    useFolders: (state: RootState) => state.explorerSlice.folders,
    useFiles: (state: RootState) => state.explorerSlice.files,
    useSelectedFolder: (state: RootState) => state.explorerSlice.selectedFolder,
    useCurrentFolder: (state: RootState) => state.explorerSlice.currentFolder,
};


export default appSettingSlice.reducer;