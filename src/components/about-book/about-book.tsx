import { useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';

import { bookingSelector, loginSelector, oneBookSelector } from '../../selectors';
import { Calendar } from '../booking';
import { Button } from '../button';
import { AlertMessage } from '../error-message';
import { useAppSelector } from '../hooks';
import { SliderBook } from '../slider';

import styles from './about-book.module.scss';

export const AboutBook = () => {
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const { book } = useAppSelector(oneBookSelector);
  const { alertMessage, message } = useAppSelector(bookingSelector);
  const { user } = useAppSelector(loginSelector);

  const customerId = book.booking?.customerId;
  const isDelivery = book.delivery;

  const userId = user?.id;

  //   console.log('is delivery handed', isDelivery?.handed);

  return (
    <div className={styles.aboutBook}>
      {message && <AlertMessage message={message} stylesAlert={alertMessage} />}
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} bookId={book.id} />
      <div className={styles.container}>
        <SliderBook src={book.images} />
        <div className={styles.discribeTop}>
          <div className={styles.title} data-test-id='book-title'>
            {book.title}
          </div>
          <div className={styles.author}>
            {book.authors.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Button
            type='button'
            passStyle={classNames(styles.button, { [styles.bookingUser]: customerId === userId })}
            disabled={!!book.booking && customerId !== userId}
            buttonText={book.booking ? 'Забронирована' : 'Забронировать'}
            id='booking-button'
            onClick={() => setIsOpenCalendar(true)}
          />
        </div>
        <div className={styles.discribeBottom}>
          <div className={styles.about}>О книге</div>

          <div className={styles.text}>{book.description}</div>
        </div>
      </div>
    </div>
  );
};
