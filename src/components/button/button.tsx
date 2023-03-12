/* eslint-disable react/button-has-type */
import classNames from 'classnames';

import { ButtonProps } from '../../types/button';

import styles from './button.module.scss';

export const Button = ({
  buttonText,
  disabled = false,
  src,
  onClick,
  passStyle,
  type = 'button',
  id = '',
}: ButtonProps) => {
  const buttonStyles = classNames(passStyle, styles.button);

  return (
    <button className={buttonStyles} type={type} onClick={onClick} disabled={disabled} data-test-id={id}>
      {buttonText}
      {src && <img src={src} alt='img' />}
    </button>
  );
};
