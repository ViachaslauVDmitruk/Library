/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AboutBook } from '../../components/about-book';
import { AlertMessage } from '../../components/error-message';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { Information } from '../../components/information';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { NavigatePath } from '../../components/navigate-path';
import { Review } from '../../components/review';
import { StarsRating } from '../../components/stars-rating';
import { REQUEST_BOOK } from '../../const/message';
import { burgeMenuSelector, oneBookSelector, reviewSelector } from '../../selectors';
import { getOneBook } from '../../store/book';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { id } = useParams();
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const { isLoading, isError } = useAppSelector(oneBookSelector);
  const { book } = useAppSelector(oneBookSelector);
  const { alertMessage, message } = useAppSelector(reviewSelector);
  const dispatch = useAppDispatch();
  const isGettingData = !isError && !isLoading;

  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
    }
  }, [id]);

  return (
    <div className={styles.main}>
      {message && <AlertMessage message={message} stylesAlert={alertMessage} />}
      {isLoading && <Loader />}
      {isError && <AlertMessage message={REQUEST_BOOK} stylesAlert='error' />}
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
