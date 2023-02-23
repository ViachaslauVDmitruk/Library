import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { booksSelector, inputSearchSelector, selectedCategorySelector } from '../../selectors';
import { CardWindowView } from '../card';
import { CardListView } from '../card/card-list-view';
import { Filter } from '../filter';

import styles from './books.module.scss';

export const Books = () => {
  const [view, setView] = useState<string>('window');
  const [isWindow, setIsWindow] = useState<boolean>(true);
  const { books, isError, isLoading } = useSelector(booksSelector);
  const { selectedCategory } = useSelector(selectedCategorySelector);
  const { searchValue } = useSelector(inputSearchSelector);

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

  return (
    <div className={styles.content}>
      {!isError && !isLoading && <Filter changeView={setView} viewWindow={isWindow} />}

      {categoryMode.length ? (
        filteredCategoryBySearch.length ? (
          <div className={styles[view]}>
            {filteredCategoryBySearch.map(({ image, rating, title, authors, id, issueYear }) =>
              isWindow ? (
                <CardWindowView
                  src={image}
                  rating={rating}
                  title={title}
                  authors={authors}
                  key={id}
                  id={id}
                  issueYear={issueYear}
                  searchValue={searchValue}
                />
              ) : (
                <CardListView
                  src={image}
                  rating={rating}
                  title={title}
                  authors={authors}
                  key={id}
                  id={id}
                  issueYear={issueYear}
                  searchValue={searchValue}
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
