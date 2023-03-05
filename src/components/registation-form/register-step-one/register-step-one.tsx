/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import * as yup from 'yup';

import { RegisterSchemaOne, required } from '../../../const/register-schema';
import { RegisterStepProps } from '../../../types/registration-form';
import { Button } from '../../button';
import { RegisterLoginRow } from '../register-login-row';

import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from '../registration-form.module.scss';
import { regExPassword, regExUsername } from '../../../const/reg-ex';

type FormData = yup.InferType<typeof RegisterSchemaOne>;

export const RegisterStepOne = ({ setStep }: RegisterStepProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const nextStep = () => {
    setStep(2);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<any>();
  const onSubmit = (data: FormData) => console.log('data', data);

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
        />
        <label htmlFor='username'>Придумайте логин для входа</label>
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
        />
        <label htmlFor='password'>Пароль</label>
        <div className={styles.eyeImage} onClick={ShowPassword}>
          <img src={isShowPassword ? eyeOpen : eyeClose} alt='img' />
        </div>
        <div className={styles.discription}>
          Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span>
        </div>
      </div>
      <Button buttonText='Следующий шаг' type='button' passStyle={styles.button} onClick={nextStep} />
      <RegisterLoginRow />
    </div>
  );
};
