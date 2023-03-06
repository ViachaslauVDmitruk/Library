import { useNavigate } from 'react-router-dom';

import { Button } from '../../button';

import arrowNext from './assets/arrow-next.png';

import styles from './register-login-row.module.scss';

type RowProps = {
  link: string;
  text: string;
  buttonText: string;
};

export const RegisterLoginRow = ({ link, text, buttonText }: RowProps) => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(link);
  };

  return (
    <div className={styles.row}>
      <span>{text}</span>
      <Button
        buttonText={buttonText}
        src={arrowNext}
        type='button'
        passStyle={styles.registrationButton}
        onClick={navigateToLogin}
      />
    </div>
  );
};
