/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REVIEW } from '../../const/review';

import { ModalStateProps, ReviewProps } from './type';

export const initialState: ModalStateProps = {
  isLoadingModal: false,
  alertMessage: '',
  message: '',
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
      state.alertMessage = 'success';
      state.message = 'Спасибо, что нашли время оценить книгу!';
    },
    reviewError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Оценка не была отправлена. Попробуйте позже!';
    },
    closeReviewAlert: (state) => {
      state.alertMessage = '';
      state.message = '';
    },
  },
});

export const { sendReviewData, reviewError, reviewSuccess, closeReviewAlert } = reviewFormSlice.actions;

export const reviewReducer = reviewFormSlice.reducer;
