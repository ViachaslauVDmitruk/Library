/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { CounterBooks } from '../../helpers/counter-books';
import { booksSelector, burgeMenuSelector, categoriesSelector } from '../../selectors';
import { closeBurgerMenu } from '../../store/burger-menu';
import { getCategories } from '../../store/categories';
import { loginResetState } from '../../store/login';
import { selectCategoryAction } from '../../store/selected-category';
import { useAppDispatch, useAppSelector } from '../hooks';

import arrowHidden from './assets/list-hidden-color.png';
import arrowShow from './assets/list-show-color.png';

import styles from './navigate-list.module.scss';

export const NavigateList = () => {
  const [isShowNavigate, setIsShowNavigate] = useState<boolean>(true);
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const { categories, isErrorCategories, isLoadingCategories } = useAppSelector(categoriesSelector);
  const { books } = useAppSelector(booksSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const styleNavigate = classNames(styles.navigate, activeBurger ? styles.burgerMenu : '');

  const ToggleNavigateShow = () => {
    setIsShowNavigate(!isShowNavigate);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(loginResetState());
    dispatch(closeBurgerMenu());
    navigate('/auth');
  };

  return (
    <div className={styleNavigate} onClick={() => dispatch(closeBurgerMenu())}>
      <div className={styles.burgerNavigate} onClick={(e) => e.stopPropagation()} data-test-id='burger-navigation'>
        <div
          className={classNames(styles.navigateTitle, { [styles.bottomMargin]: isShowNavigate })}
          data-test-id={activeBurger ? 'burger-showcase' : 'navigation-showcase'}
          onClick={() => ToggleNavigateShow()}
        >
          <div className={styles.titleTop} onClick={() => dispatch(getCategories())}>
            <NavLink to='/books/all' className={styles.title}>
              Витрина книг
            </NavLink>
            {categories.length > 0 && (
              <div className={styles.arrow}>
                <img src={isShowNavigate ? arrowHidden : arrowShow} alt='img' />
              </div>
            )}
          </div>
        </div>
        {!isErrorCategories && !isLoadingCategories && (
          <ul className={classNames(styles.listItems, { [styles.disableListItems]: !isShowNavigate })}>
            <li className={classNames(styles.listItem)} onClick={() => dispatch(closeBurgerMenu())}>
              <NavLink
                to='/books/all'
                onClick={() => dispatch(selectCategoryAction(''))}
                data-test-id={activeBurger ? 'burger-books' : 'navigation-books'}
              >
                Все книги
              </NavLink>
            </li>
            {categories?.map(({ name, id, path }) => {
              const counter = CounterBooks({ name, books });

              return (
                <li key={id}>
                  <NavLink
                    to={`/books/${path}`}
                    className={styles.listItem}
                    onClick={() => {
                      dispatch(closeBurgerMenu());
                      dispatch(selectCategoryAction(name));
                    }}
                  >
                    <p data-test-id={activeBurger ? `burger-${path}` : `navigation-${path}`}>{name}</p>
                    <span
                      data-test-id={
                        activeBurger ? `burger-book-count-for-${path}` : `navigation-book-count-for-${path}`
                      }
                    >
                      {counter}{' '}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
        <div className={classNames(styles.navigateTitle)}>
          <NavLink
            to='/terms'
            className={classNames(styles.title)}
            onClick={() => {
              setIsShowNavigate(false);
            }}
            data-test-id={activeBurger ? 'burger-terms' : 'navigation-terms'}
          >
            Правила пользования
          </NavLink>
        </div>
        <div className={classNames(styles.navigateTitle)}>
          <NavLink
            to='/contract'
            className={styles.title}
            onClick={() => {
              setIsShowNavigate(false);
            }}
            data-test-id={activeBurger ? 'burger-contract' : 'navigation-contract'}
          >
            Договор оферты
          </NavLink>
        </div>
        <div className={styles.loginNavigate}>
          <Link to='/profile' className={styles.title}>
            Профиль
          </Link>
          <div className={styles.title} onClick={logOut} data-test-id='exit-button'>
            Выход
          </div>
        </div>
      </div>
    </div>
  );
};
