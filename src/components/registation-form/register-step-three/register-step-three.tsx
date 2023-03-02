/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import classNames from 'classnames';

import { Button } from '../../button';
import { RegisterLoginRow } from '../register-login-row';

import styles from '../registration-form.module.scss';

export const RegisterStepThree = () => (
  <form className={styles.form}>
    <div className={styles.formInput}>
      <input id='username' name='firstname' placeholder=' ' type='text' />
      <label htmlFor='username'>Номер телефона</label>
    </div>
    <div className={classNames(styles.formInput, styles.lastInput)}>
      <input id='password' name='lastname' type='text' placeholder=' ' />
      <label htmlFor='password'>E-mail</label>
    </div>
    <Button buttonText='Зарегистрироваться' type='submit' passStyle={styles.button} />
    <RegisterLoginRow />
  </form>
);
