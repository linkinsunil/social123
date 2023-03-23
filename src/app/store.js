import { configureStore } from '@reduxjs/toolkit';
import feedReducer from '../features/feed/feedSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    user: userReducer,
  },
});
