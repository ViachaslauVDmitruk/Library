/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';

import { RegisterSchemaTwo, required } from '../../../const/register-schema';
import { RegisterStepProps } from '../../../types/registration-form';
import { Button } from '../../button';
import { ErrorFormMessage } from '../../error-form-message';
import { RegisterLoginRow } from '../register-login-row';

import styles from '../registration-form.module.scss';

export const RegisterStepTwo = ({ setStep }: RegisterStepProps) => {
  const nextStep = () => {
    setStep(3);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <input
          id='firstName'
          {...register('firstName', {
            required,
          })}
          name='firstName'
          placeholder=' '
          type='text'
          style={errors.firstName?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='firstName'>Имя</label>
        {errors.firstName?.message && <ErrorFormMessage message={errors.firstName?.message} />}
      </div>
      <div className={classNames(styles.formInput, styles.lastInput)}>
        <input
          id='lastName'
          {...register('lastName', {
            required,
          })}
          name='lastName'
          type='text'
          placeholder=' '
          style={errors.lastName?.message ? { borderBottom: '1px solid red' } : {}}
        />
        <label htmlFor='lastName'>Фамилия</label>
        {errors.lastName?.message && <ErrorFormMessage message={errors.lastName?.message} />}
      </div>
      <Button buttonText='Последний шаг' type='submit' passStyle={styles.button} onClick={nextStep} />
      <RegisterLoginRow />
    </div>
  );
};
