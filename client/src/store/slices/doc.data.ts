import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storeSetup";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllFolders } from "@/services/FolderService";
import { IFolder } from "@/@types/explorer";

export interface IInitialState {
    loading: boolean,
    isRenaming: boolean,
    isCreatingFolder: boolean,
    folders: IFolder[],
    selectedFolder: string | null,
    currentFolder: string | null
}

const initialState: IInitialState = {
    loading: false,
    isRenaming: false,
    isCreatingFolder: false,
    folders: [],
    selectedFolder: null,
    currentFolder: null
}

export const getAllFolders = createAsyncThunk('getAllFolders', async () => {
    const res = await apiGetAllFolders<IFolder[]>()
    return res.data
})

const appSettingSlice = createSlice({
    name: 'appSetting',
    initialState,
    reducers: {
        setFolders(state, action: PayloadAction<IFolder[]>) {
            state.folders = action.payload;
        },
        setRenaming(state, action) {
            state.isRenaming = action.payload;
        },
        setSelectedFolder(state, action) {
            state.selectedFolder = action.payload;
        },
        setCurrentFolder(state, action) {
            state.currentFolder = action.payload;
        },
        setIsCreatingFolder(state, action) {
            state.isCreatingFolder = action.payload;
        },
        addNewFolder(state, action:PayloadAction<IFolder>) {
            state.folders.push(action.payload)
        },
        updateFolder(state, action: PayloadAction<IFolder>){
            state.folders = state.folders.map(folder => folder.id === action.payload.id ? action.payload : folder)
        },
        deleteFolder(state, action: PayloadAction<string>) {
            state.folders = state.folders.filter(folder => folder.id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFolders.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllFolders.fulfilled, (state, action) => {
                state.loading = false;
                state.folders = action.payload;
            })
    }
})

export const { setFolders, setRenaming, setSelectedFolder, setIsCreatingFolder, setCurrentFolder, addNewFolder, updateFolder, deleteFolder } = appSettingSlice.actions;

export const useFolders = (state: RootState) => state.docData.folders;
export const useSelectedFolder = (state:RootState) => state.docData.selectedFolder;
export const useCurrentFolder = (state:RootState) => state.docData.currentFolder;

export default appSettingSlice.reducer;