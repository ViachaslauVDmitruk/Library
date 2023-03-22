import { userSelector } from '../../../selectors';
import { CardListView } from '../../card/card-list-view';
import { useAppSelector } from '../../hooks';

import styles from '../profile-books.module.scss';

export const ProfileBooking = () => {
  const { user } = useAppSelector(userSelector);

  const bookProps = user.booking?.book;

  return (
    <div className={styles.container}>
      {!bookProps && (
        <div className={styles.wrapperHistory} data-test-id='empty-blue-card'>
          <div className={styles.title}>Забронированная книга</div>
          <div className={styles.discription}>
            Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
          </div>
          <div className={styles.content}>Забронируйте книгу и она отобразится</div>
        </div>
      )}
      {bookProps && (
        <CardListView
          src={bookProps?.image || null}
          title={bookProps?.title || ''}
          rating={bookProps?.rating || null}
          id={bookProps?.id || ''}
          authors={bookProps?.authors || []}
          issueYear={bookProps?.issueYear || ''}
          bookingUser={user.booking}
          searchValue=''
        />
      )}
    </div>
  );
};
