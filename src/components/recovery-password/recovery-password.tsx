/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import { regExPassword } from '../../const/reg-ex';
import { recoveryPasswordSchema, required } from '../../const/register-schema';
import { recoveryPasswordSelector } from '../../selectors';
import { resetRecoveryPassword, sendRecoveryPassword } from '../../store/recovery-password';
import { RecoveryPasswordType } from '../../store/recovery-password/type';
import { Button } from '../button';
import { ErrorFormMessage } from '../error-form-message';
import { useAppDispatch, useAppSelector } from '../hooks';
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
  //   const [passwordValue, setPasswordValue] = useState<string>('');
  const forgotPass = searchParams.get('code');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError } = useAppSelector(recoveryPasswordSelector);
  const methods = useForm<RecoveryPasswordType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(recoveryPasswordSchema),
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
    register,
    formState: { errors, isDirty, defaultValues, isValid },
    handleSubmit,
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
            <div className={classNames(styles.formInput, styles.firstInput)}>
              <input
                id='password'
                {...register(
                  'password'
                  //  ,
                  //  {
                  //    required,
                  //    pattern: {
                  //      value: regExPassword,
                  //      message: 'Введите корректный пароль',
                  //    },
                  //  }
                )}
                name='password'
                type={isShowPassword ? 'text' : 'password'}
                placeholder=' '
                style={errors.password?.message ? { borderBottom: '1px solid red' } : {}}
                //  onChange={(e) => setPasswordValue(e.target.value)}
              />
              <label htmlFor='password'>Новый пароль</label>
              {errors.password?.message && <ErrorFormMessage message={errors.password?.message} />}
              <div className={styles.eyeImage} onClick={ShowPassword}>
                {!errors.password && <img src={check} alt='img' data-test-id='checkmark' />}
                <img
                  src={isShowPassword ? eyeOpen : eyeClose}
                  alt='img'
                  data-test-id={isShowPassword ? 'eye-open' : 'eye-closed'}
                />
              </div>
              <div className={styles.discription}>
                Пароль <span>не менее 8 символов</span>, с <span>заглавной буквой</span> и <span>цифрой</span>
              </div>
            </div>
            <div className={styles.formInput}>
              <input
                id='passwordConfirmation'
                {...register(
                  'passwordConfirmation'
                  //  , {
                  //    required,
                  //    pattern: {
                  //      value: regExPassword,
                  //      message: 'Пароли не совпадают',
                  //    },
                  //  }
                )}
                name='passwordConfirmation'
                type={isShowConfirmPassword ? 'text' : 'password'}
                placeholder=' '
                style={errors.password?.message ? { borderBottom: '1px solid red' } : {}}
              />
              <label htmlFor='passwordConfirmation'>Повторите пароль</label>
              <div className={styles.eyeImage} onClick={ShowConfirmPassword}>
                <img
                  src={isShowConfirmPassword ? eyeOpen : eyeClose}
                  alt='img'
                  data-test-id={isShowPassword ? 'eye-open' : 'eye-closed'}
                />
              </div>
              {errors.passwordConfirmation?.message && (
                <ErrorFormMessage message={errors.passwordConfirmation?.message} />
              )}
            </div>

            <Button disabled={!isValid} type='submit' buttonText='Сохранить изменения' passStyle={styles.button} />
            <div className={styles.bottomText}>После сохранения войдите в библиотеку, используя новый пароль</div>
          </form>
        </FormProvider>
      )}
      {isSuccess && (
        <ResultWindow
          title='Новые данные сохранены'
          text='Зайдите в личный кабинет, используя свои логин и новый пароль'
          textButton='Вход'
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
