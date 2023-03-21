/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { validateLogin, validatePassword } from '../../../const/register-schema';
import { CustomInput } from '../../input';

import check from './assets/check.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from '../registration-form.module.scss';

export const RegisterStepOne = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <div className={styles.form}>
      <div className={styles.formInput}>
        <CustomInput
          type='text'
          name='username'
          placeholder='Придумайте логин для входа'
          required={true}
          validationRules={validateLogin}
          Customhint='user'
        />
      </div>
      <div className={styles.lastInput}>
        <CustomInput
          type={isShowPassword ? 'text' : 'password'}
          name='password'
          placeholder='Новый пароль'
          required={true}
          validationRules={validatePassword}
          Customhint='password'
        />
        <div className={styles.eyeImage} onClick={ShowPassword}>
          {watch('password').length > 7 && <img src={check} alt='img' data-test-id='checkmark' />}
          <img
            src={isShowPassword ? eyeOpen : eyeClose}
            alt='img'
            data-test-id={isShowPassword ? 'eye-opened' : 'eye-closed'}
          />
        </div>
      </div>
    </div>
  );
};
