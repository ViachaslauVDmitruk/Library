/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { Button } from '../button';
import { ReviewRatingStar } from '../review-rating-star';

import closeSrc from './assets/close.png';

import styles from './review-form.module.scss';

const modal = document.getElementById('modal') as HTMLElement;

type ReviewProps = {
  text: string;
  rating: number | null;
  book: string;
  user: string;
};

type RevieFormState = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ReviewForm = ({ isOpen, setIsOpen }: RevieFormState) => {
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

  const { register, handleSubmit, reset } = methods;

  const onSubmit = (data: ReviewProps) => {
    reset();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeReviewModal = () => {
    reset();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <FormProvider {...methods}>
      <div className={classNames(styles.reviewForm, { [styles.visible]: isOpen })} onClick={closeReviewModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.closeButton} onClick={closeReviewModal}>
              <img src={closeSrc} alt='img' />
            </div>
            <div className={styles.formTitle}>Оцените книку</div>
            <div className={styles.formText}>Ваша оценка</div>
            <ReviewRatingStar />
            <textarea
              {...register('text')}
              name='text'
              id=''
              cols={30}
              rows={10}
              placeholder='Комментарии'
              className={styles.textarea}
            />
            <Button type='submit' buttonText='Оценить' passStyle={styles.button} />
          </form>
        </div>
      </div>
    </FormProvider>,
    modal
  );
};
