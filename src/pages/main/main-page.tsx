import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AlertMessage } from '../../components/error-message';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { REQUEST_BOOK } from '../../const/message';
import { bookingSelector, booksSelector, categoriesSelector, userSelector } from '../../selectors';
import { loginSuccess } from '../../store/login';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isErrorBooks, isLoadingBooks } = useAppSelector(booksSelector);
  const { isLoadingCategories, isErrorCategories } = useAppSelector(categoriesSelector);
  const { isLoadingUser, isErrorUserResponse } = useAppSelector(userSelector);
  const { alertMessage, message } = useAppSelector(bookingSelector);

  const loading = isLoadingBooks || isLoadingCategories || isLoadingUser;
  const error = isErrorBooks || isErrorCategories || isErrorUserResponse;

  useEffect(() => {
    const token = localStorage.getItem('user');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/auth');
    }
    if (token && user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [navigate, dispatch]);

  return (
    <div className={styles.container} data-test-id='main-page'>
      {loading && <Loader />}
      {message && <AlertMessage message={message} stylesAlert={alertMessage} />}
      {error && <AlertMessage message={REQUEST_BOOK} stylesAlert='error' />}
      <NavigateList />
      {!error && <Outlet />}
    </div>
  );
};
