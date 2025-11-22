// app/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import contentSlice from './slices/contentSlice';
import mediaSlice from './slices/mediaSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    content: contentSlice,
    media: mediaSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;