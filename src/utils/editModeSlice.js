import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
  name: 'editMode',
  initialState: {
    timeStamp: null,
  },
  reducers: {
    addEditItem: (state, action) => {
      state.timeStamp = action.payload;
    },
    removeEditItem: (state) => {
      state.timeStamp = null;
    },
  },
});

export default editModeSlice.reducer;
export const { addEditItem, removeEditItem } = editModeSlice.actions;
