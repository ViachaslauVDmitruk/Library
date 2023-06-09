import { useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';

import { alertSelector, loginSelector, oneBookSelector } from '../../selectors';
import { BookProps } from '../../store/books/types';
import { Calendar } from '../booking';
import { Button } from '../button';
import { AlertMessage } from '../error-message';
import { useAppSelector } from '../hooks';
import { SliderBook } from '../slider';

import styles from './about-book.module.scss';
import { USER_FULL_DATA } from '../../const/user-data';

type BookId = {
  book: BookProps | null;
};

export const AboutBook = ({ book }: BookId) => {
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  //   const { book } = useAppSelector(oneBookSelector);
  const { alertMessage, message } = useAppSelector(alertSelector);
  //   const { user } = useAppSelector(loginSelector);
  const user = USER_FULL_DATA;

  const customerId = book?.booking?.customerId;
  const isDelivery = book?.delivery;

  const userId = user?.id;

  return (
    <div className={styles.aboutBook}>
      {message && <AlertMessage message={message} stylesAlert={alertMessage} />}
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} bookId={book?.id} />
      <div className={styles.container}>
        <SliderBook src={book?.images || null} />
        <div className={styles.discribeTop}>
          <div className={styles.title} data-test-id='book-title'>
            {book?.title}
          </div>
          <div className={styles.author}>
            {book?.authors?.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Button
            type='button'
            passStyle={classNames(styles.button, { [styles.bookingUser]: customerId === userId })}
            disabled={(!!book?.booking && customerId !== userId) || !!isDelivery}
            buttonText={
              //   isDelivery?.dateHandedTo
              //     ? `Занята до ${format(new Date(isDelivery.dateHandedTo), 'd.MM')}`
              //     : book?.booking
              //     ? 'Забронирована'
              //     : 'Забронировать'
              'Забронировать'
            }
            id='booking-button'
            onClick={() => setIsOpenCalendar(true)}
          />
        </div>
        <div className={styles.discribeBottom}>
          <div className={styles.about}>О книге</div>

          <div className={styles.text}>{book?.description}</div>
        </div>
      </div>
    </div>
  );
};
