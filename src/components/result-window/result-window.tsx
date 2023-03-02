import { Button } from '../button';

import styles from './result-window.module.scss';

export const ResultWindow = () => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>привет</h2>
    <p className={styles.text}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, nesciunt omnis! Ut officiis earum quia, veritatis
      neque officia dicta asperiores, voluptatum facere eum suscipit corporis pariatur debitis, ducimus molestiae
      soluta.
    </p>
    <Button type='button' buttonText='вернись' passStyle={styles.resultButtton} textStyle={styles.textButton} />
  </div>
);
