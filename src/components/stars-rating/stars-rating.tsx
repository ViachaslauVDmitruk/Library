import emptyStar from './assets/empty-star.png';
import fullStar from './assets/full-star.png';

import styles from './stars-rating.module.scss';

const stars = [{ count: 1 }, { count: 2 }, { count: 3 }, { count: 4 }, { count: 5 }];

type StarsProps = {
  ratingStars: number | null;
};

export const StarsRating = ({ ratingStars }: StarsProps) => {
  const grade = ratingStars || 0;

  return (
    <ul className={styles.rating} data-test-id='rating'>
      {stars.map(({ count }) => (
        <li key={count}>
          {}
          <img src={count <= grade ? fullStar : emptyStar} alt='img' />
        </li>
      ))}
    </ul>
  );
};
