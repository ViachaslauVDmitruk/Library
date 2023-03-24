/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';

import { API_HOST } from '../../api/const';
import { ColorMatch } from '../../helpers/color-match';
import { reviewSelector, userSelector } from '../../selectors';
import { getOneBook } from '../../store/book';
import { CommentsType } from '../../store/login/type';
import { CardProps } from '../../types/card';
import { Calendar } from '../booking';
import { Button } from '../button';
import { AlertMessage } from '../error-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ReviewForm } from '../review-form';
import { StarsRating } from '../stars-rating';

import noImage from './assets/no-image.png';

import styles from './card.module.scss';

export const CardWindowView = ({
  src,
  rating,
  title,
  authors,
  id,
  issueYear,
  searchValue = '',
  booking,
  delivery,
  commentsUser,
}: CardProps) => {
  const { alertMessage, message } = useAppSelector(reviewSelector);
  const { user } = useAppSelector(userSelector);

  const [isAlreadyCommented, setIsAlreadyCommented] = useState<boolean>(false);
  const [isOpenReviewModal, setIsOpenReveiwModal] = useState<boolean>(false);
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [commented, setCommented] = useState<CommentsType | undefined>();

  const { category } = useParams();

  const dispatch = useAppDispatch();
  const highlight = ColorMatch({ searchValue, title });
  const customerId = booking?.customerId;
  const isDelivery = delivery;
  const userId = user?.id;

  useEffect(() => {
    if (commentsUser) {
      const commentedBook = commentsUser.find(({ bookId }) => bookId === id);

      if (commentedBook) {
        setCommented(commentedBook);
        setIsAlreadyCommented(true);
      }
    }
  }, [commentsUser, id]);

  return (
    <div className={styles.cardWindow} data-test-id='card' key={id}>
      {message && <AlertMessage stylesAlert={alertMessage} message={message} />}
      <ReviewForm
        isOpen={isOpenReviewModal}
        setIsOpen={setIsOpenReveiwModal}
        rating={commented?.rating}
        commentId={commented?.id}
      />
      <Link to={commentsUser ? `/books/all/${id}` : `/books/${category}/${id}`} className={styles.content}>
        <div className={styles.image}>
          <img src={src ? `${API_HOST}${src}` : noImage} alt='img' />
        </div>
        {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}
        <div className={styles.title} data-test-id='book-title'>
          {highlight}
        </div>
        <div className={styles.author}>
          {authors?.map((item) => (
            <span key={item}>{item}, </span>
          ))}
          <span>{issueYear}</span>
        </div>
      </Link>

      {!commentsUser && (
        <Button
          type='button'
          passStyle={classNames(styles.button, { [styles.bookingUser]: customerId === userId })}
          disabled={(!!booking && customerId !== userId) || !!isDelivery}
          buttonText={
            isDelivery?.dateHandedTo
              ? `Занята до ${format(new Date(isDelivery.dateHandedTo), 'd.MM')}`
              : booking
              ? 'Забронирована'
              : 'Забронировать'
          }
          id='booking-button'
          onClick={() => setIsOpenCalendar(true)}
        />
      )}

      {commentsUser && (
        <Button
          type='button'
          buttonText={isAlreadyCommented ? 'Изменить оценку' : 'Оставить отзыв'}
          passStyle={classNames(styles.button, { [styles.commented]: isAlreadyCommented })}
          id='history-review-button'
          onClick={() => {
            setIsOpenReveiwModal(true);
            dispatch(getOneBook(id));
          }}
        />
      )}
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} bookId={id} booking={booking} />
    </div>
  );
};
