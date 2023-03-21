import classNames from 'classnames';

import { closeBookingAlert } from '../../store/order';
import { Button } from '../button';
import { useAppDispatch } from '../hooks';

import closeSrc from './assets/close.png';
import errorSrc from './assets/error.png';
import successSrc from './assets/success.png';

import styles from './alert-message.module.scss';
import { closeReviewAlert } from '../../store/review';
import { closeAvatarAlert } from '../../store/avatar';

type MessageType = {
  message: string;
  stylesAlert: 'success' | 'error' | '';
};

export const AlertMessage = ({ message, stylesAlert }: MessageType) => {
  const dispatch = useAppDispatch();

  const closeAlert = () => {
    dispatch(closeBookingAlert());
    dispatch(closeReviewAlert());
    dispatch(closeAvatarAlert());
  };

  return (
    <div className={styles.container}>
      <div className={classNames(styles.errorMessage, styles[stylesAlert])} data-test-id='error'>
        <div className={styles.textError}>
          <div className={styles.image}>
            <img src={stylesAlert === 'success' ? successSrc : errorSrc} alt='img' />
          </div>
          <div className={styles.text}>{message}</div>
        </div>
        <Button type='button' onClick={closeAlert} src={closeSrc} id='alert-close' passStyle={styles.closeButton} />
      </div>
    </div>
  );
};
