/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookStateProps, CommentsProps, OneBookProps } from './types';

const initialState: BookStateProps = {
  isLoading: false,
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
  isError: false,
};

export const oneBookSlice = createSlice({
  name: 'onebook',
  initialState,
  reducers: {
    getOneBook: (state, action: PayloadAction<number | string>) => {
      state.isLoading = true;
    },
    setOneBook: (state, action: PayloadAction<OneBookProps>) => {
      state.isLoading = false;
      state.book = action.payload;
    },
    oneBookError: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.isError = true;
    },
    sortReviewDown: (state, action: PayloadAction) => {
      state.book.comments = state.book.comments.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
    },
  },
});

export const { getOneBook, setOneBook, oneBookError, sortReviewDown } = oneBookSlice.actions;

export const oneBookSliceReducer = oneBookSlice.reducer;
