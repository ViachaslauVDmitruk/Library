import { Outlet } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import styles from '../../pages/main/main-page.module.scss';

export const Layout = () => (
  <div className={styles.wrapper} data-test-id='main-page'>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
