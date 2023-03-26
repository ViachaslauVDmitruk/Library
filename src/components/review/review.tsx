import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { intlFormat } from 'date-fns';

import { API_HOST } from '../../api/const';
import { oneBookSelector, userSelector } from '../../selectors';
import { CommentsType } from '../../store/login/type';
import { Button } from '../button';
import { useAppSelector } from '../hooks';
import { ReviewForm } from '../review-form';
import { StarsRating } from '../stars-rating';

import ava from './assets/avatar.png';
import arrowUp from './assets/list-hide.png';
import arrowDown from './assets/list-show.png';

import styles from './review.module.scss';

type BookIdType = {
  idBook: number | null;
};

export const Review = ({ idBook }: BookIdType) => {
  const [isShowReview, setIsShowReview] = useState<boolean>(true);
  const [isOpenReviewModal, setIsOpenReveiwModal] = useState<boolean>(false);
  const [isAlreadyCommented, setIsAlreadyCommented] = useState<boolean>(false);
  const [commented, setCommented] = useState<CommentsType>();
  const { user } = useAppSelector(userSelector);
  const { book } = useAppSelector(oneBookSelector);
  const commentsUser = user.comments;
  const commentsList = book.comments ?? [];

  useEffect(() => {
    if (commentsUser) {
      const commentedBook = commentsUser.find(({ bookId }) => bookId === idBook);

      if (commentedBook) {
        setCommented(commentedBook);
        setIsAlreadyCommented(true);
      }
    }
  }, [commentsUser, idBook]);

  const ToggleReview = () => {
    setIsShowReview(!isShowReview);
  };

  return (
    <div className={styles.review}>
      <ReviewForm
        isOpen={isOpenReviewModal}
        setIsOpen={setIsOpenReveiwModal}
        rating={commented?.rating}
        commentId={commented?.id}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.textTitle}>
            Отзывы
            <span>{commentsList.length || ''}</span>
          </div>
          <button
            type='button'
            onClick={() => ToggleReview()}
            className={styles.viewReview}
            data-test-id='button-hide-reviews'
          >
            <img src={isShowReview ? arrowUp : arrowDown} alt='img' />
          </button>
        </div>

        {isShowReview && (
          <div className={styles.reviewItems} data-test-id='reviews'>
            {commentsList.map((item) => (
              <div className={styles.content} key={item.id} data-test-id='comment-wrapper'>
                <div className={styles.information}>
                  <div className={styles.avatar}>
                    <img src={item.user.avatarUrl ? `${API_HOST}${item.user.avatarUrl}` : ava} alt='img' />
                  </div>
                  <div className={styles.accountData}>
                    <div className={styles.account} data-test-id='comment-author'>
                      {item.user.firstName} {item.user.lastName}
                    </div>
                    <div className={styles.data} data-test-id='comment-date'>
                      {intlFormat(
                        new Date(item.createdAt),
                        { year: 'numeric', month: 'long', day: 'numeric' },
                        {
                          locale: 'ru-Ru',
                        }
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.stars}>
                  <StarsRating ratingStars={item.rating} />
                </div>
                <div className={styles.text} data-test-id='comment-text'>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          type='button'
          passStyle={classNames(styles.button, { [styles.commented]: isAlreadyCommented })}
          onClick={() => setIsOpenReveiwModal(true)}
          buttonText={isAlreadyCommented ? 'Изменить оценку' : idBook ? 'Оценить книгу' : 'Оценить'}
          id='button-rate-book'
        />
      </div>
    </div>
  );
};
