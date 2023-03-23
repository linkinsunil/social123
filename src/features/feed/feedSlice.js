import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedData: [],
  pageNumber: 0,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.feedData = action.payload;
      state.pageNumber = state.pageNumber + 1;
    },
    loadMoreData: (state, action) => {
      state.feedData = state.feedData.concat(action.payload);
      state.pageNumber = state.pageNumber + 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getData, loadMoreData } = feedSlice.actions;

export default feedSlice.reducer;
