import { configureStore } from '@reduxjs/toolkit'
import appSettingReducer from './slices/app.setting'
import explorerSliceReducer from './slices/explorerSlice'
import { historyMiddleware } from './middlewares/history'

export const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
    explorerSlice: explorerSliceReducer
  },
  middleware: (defaultMiddlewares) =>  defaultMiddlewares().concat(historyMiddleware) 
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']