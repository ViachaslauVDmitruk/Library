import { useSelector } from 'react-redux';

import { AboutBook } from '../../components/about-book';
import { ErrorMessage } from '../../components/error-message';
import { Information } from '../../components/information';
import { Loader } from '../../components/loader';
import { NavigateList } from '../../components/navigate-list';
import { Review } from '../../components/review';
import { StarsRating } from '../../components/stars-rating';
import { booksSelector, burgeMenuSelector } from '../../selectors';

import styles from './book-page.module.scss';

export const BookPage = () => {
  const { activeBurger } = useSelector(burgeMenuSelector);
  const { isLoading, isError } = useSelector(booksSelector);

  return (
    <div className={styles.main}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div className={styles.navigatePath}>
        <div className={styles.container}>
          Бизнес книги / Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
        </div>
      </div>
      {activeBurger && <NavigateList />}
      <AboutBook />
      <div className={styles.container}>
        <div className={styles.ratingBox}>
          <div className={styles.title}>Рейтинг</div>
          <div className={styles.stars}>
            <StarsRating ratingStars={4} />
            <span>4.3</span>
          </div>
        </div>
      </div>
      <Information />
      <Review />
    </div>
  );
};
