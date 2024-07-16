import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from './quoteSlice';

const appStore = configureStore({
  reducer: {
    quoteSlice: quoteReducer,
  },
});

export default appStore;
