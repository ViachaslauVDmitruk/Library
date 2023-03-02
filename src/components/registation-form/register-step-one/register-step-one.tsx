/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import classNames from 'classnames';

import { Button } from '../../button';

import arrowNext from './assets/arrow-next.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from '../registration-form.module.scss';
import { RegisterStepTwo } from '../register-step-two';
import { RegisterLoginRow } from '../register-login-row';

export const RegisterStepOne = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <form className={styles.form}>
      <div className={styles.formInput}>
        <input id='username' name='username' placeholder=' ' type='text' />
        <label htmlFor='username'>Придумайте логин для входа</label>
        <div className={styles.discription}>
          Используйте для логина <span>латинский алфавит</span> и <span>цифры</span>
        </div>
      </div>

      <div className={classNames(styles.formInput, styles.lastInput)}>
        <input id='password' name='password' type={isShowPassword ? 'text' : 'password'} placeholder=' ' />
        <label htmlFor='password'>Пароль</label>
        <div className={styles.eyeImage} onClick={ShowPassword}>
          <img src={isShowPassword ? eyeOpen : eyeClose} alt='img' />
        </div>
        <div className={styles.discription}>
          Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span>
        </div>
      </div>

      <Button buttonText='Следующий шаг' type='submit' passStyle={styles.button} />
      <RegisterLoginRow />
    </form>
  );
};
