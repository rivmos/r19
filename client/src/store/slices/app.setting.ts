import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storeSetup";
import { IView } from "@/@types/explorer";

export interface IInitialState {
    view: IView,
}

const initialState: IInitialState = {
    view: 'grid',
}

const appSettingSlice = createSlice({
    name: 'appSetting',
    initialState,
    reducers: {
        setView(state, action: PayloadAction<IView>) {
            state.view = action.payload;
        },
    }
})

export const { setView } = appSettingSlice.actions;

export default appSettingSlice.reducer;