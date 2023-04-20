import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { booksSelector, inputSearchSelector, searchValueSelector, selectedCategorySelector } from '../../selectors';
import { getBooks } from '../../store/books';
import { getCategories } from '../../store/categories';
import { getUserData } from '../../store/user-data';
import { CardWindowView } from '../card';
import { CardListView } from '../card/card-list-view';
import { Filter } from '../filter';
import { useAppDispatch } from '../hooks';

import styles from './books.module.scss';
import { booksArray } from '../../const/mock-data/books';

export const Books = () => {
  const [view, setView] = useState<string>('window');
  const [isWindow, setIsWindow] = useState<boolean>(true);
  //   const { books, isErrorBooks, isLoadingBooks } = useSelector(booksSelector);
  const { isErrorBooks, isLoadingBooks } = useSelector(booksSelector);
  const { selectedCategory } = useSelector(selectedCategorySelector);
  const { searchValue } = useSelector(searchValueSelector);
  const dispatch = useAppDispatch();
  const books = booksArray;

  const categoryMode =
    selectedCategory === '' ? books : books.filter((book) => book.categories.some((item) => item === selectedCategory));

  const filteredCategoryBySearch = categoryMode.filter(({ title }) =>
    title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  useEffect(() => {
    if (view === 'window') {
      setIsWindow(true);
    } else {
      setIsWindow(false);
    }
  }, [view]);

  //   useEffect(() => {
  //     dispatch(getBooks());
  //     dispatch(getUserData());
  //     dispatch(getCategories());
  //   }, [dispatch]);

  return (
    <div className={styles.content}>
      {!isErrorBooks && !isLoadingBooks && <Filter changeView={setView} viewWindow={isWindow} />}

      {categoryMode.length ? (
        filteredCategoryBySearch.length ? (
          <div className={styles[view]} data-test-id='content'>
            {filteredCategoryBySearch.map(({ image, rating, title, authors, id, issueYear, booking, delivery }) =>
              isWindow ? (
                <CardWindowView
                  src={image?.url || null}
                  rating={rating}
                  title={title}
                  authors={authors}
                  key={id}
                  id={id}
                  issueYear={issueYear}
                  searchValue={searchValue}
                  booking={booking}
                  delivery={delivery}
                />
              ) : (
                <CardListView
                  src={image?.url || null}
                  rating={rating}
                  title={title}
                  authors={authors}
                  key={id}
                  id={id}
                  issueYear={issueYear}
                  searchValue={searchValue}
                  booking={booking}
                  delivery={delivery}
                />
              )
            )}
          </div>
        ) : (
          <div className={styles.notFound} data-test-id='search-result-not-found'>
            По запросу ничего не найдено
          </div>
        )
      ) : (
        <div className={styles.notFound} data-test-id='empty-category'>
          В этой категории книг ещё нет
        </div>
      )}
    </div>
  );
};
