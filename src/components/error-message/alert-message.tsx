import { useEffect } from 'react';
import classNames from 'classnames';

import { alertSelector } from '../../selectors';
import { closeAlertMessage } from '../../store/alert';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';

import closeSrc from './assets/close.png';
import errorSrc from './assets/error.png';
import successSrc from './assets/success.png';

import styles from './alert-message.module.scss';

type MessageType = {
  message: string;
  stylesAlert: 'success' | 'error' | '';
};

export const AlertMessage = ({ message, stylesAlert }: MessageType) => {
  const { alertMessage } = useAppSelector(alertSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => dispatch(closeAlertMessage()), 4000);
    }
  });

  const closeAlert = () => {
    dispatch(closeAlertMessage());
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
