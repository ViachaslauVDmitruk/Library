/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormData } from '../../types/registration-form';

import styles from './registration-form.module.scss';
import { Button } from '../button';
import { RegisterStepOne } from './register-step-one';
import { RegisterStepTwo } from './register-step-two';
import { RegisterStepThree } from './register-step-three';

export const RegistrationForm = () => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<FormData>({ mode: 'onBlur', reValidateMode: 'onChange' });

  return (
    <div className={styles.wrapper}>
      <h2>Регистрация</h2>
      <h3>1 шаг из 3</h3>
      <FormProvider {...methods}>
        <RegisterStepOne />
      </FormProvider>
    </div>
  );
};
