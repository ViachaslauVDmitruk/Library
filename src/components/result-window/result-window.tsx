import { Button } from '../button';

import styles from './result-window.module.scss';

type ResultWindowProps = {
  title: string;
  text: string;
  textButton: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ResultWindow = ({ title, text, textButton, onClick }: ResultWindowProps) => (
  <div className={styles.wrapper} data-test-id='status-block'>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.text}>{text}</p>
    <Button
      type='button'
      buttonText={textButton}
      passStyle={styles.resultButtton}
      textStyle={styles.textButton}
      onClick={onClick}
    />
  </div>
);
