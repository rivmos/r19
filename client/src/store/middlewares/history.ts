import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { setHistory } from "../slices/doc.data";
import { RootState } from "../storeSetup";

export const historyMiddleware: Middleware = store => next => (action: PayloadAction<any>) => {

    const prevState: RootState = store.getState();

    if (action.type === 'appSetting/setCurrentFolder') {
        const newCurrentFolder = action.payload;
        const currentHistory = prevState.docData.history;

        if(!newCurrentFolder) store.dispatch(setHistory([]));
        // Only update history if the current folder is not already in the history
        else if(currentHistory.includes(newCurrentFolder)){
            const index = currentHistory.indexOf(newCurrentFolder);
            let newHistory = [...currentHistory].splice(index);
            store.dispatch(setHistory(newHistory));
        }
        else if (currentHistory[currentHistory.length - 1] !== newCurrentFolder) {
            store.dispatch(setHistory([...currentHistory, newCurrentFolder]));
        }
    }

    return next(action);
}
