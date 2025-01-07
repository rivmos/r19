import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { setHistory } from "../slices/doc.data";
import { RootState } from "../storeSetup";
import { IFolder } from "@/@types/explorer";

export const historyMiddleware: Middleware = store => next => (action: PayloadAction<IFolder>) => {

    const prevState: RootState = store.getState();

    if (action.type === 'appSetting/setCurrentFolder') {
        const newCurrentFolder = action.payload;
        const currentHistory = prevState.docData.history;

        if(!newCurrentFolder.id) store.dispatch(setHistory([{id: null, name: 'root'}]));
        // Only update history if the current folder is not already in the history
        else if(currentHistory.find(history => newCurrentFolder.id === history.id)){
            const index = currentHistory.map(history => history.id).indexOf(newCurrentFolder.id);
            let newHistory = [...currentHistory].splice(index);
            store.dispatch(setHistory(newHistory));
        }
        else if (currentHistory[currentHistory.length - 1] !== newCurrentFolder) {
            store.dispatch(setHistory([...currentHistory, newCurrentFolder]));
        }
    }

    return next(action);
}
