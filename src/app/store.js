import { configureStore } from '@reduxjs/toolkit';
import { bookSlice } from '../features/books/bookSlice';

export default configureStore({
  reducer: {
    books1: bookSlice.reducer,
  },
});
