import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storeSetup";
import { IView } from "@/@types/explorer";

export interface IInitialState {
    view: IView,
    isUploading: boolean
}

const initialState: IInitialState = {
    view: 'grid',
    isUploading: false
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
        }
    }
})

export const { setView, setIsUploading } = appSettingSlice.actions;
export const useIsUploading = (state:RootState) => state.appSetting.isUploading;

export default appSettingSlice.reducer;