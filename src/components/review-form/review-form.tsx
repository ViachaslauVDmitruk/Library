/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { alertSelector, oneBookSelector, reviewSelector, userSelector } from '../../selectors';
import { sendChangedReviewData, sendReviewData } from '../../store/review';
import { ReviewProps } from '../../store/review/type';
import { ModalFromState } from '../../types/modal';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';
import { ReviewRatingStar } from '../review-rating-star';

import closeSrc from './assets/close.png';

import styles from './review-form.module.scss';

const modal = document.getElementById('modal') as HTMLElement;

export const ReviewForm = ({ isOpen, setIsOpen, rating, commentId }: ModalFromState) => {
  const { book } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(userSelector);
  const { isLoadingModal } = useAppSelector(reviewSelector);
  const { alertMessage } = useAppSelector(alertSelector);
  const dispatch = useAppDispatch();

  const methods = useForm<ReviewProps>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      text: '',
      rating: null,
      book: book?.id,
      user: user?.id,
    },
  });

  const { register, handleSubmit, reset, watch, getValues } = methods;

  const onSubmit = (data: ReviewProps) => {
    if (commentId) {
      dispatch(
        sendChangedReviewData({
          rating: Number(data.rating),
          text: data.text,
          book: data.book,
          user: data.user,
          commentId,
        })
      );
    } else {
      dispatch(
        sendReviewData({
          rating: Number(data.rating),
          text: data.text,
          book: data.book,
          user: data.user,
        })
      );
    }

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
    setIsOpen(false);
    reset();
  };

  useEffect(() => {
    if (alertMessage) {
      setIsOpen(false);
    }
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div>
      {isLoadingModal && <Loader />}
      <FormProvider {...methods}>
        <div
          className={classNames(styles.reviewForm, { [styles.visible]: isOpen })}
          onClick={closeReviewModal}
          data-test-id='modal-outer'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-test-id='modal-rate-book'
            className={styles.wrapperStopPropagination}
          >
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.closeButton} onClick={closeReviewModal} data-test-id='modal-close-button'>
                <img src={closeSrc} alt='img' />
              </div>
              <div className={styles.formTitle} data-test-id='modal-title'>
                Оцените книгу
              </div>
              <div className={styles.formText}>Ваша оценка</div>
              <ReviewRatingStar rating={rating || 0} />
              <textarea
                {...register('text')}
                name='text'
                id=''
                cols={10}
                rows={5}
                placeholder='Комментарии'
                className={styles.textarea}
                data-test-id='comment'
              />
              <Button
                type='submit'
                disabled={!rating && !getValues('rating')}
                buttonText={rating ? 'Изменить комментарий' : 'Оценить'}
                passStyle={styles.button}
                id='button-comment'
              />
            </form>
          </div>
        </div>
      </FormProvider>
    </div>,
    modal
  );
};
