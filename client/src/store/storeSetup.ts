import { configureStore } from '@reduxjs/toolkit'
import appSettingReducer from './slices/app.setting'
import docDataReducer from './slices/doc.data'

export const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
    docData: docDataReducer
  }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']