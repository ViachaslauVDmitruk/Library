/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { LoginFormProps } from '../../types/login-form';

import arrowNext from './assets/arrow-next.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './registration-form.module.scss';

export const RegistrationForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const methods = useForm<LoginFormProps>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Регистрация</h2>
      <h3>1 шаг из 3</h3>
      <FormProvider {...methods}>
        <form className={styles.form}>
          <div className={styles.formInput}>
            <input id='email' name='login' placeholder=' ' type='text' />
            <label htmlFor='email'>Придумайте логин для входа</label>
          </div>
          <div className={styles.discription}>
            Используйте для логина <span>латинский алфавит</span> и <span>цифры</span>
          </div>
          <div className={classNames(styles.formInput, styles.lastInput)}>
            <input id='password' name='password' type={isShowPassword ? 'text' : 'password'} placeholder=' ' />
            <label htmlFor='password'>Пароль</label>
            <div className={styles.eyeImage} onClick={ShowPassword}>
              <img src={isShowPassword ? eyeOpen : eyeClose} alt='img' />
            </div>
          </div>
          <div className={styles.discription}>
            Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span>
          </div>
          <button type='submit' className={styles.button}>
            Cледующий шаг
          </button>
          <div className={styles.bottom}>
            <span>Есть учётная запись?</span>
            <button type='button' className={styles.registrationButton}>
              Войти
              <img src={arrowNext} alt='img' />
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
