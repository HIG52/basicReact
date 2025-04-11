import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 