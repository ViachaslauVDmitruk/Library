/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RegisterSchemaOne, RegisterSchemaThree, RegisterSchemaTwo, schema } from '../../const/register-schema';

import { FormData } from '../../types/registration-form';
import { useAppDispatch } from '../hooks';

import { RegisterStepOne } from './register-step-one';
import { RegisterStepThree } from './register-step-three';
import { RegisterStepTwo } from './register-step-two';

import styles from './registration-form.module.scss';

// const schema = yup.object().shape({});
// type FormData = yup.InferType<typeof schema>;

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(1);

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
    reValidateMode: 'onBlur',
    //  resolver: yupResolver(currentValidationSchema),

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
        return <RegisterStepOne step={step} setStep={setStep} />;
      }
      case 2: {
        return <RegisterStepTwo step={step} setStep={setStep} />;
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
        <form onSubmit={handleSubmit(onSubmit)}>{currentStepRegister(step)}</form>
      </FormProvider>
    </div>
  );
};
