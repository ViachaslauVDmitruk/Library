import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { axios } from '../../api/api';
import { API } from '../../api/const';
import { getOneBook } from '../book';

import { ReviewProps } from './type';
import { closeReviewAlert, reviewError, reviewSuccess, sendReviewData } from '.';

export function* reviewWorker({ payload }: PayloadAction<ReviewProps>) {
  try {
    yield call(axios.post, API.reviewUrl, { data: payload });
    yield put(getOneBook(payload.book));
    yield put(reviewSuccess());
    yield delay(4000);
    yield put(closeReviewAlert());
  } catch (e) {
    yield put(reviewError());
    yield delay(4000);
    yield put(closeReviewAlert());
  }
}

export function* reviewWatcher(): Generator {
  yield takeLatest(sendReviewData.type, reviewWorker);
}
