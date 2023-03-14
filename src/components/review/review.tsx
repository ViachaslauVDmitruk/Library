import { useState } from 'react';
import { format } from 'date-fns';

import { API_HOST } from '../../api/const';
import { UserProps } from '../../store/book/types';
import { Button } from '../button';
import { ReviewForm } from '../review-form';
import { StarsRating } from '../stars-rating';

import ava from './assets/avatar.png';
import arrowUp from './assets/list-hide.png';
import arrowDown from './assets/list-show.png';

import styles from './review.module.scss';

type CommentsState = {
  comments: CommentsStateProps[];
};

type CommentsStateProps = {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: UserProps;
};

export const Review = ({ comments }: CommentsState) => {
  const [isShowReview, setIsShowReview] = useState<boolean>(false);
  const [isOpenReviewModal, setIsOpenReveiwModal] = useState<boolean>(false);

  const ToggleReview = () => {
    setIsShowReview(!isShowReview);
  };

  return (
    <div className={styles.review}>
      <ReviewForm isOpen={isOpenReviewModal} setIsOpen={setIsOpenReveiwModal} />
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.textTitle}>
            Отзывы
            <span />{' '}
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
          <div className={styles.reviewItems}>
            {comments?.map((item) => (
              <div className={styles.content} key={item.id}>
                <div className={styles.information}>
                  <div className={styles.avatar}>
                    <img src={item.user.avatarUrl ? `${API_HOST}${item.user.avatarUrl}` : ava} alt='img' />
                  </div>
                  <div className={styles.accountData}>
                    <div className={styles.account}>
                      {item.user.firstName} {item.user.lastName}
                    </div>
                    <div className={styles.data}>{format(new Date(item.createdAt), 'dd LLLL yyyy')}</div>
                  </div>
                </div>
                <div className={styles.stars}>
                  <StarsRating ratingStars={item.rating} />
                </div>
                <div className={styles.text}>{item.text}</div>
              </div>
            ))}
          </div>
        )}
        <Button
          type='button'
          passStyle={styles.button}
          onClick={() => setIsOpenReveiwModal(true)}
          buttonText='Оценить'
        />
      </div>
    </div>
  );
};
