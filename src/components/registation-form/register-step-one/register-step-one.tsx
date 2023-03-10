/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { regExPassword, regExUsername } from '../../../const/reg-ex';
import { required } from '../../../const/register-schema';
import { ErrorFormMessage } from '../../error-form-message';

import check from './assets/check.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from '../registration-form.module.scss';

export const RegisterStepOne = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    register,
    formState: { errors, isDirty, defaultValues },
  } = useFormContext();

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <input
          id='username'
          {...register('username', {
            required,
            pattern: {
              value: regExUsername,
              message: 'латинский алфавит и цифры',
            },
          })}
          name='username'
          placeholder=' '
          type='text'
          style={errors.username?.message ? { borderBottom: '1px solid red' } : {}}
        />

        <label htmlFor='username'>Придумайте логин для входа</label>
        {errors.username?.message && <ErrorFormMessage message={errors.username?.message} />}
        <div className={styles.discription}>
          Используйте для логина <span>латинский алфавит</span> и <span>цифры</span>
        </div>
      </div>
      <div className={classNames(styles.formInput, styles.lastInput)}>
        <input
          id='password'
          {...register('password', {
            required,
            pattern: {
              value: regExPassword,
              message: 'Введите корректный пароль',
            },
          })}
          name='password'
          type={isShowPassword ? 'text' : 'password'}
          placeholder=' '
          style={errors.password?.message ? { borderBottom: '1px solid red' } : {}}
        />

        <label htmlFor='password'>Пароль</label>
        {errors.password?.message && <ErrorFormMessage message={errors.password?.message} />}
        <div className={styles.eyeImage} onClick={ShowPassword}>
          {!errors.password && <img src={check} alt='img' data-test-id='checkmark' />}
          <img
            src={isShowPassword ? eyeOpen : eyeClose}
            alt='img'
            data-test-id={isShowPassword ? 'eye-open' : 'eye-closed'}
          />
        </div>
        <div className={styles.discription}>
          Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span>
        </div>
      </div>
    </div>
  );
};
