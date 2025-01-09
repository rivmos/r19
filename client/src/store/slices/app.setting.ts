import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storeSetup";
import { IView } from "@/@types/explorer";

export interface IInitialState {
    view: IView,
    isUploading: boolean,
    isCreatingNotebook: boolean
}

const initialState: IInitialState = {
    view: 'grid',
    isUploading: false,
    isCreatingNotebook: false,
}

const appSettingSlice = createSlice({
    name: 'appSetting',
    initialState,
    reducers: {
        setView(state, action: PayloadAction<IView>) {
            state.view = action.payload;
        },
        setIsUploading(state, action){
            state.isUploading = action.payload;
        },
        setIsCreatingNotebook(state, action){
            state.isCreatingNotebook = action.payload;
        }
    }
})

export const { setView, setIsUploading, setIsCreatingNotebook } = appSettingSlice.actions;
export const useIsUploading = (state:RootState) => state.appSetting.isUploading;
export const useIsCreatingNotebook = (state:RootState) => state.appSetting.isCreatingNotebook;

export default appSettingSlice.reducer;