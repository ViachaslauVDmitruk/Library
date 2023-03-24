/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { validatePassword, validateRetryPassword } from '../../const/register-schema';
import { recoveryPasswordSelector } from '../../selectors';
import { resetRecoveryPassword, sendRecoveryPassword } from '../../store/recovery-password';
import { RecoveryPasswordType } from '../../store/recovery-password/type';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CustomInput } from '../input';
import { Loader } from '../loader';
import { ResultWindow } from '../result-window';

import check from './assets/check.png';
import eyeClose from './assets/eye-close.png';
import eyeOpen from './assets/eye-open.png';

import styles from './recovery-password.module.scss';

export const RecoveryPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const forgotPass = searchParams.get('code');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError } = useAppSelector(recoveryPasswordSelector);
  const methods = useForm<RecoveryPasswordType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
      code: '',
    },
  });
  const ShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const ShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const {
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = methods;

  const onSubmit = (data: RecoveryPasswordType) => {
    dispatch(
      sendRecoveryPassword({
        passwordConfirmation: data.passwordConfirmation,
        password: data.password,
        code: forgotPass,
      })
    );
  };

  const navigateTo = () => {
    if (isSuccess) {
      navigate('/auth');
    } else {
      navigate('/forgot-pass');
      dispatch(resetRecoveryPassword());
    }
  };

  return (
    <div>
      {isLoading && <Loader />}

      {!isSuccess && !isError && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form' className={styles.wrapper}>
            <h2>Восствновление пароля</h2>
            <div className={styles.firstInput}>
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
            <div className={styles.inputWrapper}>
              <CustomInput
                type={isShowConfirmPassword ? 'text' : 'password'}
                name='passwordConfirmation'
                placeholder='Повторите пароль'
                required={true}
                validationRules={validateRetryPassword}
                Customhint='passwordConfirmation'
              />
              <div className={styles.eyeImage} onClick={ShowConfirmPassword}>
                <img
                  src={isShowConfirmPassword ? eyeOpen : eyeClose}
                  alt='img'
                  data-test-id={isShowConfirmPassword ? 'eye-opened' : 'eye-closed'}
                />
              </div>
            </div>

            <Button
              disabled={!!Object.keys(errors).length}
              type='submit'
              buttonText='Сохранить изменения'
              passStyle={styles.button}
            />
            <div className={styles.bottomText}>После сохранения войдите в библиотеку, используя новый пароль</div>
          </form>
        </FormProvider>
      )}
      {isSuccess && (
        <ResultWindow
          title='Новые данные сохранены'
          text='Зайдите в личный кабинет, используя свои логин и новый пароль'
          textButton='вход'
          onClick={navigateTo}
        />
      )}

      {isError && (
        <ResultWindow
          title='Данные не сохранились'
          text='Что-то пошло не так. Попробуйте ещё раз'
          textButton='Повторить'
          onClick={navigateTo}
        />
      )}
    </div>
  );
};
