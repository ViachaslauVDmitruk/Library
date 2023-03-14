import { useFormContext } from 'react-hook-form';

import { Star } from './star';

import styles from './review-rating-star.module.scss';

export const ReviewRatingStar = () => {
  const { register } = useFormContext();

  return (
    <div className={styles.ratingStar}>
      <div className={styles.rowStars}>
        <input
          id='star5'
          {...register('rating')}
          type='radio'
          className={styles.starRatingItem}
          name='rating'
          value='5'
        />
        <label htmlFor='star5' className={styles.starRatingLabel}>
          <Star />
        </label>
        <input
          id='star4'
          {...register('rating')}
          type='radio'
          className={styles.starRatingItem}
          name='rating'
          value='4'
        />
        <label htmlFor='star4' className={styles.starRatingLabel}>
          <Star />
        </label>
        <input
          id='star3'
          {...register('rating')}
          type='radio'
          className={styles.starRatingItem}
          name='rating'
          value='3'
        />
        <label htmlFor='star3' className={styles.starRatingLabel}>
          <Star />
        </label>
        <input
          id='star2'
          {...register('rating')}
          type='radio'
          className={styles.starRatingItem}
          name='rating'
          value='2'
        />
        <label htmlFor='star2' className={styles.starRatingLabel}>
          <Star />
        </label>
        <input
          id='star1'
          {...register('rating')}
          type='radio'
          className={styles.starRatingItem}
          name='rating'
          value='1'
        />
        <label htmlFor='star1' className={styles.starRatingLabel}>
          <Star />
        </label>
      </div>
    </div>
  );
};
