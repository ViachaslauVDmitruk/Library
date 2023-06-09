import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { alertSlice } from './alert';
import { avatarSlice } from './avatar';
import { oneBookSlice } from './book';
import { booksSlice } from './books';
import { burgerMenuSlice } from './burger-menu';
import { categoriesSlice } from './categories';
import { errorSlice } from './error-request';
import { inputSearchSlice } from './input-search';
import { loginFormSlice } from './login';
import { bookingSlice } from './order';
import { dateOrderSlice } from './order-date';
import { profileMenuSlice } from './profile-menu';
import { recoveryEmailSlice } from './recovery-email';
import { recoveryPasswordSlice } from './recovery-password';
import { registrationFormSlice } from './registration';
import { reviewFormSlice } from './review';
import { rootSaga } from './saga';
import { searchValueSlice } from './search-value';
import { selectedCategorySlice } from './selected-category';
import { changedRegisterSlice } from './user';
import { userSlice } from './user-data';

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
  review: reviewFormSlice.reducer,
  booking: bookingSlice.reducer,
  dateOrder: dateOrderSlice.reducer,
  changedRegister: changedRegisterSlice.reducer,
  avatar: avatarSlice.reducer,
  user: userSlice.reducer,
  alert: alertSlice.reducer,
  searchValue: searchValueSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
