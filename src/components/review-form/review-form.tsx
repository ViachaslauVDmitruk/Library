/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dispatch, SetStateAction, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { loginSelector, oneBookSelector } from '../../selectors';
import { sendReviewData } from '../../store/review';
import { ReviewProps } from '../../store/review/type';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ReviewRatingStar } from '../review-rating-star';

import closeSrc from './assets/close.png';

import styles from './review-form.module.scss';

const modal = document.getElementById('modal') as HTMLElement;

type RevieFormState = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ReviewForm = ({ isOpen, setIsOpen }: RevieFormState) => {
  const { book } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(loginSelector);
  const dispatch = useAppDispatch();

  const methods = useForm<ReviewProps>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      text: '',
      rating: 1,
      book: book?.id,
      user: user?.id,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const onSubmit = (data: ReviewProps) => {
    setIsOpen(false);
    dispatch(
      sendReviewData({
        rating: Number(data.rating),
        text: data.text,
        book: data.book,
        user: data.user,
      })
    );
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
      <div
        className={classNames(styles.reviewForm, { [styles.visible]: isOpen })}
        onClick={closeReviewModal}
        data-test-id='modal-outer'
      >
        <div onClick={(e) => e.stopPropagation()}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='modal-rate-book'>
            <div className={styles.closeButton} onClick={closeReviewModal} data-test-id='modal-close-button'>
              <img src={closeSrc} alt='img' />
            </div>
            <div className={styles.formTitle} data-test-id='modal-title'>
              Оцените книгу
            </div>
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
              data-test-id='comment'
            />
            <Button
              disabled={!isDirty}
              type='submit'
              buttonText='Оценить'
              passStyle={styles.button}
              id='button-comment'
            />
          </form>
        </div>
      </div>
    </FormProvider>,
    modal
  );
};
