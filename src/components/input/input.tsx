import { ChangeEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { CustomInputProps } from '../../types/input';
import { ColorPasswordMatch, ColorUserMatch } from '../color-input-help';
import { ErrorFormMessage } from '../error-form-message';

import styles from './input.module.scss';

export const CustomInput = ({
  type,
  name,
  placeholder,
  error,
  clearActionErrors,
  required,
  Customhint,
  className,
  validationRules,
  customHint,
  disabled,
}: CustomInputProps) => {
  const [isFilled, setIsFilled] = useState(false);
  const inputClassName = classNames(styles.input, className, error && styles.error);
  const {
    register,
    watch,
    trigger,
    setValue,
    clearErrors,
    formState: { errors, isDirty },
  } = useFormContext();

  const watchedFieldValue = watch(name || '');

  const handleFocus = () => setIsFilled(true);

  const handleBlur = () => {
    trigger(name);
    setIsFilled(Boolean(watchedFieldValue));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setValue(name || '', value);

    if (watchedFieldValue !== value) {
      clearErrors(name);
      clearActionErrors?.();
    }
  };

  return (
    <div className={styles.formControlInner}>
      <div className={styles.formInput}>
        <input
          type={type}
          className={inputClassName}
          {...register(name || '', {
            required: required && 'Поле не может быть пустым',
            validate: validationRules,
          })}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={errors[name as string]?.message ? { borderBottom: '1px solid red' } : {}}
          disabled={disabled}
        />
        <label htmlFor={name}>{placeholder}</label>
        {errors[name as string]?.message && <ErrorFormMessage message={errors[name as string]?.message} />}
      </div>

      {errors[name as string]?.message ? (
        <ErrorFormMessage message={errors.name?.message} />
      ) : Customhint === 'user' ? (
        <ColorUserMatch inputValue={watch(name)} isError={!!watch(name).length} />
      ) : Customhint === 'password' ? (
        <ColorPasswordMatch inputValue={watch(name)} isError={!!watch(name).length} />
      ) : null}
    </div>
  );
};
