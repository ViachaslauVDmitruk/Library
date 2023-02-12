import { ICONS } from '../../const/social';

import styles from './footer.module.scss';

export type IconProps = {
  src?: string;
  id?: number;
};

export const Footer = ({ src, id }: IconProps) => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.boxBorder}>
        <div className={styles.text}>
          © 2020-2023 Cleverland. <span>Все права защищены.</span>
        </div>
        <ul className={styles.icons}>
          {ICONS.map(({ src, id }) => (
            <li className={styles.icon} key={id}>
              <img src={src} alt='img' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
