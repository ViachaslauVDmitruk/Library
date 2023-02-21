/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { sortRatingDown, sortRatingUp } from '../../store/books';
import { setSearchValue } from '../../store/input-search';

import sortDown from './assets/icon-sort-ascending.png';
import sortUp from './assets/icon-sort-descending.png';
import listActive from './assets/list-active.png';
import listDisable from './assets/list-disable.png';
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
  const [sortRatingMode, setSortRatingMode] = useState<boolean>(true);
  const dispatch = useDispatch();

  const ToggleSortRating = () => {
    setSortRatingMode(!sortRatingMode);
  };

  useEffect(() => {
    if (sortRatingMode) {
      dispatch(sortRatingDown());
    } else {
      dispatch(sortRatingUp());
    }
  }, [sortRatingMode, dispatch]);

  return (
    <div className={styles.filter}>
      <div className={styles.inputItems}>
        <div className={classNames(styles.itemInput, { [styles.search]: isActiveSearch })}>
          <input
            type='text'
            placeholder='Поиск книги или автора…'
            data-test-id='input-search'
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
            onBlur={(event) => {
              dispatch(setSearchValue(''));
              event.target.value = '';
            }}
          />
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
          <button
            type='button'
            className={classNames(styles.itemInput, styles.itemButton)}
            onClick={() => ToggleSortRating()}
            data-test-id='sort-rating-button'
          >
            <img src={sortRatingMode ? sortDown : sortUp} alt='img' />
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
