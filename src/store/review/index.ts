/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REVIEW } from '../../const/review';

import { ChangeRevieProps, ModalStateProps, ReviewProps } from './type';

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
    sendChangedReviewData: (state, action: PayloadAction<ChangeRevieProps>) => {
      state.isLoadingModal = true;
    },
    changeReviewSuccess: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'success';
      state.message = 'Спасибо, что нашли время изменить оценку!';
    },
    changeReviewError: (state) => {
      state.isLoadingModal = false;
      state.alertMessage = 'error';
      state.message = 'Изменения не были сохранены. Попробуйте позже!';
    },
    closeReviewAlert: (state) => {
      state.alertMessage = '';
      state.message = '';
    },
  },
});

export const {
  sendReviewData,
  sendChangedReviewData,
  reviewError,
  reviewSuccess,
  closeReviewAlert,
  changeReviewError,
  changeReviewSuccess,
} = reviewFormSlice.actions;

export const reviewReducer = reviewFormSlice.reducer;
