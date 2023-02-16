/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookProps, BooksState } from './types';

const initialState: BooksState = {
  isLoading: false,
  books: [],
  isError: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    setBooks: (state, action: PayloadAction<BookProps[]>) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    booksError: (state, action: PayloadAction) => {
      console.log('state error work', state);
      state.isLoading = false;
      state.isError = true;
      console.log('state', state);
    },
  },
});

export const { getBooks, setBooks, booksError } = booksSlice.actions;

export const bookSliceReduser = booksSlice.reducer;
