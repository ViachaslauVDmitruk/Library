/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { NAVIGATE_LIST } from '../../const/navigate-list';

import styles from './burger-menu.module.scss';

export type NAVPROPS = {
  activeBurger: boolean;
  setActiveBurger: Dispatch<SetStateAction<boolean>>;
};

export const BurgerMenu = ({ activeBurger, setActiveBurger }: NAVPROPS) => {
  useEffect(() => {
    if (activeBurger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeBurger]);

  return (
    <div className={styles.burgerMenu} onClick={() => setActiveBurger(false)} data-test-id='burger-navigation'>
      <div className={styles.burgerNavigate} onClick={(e) => e.stopPropagation()}>
        <div className={classNames(styles.navigateTitle)}>
          <Link to='/' className={styles.active} onClick={() => setActiveBurger(false)}>
            Витрина книг
          </Link>
        </div>
        <ul className={styles.listItems}>
          {NAVIGATE_LIST.map(({ title, id, number }) => (
            <li className={styles.listItem} key={id} onClick={() => setActiveBurger(false)}>
              {title} <span>{number}</span>
            </li>
          ))}
        </ul>
        <Link to='/terms' className={classNames(styles.navigateTitle)} onClick={() => setActiveBurger(false)}>
          <div className={classNames(styles.navigateTitle)}>Правила пользования</div>
        </Link>
        <Link to='/contract' className={classNames(styles.navigateTitle)} onClick={() => setActiveBurger(false)}>
          <div className={classNames(styles.navigateTitle)}>Договор оферты</div>
        </Link>
      </div>
    </div>
  );
};
