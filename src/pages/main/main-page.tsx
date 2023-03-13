/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { AlertMessage } from '../../components/error-message';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { REQUEST_BOOK } from '../../const/message';
import { booksSelector, categoriesSelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { getCategories } from '../../store/categories';
import { loginSuccess } from '../../store/login';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isError } = useAppSelector(booksSelector);
  const { isLoading } = useAppSelector(categoriesSelector);

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
      dispatch(getCategories());
      dispatch(getBooks());
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <AlertMessage message={REQUEST_BOOK} stylesAlert='error' />}
      <NavigateList />
      {!isError && <Outlet />}
    </div>
  );
};
