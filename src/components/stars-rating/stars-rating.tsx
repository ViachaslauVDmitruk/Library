import emptyStar from './assets/empty-star.png';
import fullStar from './assets/full-star.png';

import styles from './stars-rating.module.scss';

const stars = [{ count: 1 }, { count: 2 }, { count: 3 }, { count: 4 }, { count: 5 }];

type StarsProps = {
  ratingStars: number | null;
};

export const StarsRating = ({ ratingStars }: StarsProps) => (
  <ul className={styles.rating}>
    {stars.map(({ count }) => (
      <li key={count}>{/* <img src={count <= ratingStars ? fullStar : emptyStar} alt='img' /> */}</li>
    ))}
  </ul>
);
