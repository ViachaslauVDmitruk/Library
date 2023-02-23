/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AboutBook } from '../../components/about-book';
import { ErrorMessage } from '../../components/error-message';
import { useAppDispatch } from '../../components/hooks';
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
  const dispatch = useAppDispatch();
  const isGettingData = !isError && !isLoading;

  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
    }
  }, []);

  return (
    <div className={styles.main}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <NavigatePath title={book.title} />
      {activeBurger && <NavigateList />}
      {isGettingData && <AboutBook />}
      {isGettingData && (
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
      {isGettingData && <Information />}
      {isGettingData && <Review comments={book.comments} />}
    </div>
  );
};
