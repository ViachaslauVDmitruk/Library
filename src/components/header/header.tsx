/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { API_HOST } from '../../api/const';
import { burgeMenuSelector, profileMenuSelector, userSelector } from '../../selectors';
import { closeBurgerMenu, openBurgerMenu } from '../../store/burger-menu';
import { closeProfileMenu, openProfileMenu } from '../../store/profile-menu';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ProfileMenu } from '../profile-menu';

import deafultSrc from './assets/avatar-deafult.png';
import logo from './assets/logo.png';

import styles from './header.module.scss';

export const Header = () => {
  const [avatarScr, setAvatarSrc] = useState<string>(deafultSrc);
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const { isOpenProfileMenu } = useAppSelector(profileMenuSelector);
  const { user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const urlPath = window.location.href;
  const isProfilePage = urlPath.includes('profile');

  function ToggleMenu() {
    if (activeBurger) {
      dispatch(closeBurgerMenu());
    } else {
      dispatch(openBurgerMenu());
    }
  }

  const ToggleProfileMenu = () => {
    if (isOpenProfileMenu) {
      dispatch(closeProfileMenu());
    } else {
      dispatch(openProfileMenu());
    }
  };

  useEffect(() => {
    if (activeBurger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeBurger]);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarSrc(`${API_HOST}${user.avatar}`);
    } else {
      setAvatarSrc(deafultSrc);
    }
  }, [user]);

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
        <div className={styles.title}>{isProfilePage ? 'Личный кабинет' : 'Библиотека'}</div>
      </div>
      <div className={styles.account} onClick={ToggleProfileMenu}>
        <span className={styles.accountName}>Привет, {user?.firstName ? user?.firstName : 'My friend'}!</span>
        <img src={avatarScr} alt='img' />
      </div>
      <ProfileMenu />
    </header>
  );
};
