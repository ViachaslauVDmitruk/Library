import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { booksSlice } from './books';
import { burgerMenuSlice } from './burger-menu';
import { errorSlice } from './error-request';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = {
  burgerMenu: burgerMenuSlice.reducer,
  books: booksSlice.reducer,
  error: errorSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
