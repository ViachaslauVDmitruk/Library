import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { oneBookSlice } from './book';
import { booksSlice } from './books';
import { burgerMenuSlice } from './burger-menu';
import { categoriesSlice } from './categories';
import { errorSlice } from './error-request';
import { inputSearchSlice } from './input-search';
import { loginFormSlice } from './login';
import { profileMenuSlice } from './profile-menu';
import { recoveryEmailSlice } from './recovery-email';
import { recoveryPasswordSlice } from './recovery-password';
import { registrationFormSlice } from './registration';
import { rootSaga } from './saga';
import { selectedCategorySlice } from './selected-category';

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = {
  burgerMenu: burgerMenuSlice.reducer,
  books: booksSlice.reducer,
  error: errorSlice.reducer,
  onebook: oneBookSlice.reducer,
  categories: categoriesSlice.reducer,
  selectedCategory: selectedCategorySlice.reducer,
  inputSearch: inputSearchSlice.reducer,
  registration: registrationFormSlice.reducer,
  login: loginFormSlice.reducer,
  recoveryEmail: recoveryEmailSlice.reducer,
  recoveryPassword: recoveryPasswordSlice.reducer,
  profileMenu: profileMenuSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
