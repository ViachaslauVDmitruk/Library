import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { moment } from '../../../const/moment';
import { USER_FULL_DATA } from '../../../const/user-data';
import { userSelector } from '../../../selectors';
import { CardListView } from '../../card/card-list-view';
import { useAppSelector } from '../../hooks';

import styles from '../profile-books.module.scss';

export const ProfileOnHands = () => {
  const [isOverdueHandedTo, setIsOverdueHandedTo] = useState<boolean>(false);
  //   const { user } = useAppSelector(userSelector); from server information
  const user = USER_FULL_DATA;

  const deliveryProps = user.delivery?.book;
  const dateDelivery = user.delivery?.dateHandedTo;

  useEffect(() => {
    if (dateDelivery) {
      const isOver = moment - Date.parse(dateDelivery) >= 0;

      setIsOverdueHandedTo(isOver);
    }
  }, [dateDelivery]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapperHistory}>
        <div className={styles.title}>Книга которую взяли</div>
        <div className={styles.discription}>Здесь можете просмотреть информацию о книге и узнать сроки возврата</div>
        {!deliveryProps && (
          <div className={styles.content} data-test-id='empty-blue-card'>
            Прочитав книгу, она отобразится в истории{' '}
          </div>
        )}
        {deliveryProps && (
          <div className={styles.cardAlert}>
            <CardListView
              src={deliveryProps?.image || null}
              title={deliveryProps?.title || ''}
              rating={deliveryProps?.rating || null}
              id={deliveryProps?.id || ''}
              authors={deliveryProps?.authors || []}
              issueYear={deliveryProps?.issueYear || ''}
              deliveryUser={user.delivery?.dateHandedTo}
              searchValue=''
            />
            {isOverdueHandedTo && (
              <div className={classNames(styles.content, { [styles.alert]: isOverdueHandedTo })} data-test-id='expired'>
                Вышел срок пользования книги
                <span>Верните книгу, пожалуйста</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
