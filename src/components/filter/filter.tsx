import classNames from 'classnames';
import { useState } from 'react';

import listActive from './assets/list-active.png';
import listDisable from './assets/list-disable.png';
import rating from './assets/rating.png';
import search from './assets/search-button.png';
import windowActive from './assets/window-active.png';
import windowDisable from './assets/window-disable.png';

import styles from './filter.module.scss';

export type ChangeViewProps = {
  viewWindow: boolean | undefined;
  changeView: (view: string) => void;
};

export const Filter = ({ viewWindow, changeView }: ChangeViewProps) => {
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);

  return (
    <div className={styles.filter}>
      <div className={styles.inputItems}>
        <div className={classNames(styles.itemInput, { [styles.search]: isActiveSearch })}>
          <input type='text' placeholder='Поиск книги или автора…' data-test-id='input-search' />
          <button
            type='button'
            className={classNames(styles.closeSearchButton, { [styles.searchActive]: isActiveSearch })}
            onClick={() => setIsActiveSearch(false)}
            data-test-id='button-search-close'
          >
            <div className={classNames(styles.closeSearch)}> </div>
          </button>
        </div>
        {!isActiveSearch && (
          <button
            type='button'
            className={styles.searchButton}
            onClick={() => setIsActiveSearch(true)}
            data-test-id='button-search-open'
          >
            <img src={search} alt='img' />
          </button>
        )}
        {!isActiveSearch && (
          <button type='button' className={classNames(styles.itemInput, styles.itemButton)}>
            <img src={rating} alt='img' />
            По рейтингу
          </button>
        )}
      </div>
      {!isActiveSearch && (
        <div className={styles.viewButtons}>
          <button
            type='button'
            onClick={() => {
              changeView('window');
            }}
            className={styles.viewButton}
            data-test-id='button-menu-view-window'
          >
            <img src={viewWindow ? windowActive : windowDisable} alt='img' />
          </button>
          <button
            type='button'
            onClick={() => {
              changeView('list');
            }}
            className={styles.viewButton}
            data-test-id='button-menu-view-list'
          >
            <img src={viewWindow ? listDisable : listActive} alt='img' />
          </button>
        </div>
      )}
    </div>
  );
};
