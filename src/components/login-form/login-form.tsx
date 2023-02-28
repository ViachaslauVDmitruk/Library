/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { LoginFormProps } from '../../types/login-form';

import arrowNext from './assets/arrow-next.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './login-form.module.scss';

export const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const methods = useForm<LoginFormProps>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Вход в личный кабинет</h2>
      <FormProvider {...methods}>
        <form className={styles.form}>
          <div className={classNames(styles.formInput, styles.firstInput)}>
            <input id='email' name='email' placeholder=' ' />
            <label htmlFor='email'>Логин</label>
          </div>
          <div className={styles.formInput}>
            <input id='password' name='password' type={isShowPassword ? 'text' : 'password'} placeholder=' ' />
            <label htmlFor='password'>Пароль</label>
            <div className={styles.eyeImage} onClick={ShowPassword}>
              <img src={isShowPassword ? eyeOpen : eyeClose} alt='img' />
            </div>
          </div>
          <button type='button' className={styles.forgottenPassword}>
            Забыли логин или пароль?
          </button>
          <button type='submit' className={styles.button}>
            Вход
          </button>
          <div className={styles.bottom}>
            <span>Нет учетной записи?</span>
            <button type='button' className={styles.registrationButton}>
              регистрация
              <img src={arrowNext} alt='img' />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
