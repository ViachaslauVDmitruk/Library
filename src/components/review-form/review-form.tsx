import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { loginSelector } from '../../selectors';
import { Button } from '../button';
import { useAppSelector } from '../hooks';
import { ReviewRatingStar } from '../review-rating-star';

import closeSrc from './assets/close.png';

import styles from './review-form.module.scss';

// const modal = document.getElementById('modal');

type ReviewProps = {
  text: string;
  rating: number | null;
  book: string;
  user: string;
};

export const ReviewForm = () => {
  const { user } = useAppSelector(loginSelector);
  const methods = useForm<ReviewProps>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      text: '',
      rating: null,
      book: '',
      user: '',
    },
  });

  const { getValues, register, watch, handleSubmit } = methods;

  const onSubmit = (data: ReviewProps) => {
    console.log('data', data);
  };

  console.log('rating getValues', getValues('rating'));
  console.log('rating watch', watch('rating'));

  return (
    <FormProvider {...methods}>
      <div className={styles.reviewForm}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.closeButton}>
            <img src={closeSrc} alt='img' />
          </div>
          <div className={styles.formTitle}>Оцените книку</div>
          <div className={styles.formText}>Ваша оценка</div>
          <ReviewRatingStar />
          <textarea {...register('text')} name='text' id='' cols={30} rows={10} placeholder='Комментарии' />
          <Button type='submit' buttonText='Оценить' passStyle={styles.button} />
        </form>
      </div>
    </FormProvider>
  );
};
