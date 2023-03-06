/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RegisterSchemaOne, RegisterSchemaThree, RegisterSchemaTwo, schema } from '../../const/register-schema';
import { Button } from '../button';
// import { FormData } from '../../types/registration-form';
import { useAppDispatch } from '../hooks';

import { RegisterLoginRow } from './register-login-row';
import { RegisterStepOne } from './register-step-one';
import { RegisterStepThree } from './register-step-three';
import { RegisterStepTwo } from './register-step-two';

import styles from './registration-form.module.scss';

// const schema = yup.object().shape({});
// type FormData = yup.InferType<typeof schema>;

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(1);

  const changeStepRegister = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const currentValidationSchema = (step: number) => {
    switch (step) {
      case 1:
        return RegisterSchemaOne;

      case 2:
        return RegisterSchemaTwo;

      case 3:
        return RegisterSchemaThree;

      default:
        return schema;
    }
  };

  const methods = useForm<FormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    //  resolver: yupResolver(schema),

    //  defaultValues: {
    //    username: '',
    //    password: '',
    //    firstName: '',
    //    lastName: '',
    //    phone: '',
    //    email: '',
    //  },
  });

  const { handleSubmit } = methods;

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

  const onSubmit = (data: FormData) => console.log('data', data);

  return (
    <div className={styles.wrapper}>
      <h2>Регистрация</h2>
      <h3>{step} шаг из 3</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStepRegister(step)}
          <Button
            buttonText={step < 2 ? 'Следующий шаг' : step < 3 ? 'Последний шаг' : 'Зарегистрироваться'}
            type='submit'
            passStyle={styles.button}
            onClick={changeStepRegister}
          />
          <RegisterLoginRow link='/auth' buttonText='Войти' text='Есть учетная запись?' />
        </form>
      </FormProvider>
    </div>
  );
};
