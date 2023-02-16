/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ErrorMessage } from '../../components/error-message';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { booksSelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { getCategories } from '../../store/categories';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, books } = useSelector(booksSelector);

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
