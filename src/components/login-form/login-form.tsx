/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { validatePassword } from '../../const/register-schema';
import { loginSelector } from '../../selectors';
import { loginResetState, sendLogin } from '../../store/login';
import { LoginFormProps } from '../../types/login-form';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';
import { RegisterLoginRow } from '../registation-form/register-login-row';
import { ResultWindow } from '../result-window';

import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './login-form.module.scss';
import { CustomInput } from '../input';

export const LoginForm = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, errorType, errorMessage, user } = useAppSelector(loginSelector);
  const methods = useForm<LoginFormProps>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const navigateToRecovery = () => {
    navigate('/forgot-pass');
  };

  const onSubmit = (data: LoginFormProps) => {
    dispatch(sendLogin({ identifier: data.identifier, password: data.password }));
  };

  const ResetLogin = () => {
    dispatch(loginResetState());
    navigate('/');
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <FormProvider {...methods}>
      {isLoading && <Loader />}
      {!isSuccess && errorType !== 'server' && (
        <div className={styles.wrapper}>
          <h2>Вход в личный кабинет</h2>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
            <div className={classNames(styles.formInput, styles.firstInput)}>
              <CustomInput type='text' name='identifier' placeholder='Логин' required={true} />
            </div>
            <div className={styles.inputWrapper}>
              <CustomInput
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                placeholder='Пароль'
                required={true}
                validationRules={validatePassword}
              />
              {watch('password').length > 0 && (
                <div className={styles.eyeImage} onClick={ShowPassword}>
                  <img
                    src={isShowPassword ? eyeOpen : eyeClose}
                    alt='img'
                    data-test-id={isShowPassword ? 'eye-opened' : 'eye-closed'}
                  />
                </div>
              )}
            </div>

            {!errorType && (
              <Button
                disabled={!!Object.keys(errors).length}
                type='button'
                passStyle={styles.forgottenPassword}
                buttonText='Забыли логин или пароль?'
                onClick={navigateToRecovery}
              />
            )}
            {errorType === 'app' && (
              <div className={styles.errorBlock}>
                <span data-test-id='hint'>Неверный логин или пароль!</span>
                <Button
                  type='button'
                  passStyle={styles.restorePassword}
                  buttonText='Восстановить?'
                  onClick={navigateToRecovery}
                />
              </div>
            )}

            <Button type='submit' buttonText='вход' passStyle={styles.button} />
            <RegisterLoginRow link='/registration' buttonText='Регистрация' text='Нет учётной записи?' />
          </form>
        </div>
      )}
      {errorType === 'server' && (
        <ResultWindow title='Вход не выполнен' text={errorMessage} textButton='Повторить' onClick={ResetLogin} />
      )}
    </FormProvider>
  );
};
