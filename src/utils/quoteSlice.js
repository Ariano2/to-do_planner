import { createSlice } from '@reduxjs/toolkit';

const quoteSlice = createSlice({
  name: 'quoteSlice',
  initialState: {
    quote: null,
  },
  reducers: {
    addQuote: (state, action) => {
      state.quote = action.payload;
    },
  },
});

export const { addQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
