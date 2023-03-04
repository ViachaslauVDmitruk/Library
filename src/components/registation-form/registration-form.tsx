/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

// import { FormData } from '../../types/registration-form';
import { RegisterStepOne } from './register-step-one';
import { RegisterStepThree } from './register-step-three';
import { RegisterStepTwo } from './register-step-two';

import styles from './registration-form.module.scss';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const RegistrationForm = () => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<FormData>({ mode: 'onBlur', reValidateMode: 'onChange' });
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

  return (
    <div className={styles.wrapper}>
      <h2>Регистрация</h2>
      <h3>{step} шаг из 3</h3>
      <FormProvider {...methods}>{currentStepRegister(step)}</FormProvider>
    </div>
  );
};
