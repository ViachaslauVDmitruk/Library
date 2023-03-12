/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { loginSelector, registrationSelector } from '../../selectors';
import { resetRagistrationState, sendRagistrationData } from '../../store/registration';
import { FormData } from '../../types/registration-form';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';
import { ResultWindow } from '../result-window';

import { RegisterLoginRow } from './register-login-row';
import { RegisterStepOne } from './register-step-one';
import { RegisterStepThree } from './register-step-three';
import { RegisterStepTwo } from './register-step-two';

import styles from './registration-form.module.scss';

export const RegistrationForm = () => {
  const { isSuccess, isLoading, errorType, errorMessage } = useAppSelector(registrationSelector);
  const { user } = useAppSelector(loginSelector);
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(1);

  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const currentStepRegister = (step: number) => {
    switch (step) {
      case 1: {
        return <RegisterStepOne />;
      }
      case 2: {
        return <RegisterStepTwo />;
      }
      case 3: {
        return <RegisterStepThree />;
      }
      default:
        return null;
    }
  };

  const onSubmit = (data: FormData) => {
    switch (step) {
      case 1:
        setStep(2);
        break;
      case 2:
        setStep(3);
        break;
      case 3:
        dispatch(
          sendRagistrationData({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            password: data.password,
            phone: data.phone,
            email: data.email,
          })
        );
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/auth');
    dispatch(resetRagistrationState());
  };

  const resetStateRegistration = () => {
    dispatch(resetRagistrationState());

    if (errorType === 'app') {
      setStep(1);
      reset();
    } else {
      setStep(1);
    }
  };

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <FormProvider {...methods}>
      {isLoading && <Loader />}
      {!isSuccess && errorType === null && (
        <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form' className={styles.wrapper}>
          <h2>Регистрация</h2>
          <h3>{step} шаг из 3</h3>
          {currentStepRegister(step)}
          <Button
            disabled={!isValid}
            buttonText={step < 2 ? 'Следующий шаг' : step < 3 ? 'Последний шаг' : 'Зарегистрироваться'}
            type='submit'
            passStyle={styles.button}
          />
          <RegisterLoginRow link='/auth' buttonText='Войти' text='Есть учетная запись?' />
        </form>
      )}
      {isSuccess && (
        <ResultWindow
          title='Регистрация успешна'
          text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
          textButton='вход'
          onClick={navigateTo}
        />
      )}
      {errorType === 'server' && (
        <ResultWindow
          title='Данные не сохранились'
          text={errorMessage}
          textButton='Повторить'
          onClick={resetStateRegistration}
        />
      )}

      {errorType === 'app' && (
        <ResultWindow
          title='Данные не сохранились'
          text={errorMessage}
          textButton='Назад к регистрации'
          onClick={resetStateRegistration}
        />
      )}
    </FormProvider>
  );
};
