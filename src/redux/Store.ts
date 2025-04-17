import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/Authentication/redux/slices/AuthSlice';
import { AuthenticationRepository } from '../features/Authentication/Repositories/AuthenticationRepository';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [AuthenticationRepository.reducerPath]: AuthenticationRepository.reducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(AuthenticationRepository.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)