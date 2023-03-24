import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { userSelector } from '../../../selectors';
import { CardListView } from '../../card/card-list-view';
import { useAppSelector } from '../../hooks';

import styles from '../profile-books.module.scss';

export const ProfileBooking = () => {
  const [isOverdueBooking, setIsOverdueBooking] = useState<boolean>(false);
  const { user } = useAppSelector(userSelector);

  const bookProps = user.booking?.book;

  const dateOrder = user?.booking?.dateOrder;

  useEffect(() => {
    if (dateOrder) {
      const moment = Date.now();
      const isOver = moment - Date.parse(dateOrder) > 60 * 60 * 24 * 1000;

      setIsOverdueBooking(isOver);
    }
  }, [dateOrder]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapperHistory}>
        <div className={styles.title}>Забронированная книга</div>
        <div className={styles.discription}>
          Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
        </div>
        {!bookProps && (
          <div className={styles.content} data-test-id='empty-blue-card'>
            Забронируйте книгу и она отобразится
          </div>
        )}

        {bookProps && (
          <div className={styles.cardAlert}>
            <CardListView
              src={bookProps?.image || null}
              title={bookProps?.title || ''}
              rating={bookProps?.rating || null}
              id={bookProps?.id || ''}
              authors={bookProps?.authors || []}
              issueYear={bookProps?.issueYear || ''}
              bookingUserBookId={user.booking?.id ?? null}
              searchValue=''
            />
            {isOverdueBooking && (
              <div className={classNames(styles.content, { [styles.alert]: isOverdueBooking })} data-test-id='expired'>
                Дата бронирования <br /> книги истекла
                <span>Через 24 часа книга будет доступна всем</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
