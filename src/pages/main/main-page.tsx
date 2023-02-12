import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { booksSelector } from '../../selectors';
import { getBooks } from '../../store/books';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(booksSelector);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <NavigateList />
      <Outlet />
    </div>
  );
};
