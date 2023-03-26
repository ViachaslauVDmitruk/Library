/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REVIEW } from '../../const/review';
import { LoaderType } from '../../types/loader';

import { ChangeRevieProps, ReviewProps } from './type';

export const initialState: LoaderType = {
  isLoadingModal: false,
};

export const reviewFormSlice = createSlice({
  name: REVIEW,
  initialState,
  reducers: {
    sendReviewData: (state, action: PayloadAction<ReviewProps>) => {
      state.isLoadingModal = true;
    },
    reviewSuccess: (state) => {
      state.isLoadingModal = false;
    },
    reviewError: (state) => {
      state.isLoadingModal = false;
    },
    sendChangedReviewData: (state, action: PayloadAction<ChangeRevieProps>) => {
      state.isLoadingModal = true;
    },
    changeReviewSuccess: (state) => {
      state.isLoadingModal = false;
    },
    changeReviewError: (state) => {
      state.isLoadingModal = false;
    },
  },
});

export const {
  sendReviewData,
  sendChangedReviewData,
  reviewError,
  reviewSuccess,
  changeReviewError,
  changeReviewSuccess,
} = reviewFormSlice.actions;

export const reviewReducer = reviewFormSlice.reducer;
