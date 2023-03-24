/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { format } from 'date-fns';

import { API_HOST } from '../../../api/const';
import { ColorMatch } from '../../../helpers/color-match';
import { bookingSelector, loginSelector } from '../../../selectors';
import { sendCancelBooking } from '../../../store/order';
import { clearDateOrder } from '../../../store/order-date';
import { CardProps } from '../../../types/card';
import { Calendar } from '../../booking';
import { Button } from '../../button';
import { AlertMessage } from '../../error-message';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Loader } from '../../loader';
import { StarsRating } from '../../stars-rating';
import noImage from '../assets/no-image.png';

import styles from './card-list-view.module.scss';

export const CardListView = ({
  src,
  rating,
  title,
  authors,
  id,
  issueYear,
  searchValue = '',
  booking,
  delivery,
  bookingUserBookId,
  deliveryUser = null,
}: CardProps) => {
  const { user } = useAppSelector(loginSelector);
  const { alertMessage, message, isLoadingModal } = useAppSelector(bookingSelector);
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const dispatch = useAppDispatch();
  const highlight = ColorMatch({ searchValue, title });

  const customerId = booking?.customerId;
  const isDelivery = delivery;
  const userId = user?.id;

  const CancelBooking = () => {
    if (bookingUserBookId) {
      dispatch(sendCancelBooking({ bookingId: bookingUserBookId, bookIdUpdate: '' }));
      dispatch(clearDateOrder());
    }
  };

  return (
    <div className={styles.cardList} data-test-id='card' key={id}>
      {isLoadingModal && <Loader />}
      {message && <AlertMessage stylesAlert={alertMessage} message={message} />}
      <Link to={bookingUserBookId ? `/books/all/${id}` : `/books/${category}/${id}`} className={styles.image}>
        <img src={src ? `${API_HOST}${src}` : noImage} alt='img' />
      </Link>
      <div className={styles.contentWrapper}>
        <Link to={bookingUserBookId ? `/books/all/${id}` : `/books/${category}/${id}`} className={styles.content}>
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
        <div
          className={styles.ratingButton}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}
          {booking && (
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
              onClick={() => {
                setIsOpenCalendar(true);
              }}
            />
          )}
          {bookingUserBookId && (
            <Button
              type='submit'
              passStyle={styles.button}
              buttonText='Отменить бронь'
              onClick={CancelBooking}
              id='cancel-booking-button'
            />
          )}
          {deliveryUser && <div className={styles.dateHandedTo}>Возврат {format(new Date(deliveryUser), 'd.MM')}</div>}
        </div>
      </div>
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} bookId={id} booking={booking} />
    </div>
  );
};
