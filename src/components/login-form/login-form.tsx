/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { required } from '../../const/register-schema';
import { loginSelector } from '../../selectors';
import { sendLogin } from '../../store/login';
import { LoginFormProps } from '../../types/login-form';
import { Button } from '../button';
import { ErrorFormMessage } from '../error-form-message';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';
import { RegisterLoginRow } from '../registation-form/register-login-row';

import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './login-form.module.scss';

export const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, errorType, errorMessage, user } = useAppSelector(loginSelector);
  const methods = useForm<LoginFormProps>({ mode: 'onBlur', reValidateMode: 'onChange' });
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const navigateToRecovery = () => {
    navigate('/forgot-pass');
  };

  const onSubmit = (data: LoginFormProps) => {
    dispatch(sendLogin({ identifier: data.identifier, password: data.password }));
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      <h2>Вход в личный кабинет</h2>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
          <div className={classNames(styles.formInput, styles.firstInput)}>
            <input
              id='identifier'
              {...register('identifier', { required })}
              name='identifier'
              placeholder=' '
              style={errors.identifier?.message ? { borderBottom: '1px solid red' } : {}}
            />
            <label htmlFor='username'>Логин</label>
            {errors.identifier?.message && <ErrorFormMessage message={errors.identifier?.message} />}
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
          <Button
            type='button'
            passStyle={styles.forgottenPassword}
            buttonText='Забыли логин или пароль?'
            onClick={navigateToRecovery}
          />

          <Button type='submit' buttonText='Вход' passStyle={styles.button} />
          <RegisterLoginRow link='/registration' buttonText='Регистрация' text='Нет учётной записи?' />
        </form>
      </FormProvider>
    </div>
  );
};
