/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { CounterBooks } from '../../helpers/counter-books';
import { booksSelector, burgeMenuSelector, categoriesSelector } from '../../selectors';
import { closeBurgerMenu } from '../../store/burger-menu';
import { getCategories } from '../../store/categories';
import { selectCategoryAction } from '../../store/selected-category';

import arrowHidden from './assets/list-hidden-color.png';
import arrowShow from './assets/list-show-color.png';

import styles from './navigate-list.module.scss';

export const NavigateList = () => {
  const [isShowNavigate, setIsShowNavigate] = useState<boolean>(true);
  const { activeBurger } = useSelector(burgeMenuSelector);
  const { categories, isError } = useSelector(categoriesSelector);
  const { books } = useSelector(booksSelector);

  const dispatch = useDispatch();

  const styleNavigate = classNames(styles.navigate, activeBurger ? styles.burgerMenu : '');

  const ToggleNavigateShow = () => {
    setIsShowNavigate(!isShowNavigate);
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
        <ul className={classNames(styles.listItems, { [styles.disableListItems]: !isShowNavigate })}>
          <li
            className={classNames(styles.listItem, styles.active)}
            onClick={() => dispatch(closeBurgerMenu())}
            data-test-id={activeBurger ? 'burger-books' : 'navigation-books'}
          >
            {!isError && (
              <Link to='/' onClick={() => dispatch(selectCategoryAction(''))}>
                Все книги
              </Link>
            )}
          </li>
          {categories?.map(({ name, id, path }) => {
            const counter = CounterBooks({ name, books });

            return (
              <li key={id}>
                <Link
                  to={`/books/${path}`}
                  className={styles.listItem}
                  onClick={() => {
                    dispatch(closeBurgerMenu());
                    dispatch(selectCategoryAction(name));
                  }}
                >
                  {name}
                  <span>{counter} </span>
                </Link>
              </li>
            );
          })}
        </ul>
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
            className={classNames(styles.title)}
            onClick={() => {
              setIsShowNavigate(false);
            }}
            data-test-id={activeBurger ? 'burger-contract' : 'navigation-contract'}
          >
            Договор оферты
          </NavLink>
        </div>
        <div className={styles.loginNavigate}>
          <div className={classNames(styles.title)}>Профиль</div>
          <div className={classNames(styles.title)}>Выход</div>
        </div>
      </div>
    </div>
  );
};
