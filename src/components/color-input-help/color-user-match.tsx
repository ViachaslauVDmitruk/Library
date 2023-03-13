import { useEffect, useState } from 'react';

import { ColorMatchProps } from './type';

import styles from './color-input-match.module.scss';

export const ColorUserMatch = ({ inputValue, isError }: ColorMatchProps) => {
  const [isLatinLetter, setIsLatinLetter] = useState<boolean>(false);
  const [isNumber, setIsNumber] = useState<boolean>(false);

  const textHelp = 'Используйте для логина латинский алфавит и цифры';

  useEffect(() => {
    const latinLetter = /[A-Za-z]/.test(inputValue);
    const includeNumber = /[0-9]/.test(inputValue);

    if (latinLetter) {
      setIsLatinLetter(true);
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
      Используйте для логина{' '}
      <span style={isLatinLetter ? { color: '#A7A7A7' } : { color: '#F42C4F' }}>латинский алфавит</span> и{' '}
      <span style={isNumber ? { color: '#A7A7A7' } : { color: '#F42C4F' }}>цифры</span>
    </div>
  );
};
