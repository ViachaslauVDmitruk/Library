/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorMessage } from '../../components/error-message';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { booksSelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { getCategories } from '../../store/categories';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, books } = useAppSelector(booksSelector);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(getCategories());
      dispatch(getBooks());
    }
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <NavigateList />
      {!isError && <Outlet />}
    </div>
  );
};
