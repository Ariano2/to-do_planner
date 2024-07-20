import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from './quoteSlice';
import editModeReducer from './editModeSlice';

const appStore = configureStore({
  reducer: {
    quoteSlice: quoteReducer,
    editModeSlice: editModeReducer,
  },
});

export default appStore;
