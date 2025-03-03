import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { productListApi } from '../services/getProductList';

export const store = configureStore({
  reducer: {
    [productListApi.reducerPath]: productListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productListApi.middleware),
});

setupListeners(store.dispatch);
