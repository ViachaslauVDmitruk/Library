import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { loginSelector } from '../../selectors';
import { loginSuccess } from '../../store/login';
import { Footer } from '../footer';
import { Header } from '../header';
import { useAppDispatch, useAppSelector } from '../hooks';

import styles from '../../pages/main/main-page.module.scss';

export const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: userData } = useAppSelector(loginSelector);

  useEffect(() => {
    const token = Cookies.get('token');
    const user = sessionStorage.getItem('user');

    if (!token || !user) {
      Cookies.remove('token');
      sessionStorage.removeItem('user');
      navigate('/auth');
    }
    if (token && user && !userData) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [navigate, dispatch, userData]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
