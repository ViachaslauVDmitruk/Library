/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { sortRatingDown, sortRatingUp } from '../../store/books';
import { setSearchValue } from '../../store/input-search';
import { useAppDispatch } from '../hooks';

import searchColor from './assets/icon-search-color.png';
import searchGrey from './assets/icon-search-grey.png';
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
  const [isColorIconSearch, setIsColorIconSearch] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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

  const mobileSearchActive = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target } = event;

    if (!isActiveSearch) {
      dispatch(setSearchValue(''));
      target.value = '';
    }
    setIsColorIconSearch(false);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.inputItems}>
        <div className={classNames(styles.itemInput, { [styles.search]: isActiveSearch })}>
          {!isActiveSearch && (
            <div className={styles.inputSearch}>
              <img src={isColorIconSearch ? searchColor : searchGrey} alt='img' />
            </div>
          )}
          <input
            type='text'
            placeholder='Поиск книги или автора…'
            spellCheck='false'
            data-test-id='input-search'
            onFocus={() => setIsColorIconSearch(true)}
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
            onBlur={mobileSearchActive}
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
