import loader from './assets/loader.png';

import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.background}>
    <div className={styles.loader}>
      <img src={loader} alt='img' />
    </div>
  </div>
);
