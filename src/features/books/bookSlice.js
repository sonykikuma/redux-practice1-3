import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books1/fetchBooks', async () => {
  const response = await axios.get('https://newbackend-rp1.vercel.app/books1');
  return response.data;
});

export const addBook = createAsyncThunk('books1/addBook', async (newBook) => {
  const response = await axios.post(
    'https://newbackend-rp1.vercel.app/books1',
    newBook
  );
  return response.data;
});

export const deleteBook = createAsyncThunk(
  'books1/deleteBook',
  async (bookId) => {
    const res = await axios.delete(
      `https://newbackend-rp1.vercel.app/books1/${bookId}`
    );
    return bookId;
  }
);

export const updateBookAsync = createAsyncThunk(
  'books1/updateBook',
  async (updatedBook) => {
    const res = await axios.put(
      `https://newbackend-rp1.vercel.app/books1/${updatedBook._id}`,
      updatedBook
    );
    return res.data;
  }
);

export const bookSlice = createSlice({
  name: 'books1',
  initialState: {
    books1: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      (state.status = 'success'), (state.books1 = action.payload);
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.message;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.books1.push(action.payload);
    });
    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      const index = state.books1.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        state.books1[index] = action.payload;
      }
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.books1 = state.books1.filter((book) => book._id !== action.payload);
    });
  },
});

export default bookSlice.reducer;
