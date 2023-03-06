/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { required } from '../../const/register-schema';
import { LoginFormProps } from '../../types/login-form';
import { Button } from '../button';
import { ErrorFormMessage } from '../error-form-message';
import { RegisterLoginRow } from '../registation-form/register-login-row';

import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './login-form.module.scss';

export const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const methods = useForm<LoginFormProps>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: LoginFormProps) => console.log('data', data);

  return (
    <div className={styles.wrapper}>
      <h2>Вход в личный кабинет</h2>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classNames(styles.formInput, styles.firstInput)}>
            <input
              id='email'
              {...register('email', { required })}
              name='email'
              placeholder=' '
              style={errors.email?.message ? { borderBottom: '1px solid red' } : {}}
            />
            <label htmlFor='email'>Логин</label>
            {errors.email?.message && <ErrorFormMessage message={errors.email?.message} />}
          </div>
          <div className={styles.formInput}>
            <input
              id='password'
              {...register('password', { required })}
              name='password'
              type={isShowPassword ? 'text' : 'password'}
              placeholder=' '
              style={errors.password?.message ? { borderBottom: '1px solid red' } : {}}
            />
            <label htmlFor='password'>Пароль</label>
            <div className={styles.eyeImage} onClick={ShowPassword}>
              <img src={isShowPassword ? eyeOpen : eyeClose} alt='img' />
            </div>
            {errors.password?.message && <ErrorFormMessage message={errors.password?.message} />}
          </div>
          <button type='button' className={styles.forgottenPassword}>
            Забыли логин или пароль?
          </button>
          <Button type='submit' buttonText='Вход' passStyle={styles.button} />
          <RegisterLoginRow link='/registration' buttonText='Регистрация' text='Нет учётной записи?' />
        </form>
      </FormProvider>
    </div>
  );
};
