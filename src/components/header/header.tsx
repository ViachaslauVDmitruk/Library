/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { burgeMenuSelector } from '../../selectors';
import { closeBurgerMenu, openBurgerMenu } from '../../store/burger-menu';

import avatar from './assets/avatar.png';
import logo from './assets/logo.png';

import styles from './header.module.scss';

export const Header = () => {
  const { activeBurger } = useSelector(burgeMenuSelector);

  const dispatch = useDispatch();

  function ToggleMenu() {
    if (activeBurger) {
      dispatch(closeBurgerMenu());
    } else {
      dispatch(openBurgerMenu());
    }
  }

  useEffect(() => {
    if (activeBurger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeBurger]);

  return (
    <header className={styles.container} onClick={() => dispatch(closeBurgerMenu())}>
      <div className={styles.logoTitle}>
        <Link to='/' className={styles.logo}>
          <img src={logo} alt='img' />
          <span className={styles.logoName}>Cleverland</span>
        </Link>
        <button
          type='button'
          className={classNames(styles.burger, { [styles.visible]: activeBurger })}
          onClick={(e) => {
            e.stopPropagation();
            ToggleMenu();
          }}
          data-test-id='button-burger'
        >
          <span> </span>
        </button>
        <div className={styles.title}>Библиотека</div>
      </div>
      <div className={styles.account}>
        <span className={styles.accountName}>Привет, Иван!</span>
        <img src={avatar} alt='img' />
      </div>
    </header>
  );
};
