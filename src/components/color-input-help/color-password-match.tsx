import { useEffect, useState } from 'react';

import { ColorMatchProps } from './type';

import styles from './color-input-match.module.scss';

export const ColorPasswordMatch = ({ inputValue, isError }: ColorMatchProps) => {
  const [isUppLetter, setIsUppLetter] = useState<boolean>(false);
  const [isNumber, setIsNumber] = useState<boolean>(false);

  const lengthPassword = inputValue.length;
  const textHelp = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

  useEffect(() => {
    const includeUppLetter = /[A-Z]/.test(inputValue);
    const includeNumber = /[0-9]/.test(inputValue);

    if (includeUppLetter) {
      setIsUppLetter(true);
    }

    if (includeNumber) {
      setIsNumber(true);
    }
  }, [inputValue]);

  if (!inputValue)
    return (
      <div className={styles.textHelp} data-test-id='hint'>
        {textHelp}
      </div>
    );

  return (
    <div className={styles.textHelp} data-test-id='hint' style={isError ? { color: '#A7A7A7' } : { color: '#F42C4F' }}>
      Пароль <span style={lengthPassword < 8 ? { color: '#F42C4F' } : { color: '#A7A7A7' }}>не менее 8 символов</span>,
      с <span style={isUppLetter ? { color: '#A7A7A7' } : { color: '#F42C4F' }}>заглавной буквой</span> и{' '}
      <span style={isNumber ? { color: '#A7A7A7' } : { color: '#F42C4F' }}>цифрой</span>
    </div>
  );
};
