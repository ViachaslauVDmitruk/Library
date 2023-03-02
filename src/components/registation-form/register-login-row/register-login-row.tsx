import { Button } from '../../button';

import arrowNext from './assets/arrow-next.png';

import styles from './register-login-row.module.scss';

export const RegisterLoginRow = () => (
  <div className={styles.row}>
    <span>Есть учётная запись?</span>
    <Button buttonText='Войти' src={arrowNext} type='button' passStyle={styles.registrationButton} />
  </div>
);
