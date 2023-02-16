/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AboutBook } from '../../components/about-book';
import { ErrorMessage } from '../../components/error-message';
import { Information } from '../../components/information';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { NavigatePath } from '../../components/navigate-path';
import { Review } from '../../components/review';
import { StarsRating } from '../../components/stars-rating';
import { burgeMenuSelector, oneBookSelector } from '../../selectors';
import { getOneBook } from '../../store/book';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { id } = useParams();
  const { activeBurger } = useSelector(burgeMenuSelector);
  const { isLoading, isError } = useSelector(oneBookSelector);
  const { book } = useSelector(oneBookSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
    }
  }, []);

  return (
    <div className={styles.main}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <NavigatePath categories={book.categories} title={book.title} />
      {activeBurger && <NavigateList />}
      {!isError && !isLoading && <AboutBook />}
      {!isError && !isLoading && (
        <div className={styles.container}>
          <div className={styles.ratingBox}>
            <div className={styles.title}>Рейтинг</div>
            <div className={styles.stars}>
              <StarsRating ratingStars={book.rating} />
              <span>{book.rating}</span>
            </div>
          </div>
        </div>
      )}
      {!isError && !isLoading && <Information />}
      {!isError && !isLoading && <Review comments={book.comments} />}
    </div>
  );
};
