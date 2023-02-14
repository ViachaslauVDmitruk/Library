import { useSelector } from 'react-redux';

import { oneBookSelector } from '../../selectors';
import { SliderBook } from '../slider';

import styles from './about-book.module.scss';

export const AboutBook = () => {
  const { book } = useSelector(oneBookSelector);

  return (
    <div className={styles.aboutBook}>
      <div className={styles.container}>
        <SliderBook src={book.images} />
        <div className={styles.discribeTop}>
          <div className={styles.title}>{book.title}</div>
          <div className={styles.author}>
            {book.authors.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <button type='button' className={styles.button}>
            Забронировать
          </button>
        </div>
        <div className={styles.discribeBottom}>
          <div className={styles.about}>О книге</div>

          <div className={styles.text}>{book.description}</div>
        </div>
      </div>
    </div>
  );
};
