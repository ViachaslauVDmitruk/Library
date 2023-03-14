import { useState } from 'react';
import classNames from 'classnames';

import { ButtonClose } from '../button-close/button-close';

import errorSrc from './assets/error.png';
import successSrc from './assets/success.png';

import styles from './alert-message.module.scss';

type MessageType = {
  message: string;
  stylesAlert: 'success' | 'error' | '';
};

export const AlertMessage = ({ message, stylesAlert }: MessageType) => {
  const [isClosedMessage, setIsClosedMessage] = useState<boolean>(false);

  return (
    <div className={classNames(styles.container, { [styles.closeError]: isClosedMessage })} data-test-id='error'>
      <div className={classNames(styles.errorMessage, styles[stylesAlert])}>
        <div className={styles.textError}>
          <div className={styles.image}>
            <img src={stylesAlert === 'success' ? successSrc : errorSrc} alt='img' />
          </div>
          <div className={styles.text}>{message}</div>
        </div>
        <ButtonClose isActive={isClosedMessage} setIsActive={setIsClosedMessage} />
      </div>
    </div>
  );
};
