import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import styles from './button-close.module.scss';

type ButtonProps = {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export const ButtonClose = ({ isActive, setIsActive }: ButtonProps) => (
  <button
    type='button'
    className={classNames(styles.closeButton, { [styles.searchActive]: isActive })}
    onClick={() => setIsActive(true)}
  >
    <div className={styles.close}> </div>
  </button>
);
