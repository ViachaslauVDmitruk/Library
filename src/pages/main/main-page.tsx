import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AlertMessage } from '../../components/error-message';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { REQUEST_BOOK } from '../../const/message';
import { bookingSelector, booksSelector, categoriesSelector } from '../../selectors';
import { loginSuccess } from '../../store/login';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isError } = useAppSelector(booksSelector);
  const { isLoading } = useAppSelector(categoriesSelector);
  const { isLoadingBooks } = useAppSelector(booksSelector);
  const { alertMessage, message } = useAppSelector(bookingSelector);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
    <div className={styles.container}>
      {(isLoading || isLoadingBooks) && <Loader />}
      {message && <AlertMessage message={message} stylesAlert={alertMessage} />}
      {isError && <AlertMessage message={REQUEST_BOOK} stylesAlert='error' />}
      <NavigateList />
      {!isError && <Outlet />}
    </div>
  );
};
