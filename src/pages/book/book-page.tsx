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
import {
  alertSelector,
  bookingSelector,
  booksSelector,
  burgeMenuSelector,
  categoriesSelector,
  oneBookSelector,
  userSelector,
} from '../../selectors';
import { getOneBook } from '../../store/book';
import { getCategories } from '../../store/categories';
import { getUserData } from '../../store/user-data';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { id } = useParams();
  const { activeBurger } = useAppSelector(burgeMenuSelector);
  const { isLoadingBook } = useAppSelector(oneBookSelector);
  const { isLoadingCategories } = useAppSelector(categoriesSelector);
  const { isLoadingBooks } = useAppSelector(booksSelector);
  const { isLoadingUser } = useAppSelector(userSelector);
  const { isLoadingModal } = useAppSelector(bookingSelector);
  const { alertMessage, message } = useAppSelector(alertSelector);
  const { book } = useAppSelector(oneBookSelector);

  const dispatch = useAppDispatch();
  const isGettingData = !message && !isLoadingBook;
  const loading = isLoadingUser || isLoadingBook || isLoadingCategories || isLoadingBooks || isLoadingModal;

  useEffect(() => {
    if (id) {
      dispatch(getOneBook(id));
      dispatch(getCategories());
      dispatch(getUserData());
    }
  }, [id]);

  return (
    <div className={styles.main}>
      {alertMessage && <AlertMessage message={message} stylesAlert={alertMessage} />}
      {loading && <Loader />}
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
      {isGettingData && <Review idBook={Number(id) || null} />}
    </div>
  );
};
