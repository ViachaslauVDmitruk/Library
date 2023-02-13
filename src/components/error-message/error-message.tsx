import classNames from 'classnames';
import { useState } from 'react';
import { ButtonClose } from '../button-close/button-close';
import errorSrc from './assets/error.png';

import styles from './error-message.module.scss';

export const ErrorMessage = () => {
  const [isClosedMessage, setIsClosedMessage] = useState<boolean>(false);

  return (
    <div className={classNames(styles.container, { [styles.closeError]: isClosedMessage })} data-test-id='error'>
      <div className={styles.errorMessage}>
        <div className={styles.textError}>
          <div className={styles.image}>
            <img src={errorSrc} alt='img' />
          </div>
          <div className={styles.text}>Что-то пошло не так. Обновите страницу через некоторое время.</div>
        </div>
        <ButtonClose isActive={isClosedMessage} setIsActive={setIsClosedMessage} />
      </div>
    </div>
  );
};
