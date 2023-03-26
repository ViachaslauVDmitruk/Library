/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookStateProps, OneBookProps } from './types';

const initialState: BookStateProps = {
  isLoadingBook: false,
  book: {
    id: '',
    title: '',
    rating: null,
    issueYear: '',
    description: '',
    publish: '',
    pages: '',
    cover: '',
    weight: '',
    format: '',
    ISBN: '',
    producer: '',
    authors: [],
    images: [],
    categories: [],
    comments: [],
    booking: {
      id: '',
      order: false,
      dateOrder: '',
      customerId: '',
      customerFirstName: '',
      customerLastName: '',
    },
    delivery: {
      id: '',
      handed: false,
      dateHandedFrom: '',
      dateHandedTo: '',
      recipientId: '',
      recipientFirstName: '',
      recipientLastName: '',
    },
    histories: [],
  },
  isErrorOneBook: false,
};

export const oneBookSlice = createSlice({
  name: 'onebook',
  initialState,
  reducers: {
    getOneBook: (state, action: PayloadAction<number | string>) => {
      state.isLoadingBook = true;
    },
    setOneBook: (state, action: PayloadAction<OneBookProps>) => {
      state.isLoadingBook = false;
      state.book = action.payload;
      state.book.comments = state.book.comments?.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
    },
    oneBookError: (state) => {
      state.isLoadingBook = false;
      state.isErrorOneBook = true;
    },
  },
});

export const { getOneBook, setOneBook, oneBookError } = oneBookSlice.actions;

export const oneBookSliceReducer = oneBookSlice.reducer;
