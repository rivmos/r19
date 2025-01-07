import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storeSetup";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFile, IFolder } from "@/@types/explorer";
import { apiGetExplorer } from "@/services/ExplorerService";

export interface IInitialState {
    loading: boolean,
    isRenaming: boolean,
    isCreatingFolder: boolean,
    folders: IFolder[],
    files: IFile[],
    history: IFolder[],
    selectedFolder: string | null,
    currentFolder: IFolder,
}

const initialState: IInitialState = {
    loading: false,
    isRenaming: false,
    isCreatingFolder: false,
    folders: [],
    files: [],
    history: [{ id: null, name: 'root' }],
    selectedFolder: null,
    currentFolder: { id: null, name: 'root' },
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

const appSettingSlice = createSlice({
    name: 'appSetting',
    initialState,
    reducers: {
        setRenaming(state, action) {
            state.isRenaming = action.payload;
        },
        setSelectedFolder(state, action) {
            if(state.selectedFolder === action.payload) return
            state.selectedFolder = action.payload;
        },
        setCurrentFolder(state, action: PayloadAction<IFolder>) {
            if(state.currentFolder.id === action.payload.id) return;
            state.currentFolder = action.payload;
        },
        setIsCreatingFolder(state, action) {
            state.isCreatingFolder = action.payload;
        },
        addNewFolder(state, action: PayloadAction<IFolder>) {
            state.folders.push(action.payload);
        },
        updateFolder(state, action: PayloadAction<IFolder>) {
            state.folders = state.folders.map(folder => folder.id === action.payload.id ? action.payload : folder);
        },
        deleteFolder(state, action: PayloadAction<string>) {
            state.folders = state.folders.filter(folder => folder.id != action.payload);
        },
        setHistory(state, action) {
            state.history = action.payload;
        },
        setDocFiles(state, action: PayloadAction<IFile[]>) {
            state.files = state.files.concat(action.payload);
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
    }
})

export const { setRenaming, setSelectedFolder, setIsCreatingFolder, setCurrentFolder, addNewFolder, updateFolder, deleteFolder, setHistory, setDocFiles } = appSettingSlice.actions;

export const useFolders = (state: RootState) => state.docData.folders;
export const useFiles = (state: RootState) => state.docData.files;
export const useSelectedFolder = (state: RootState) => state.docData.selectedFolder;
export const useCurrentFolder = (state: RootState) => state.docData.currentFolder;

export default appSettingSlice.reducer;