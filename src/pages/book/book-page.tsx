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
import { burgeMenuSelector, categoriesSelector, oneBookSelector, reviewSelector, userSelector } from '../../selectors';
import { getOneBook } from '../../store/book';
import { getCategories } from '../../store/categories';
import { getUserData } from '../../store/user-data';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { id } = useParams();
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const { isLoadingBook, messageBook } = useAppSelector(oneBookSelector);
  const { isLoadingCategories, isErrorCategories } = useAppSelector(categoriesSelector);
  const { book } = useAppSelector(oneBookSelector);

  const { isLoadingUser, isErrorUserResponse } = useAppSelector(userSelector);
  const { alertMessage, message } = useAppSelector(reviewSelector);
  const dispatch = useAppDispatch();
  const isGettingData = !messageBook && !isLoadingBook;
  const error = isErrorCategories || isErrorUserResponse || messageBook;
  const loading = isLoadingUser || isLoadingBook || isLoadingCategories;

  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
      dispatch(getCategories());
      dispatch(getUserData());
    }
  }, [id]);

  return (
    <div className={styles.main}>
      {message && <AlertMessage message={message} stylesAlert={alertMessage} />}
      {loading && <Loader />}
      {error && <AlertMessage message={REQUEST_BOOK} stylesAlert='error' />}
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
      {isGettingData && <Review comments={book.comments} idBook={Number(id) || null} />}
    </div>
  );
};
