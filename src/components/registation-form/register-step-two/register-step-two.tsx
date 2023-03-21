/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useFormContext } from 'react-hook-form';

import { CustomInput } from '../../input';

import styles from '../registration-form.module.scss';

export const RegisterStepTwo = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.form}>
      <CustomInput type='text' name='firstName' placeholder='Имя' required={true} />
      <div className={styles.lastInput}>
        <CustomInput type='text' name='lastName' placeholder='Фамилия' required={true} />
      </div>
    </div>
  );
};
