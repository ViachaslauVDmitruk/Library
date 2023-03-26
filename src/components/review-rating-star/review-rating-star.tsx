/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-duplicate-props */
import { useFormContext } from 'react-hook-form';

import { Star } from './star';

import styles from './review-rating-star.module.scss';

type RatingBookUser = {
  rating: number;
};

export const ReviewRatingStar = ({ rating }: RatingBookUser) => {
  const { register, watch } = useFormContext();

  const changedRating = watch('rating') ? watch('rating') : rating || 0;

  return (
    <div className={styles.ratingStar}>
      <div className={styles.rowStars} data-test-id='rating'>
        <input id='1' {...register('rating')} type='radio' className={styles.starRatingItem} name='rating' value={1} />
        <label htmlFor='1' className={styles.starRatingLabel} data-test-id='star'>
          <Star id={watch('rating') > 0 ? 'star-active' : ''} stylePass={changedRating > 0 ? styles.colorStar : ''} />
        </label>
        <input id='2' {...register('rating')} type='radio' className={styles.starRatingItem} name='rating' value={2} />
        <label htmlFor='2' className={styles.starRatingLabel} data-test-id='star'>
          <Star id={watch('rating') > 1 ? 'star-active' : ''} stylePass={changedRating > 1 ? styles.colorStar : ''} />
        </label>
        <input id='3' {...register('rating')} type='radio' className={styles.starRatingItem} name='rating' value={3} />
        <label htmlFor='3' className={styles.starRatingLabel} data-test-id='star'>
          <Star id={watch('rating') > 2 ? 'star-active' : ''} stylePass={changedRating > 2 ? styles.colorStar : ''} />
        </label>
        <input id='4' {...register('rating')} type='radio' className={styles.starRatingItem} name='rating' value={4} />
        <label htmlFor='4' className={styles.starRatingLabel} data-test-id='star'>
          <Star id={watch('rating') > 3 ? 'star-active' : ''} stylePass={changedRating > 3 ? styles.colorStar : ''} />
        </label>
        <input id='5' {...register('rating')} type='radio' className={styles.starRatingItem} name='rating' value={5} />
        <label htmlFor='5' className={styles.starRatingLabel} data-test-id='star'>
          <Star id={watch('rating') > 4 ? 'star-active' : ''} stylePass={changedRating > 4 ? styles.colorStar : ''} />
        </label>
      </div>
    </div>
  );
};
