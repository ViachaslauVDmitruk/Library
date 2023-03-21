/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookProps, BooksState } from './types';

const initialState: BooksState = {
  isLoadingBooks: false,
  books: [],
  isErrorBooks: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks: (state, action: PayloadAction) => {
      state.isLoadingBooks = true;
    },
    setBooks: (state, action: PayloadAction<BookProps[]>) => {
      state.isLoadingBooks = false;
      state.books = action.payload;
      state.books = state.books.sort((a, b) => (a.rating == null ? 0 : a.rating) - (b.rating == null ? 0 : b.rating));
    },
    booksError: (state, action: PayloadAction) => {
      state.isLoadingBooks = false;
      state.isErrorBooks = true;
    },
    closeBooksAlert: (state) => {
      state.isLoadingBooks = false;
      state.isErrorBooks = false;
    },
    sortRatingUp: (state, action: PayloadAction) => {
      state.books = state.books.sort((a, b) => (a.rating == null ? 0 : a.rating) - (b.rating == null ? 0 : b.rating));
    },
    sortRatingDown: (state, action: PayloadAction) => {
      state.books = state.books.sort((a, b) => (b.rating == null ? 0 : b.rating) - (a.rating == null ? 0 : a.rating));
    },
  },
});

export const { getBooks, setBooks, booksError, sortRatingDown, sortRatingUp, closeBooksAlert } = booksSlice.actions;

export const bookSliceReduser = booksSlice.reducer;
