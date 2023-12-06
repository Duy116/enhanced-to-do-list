import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosSlice'
import { loggerMiddleware } from './middleware'

export const store = configureStore({
  reducer: todosReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch