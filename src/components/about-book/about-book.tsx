import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BOOKS } from '../../const/card';
import { oneBookSelector } from '../../selectors';
import { SliderBook } from '../slider';

import styles from './about-book.module.scss';

export const AboutBook = () => {
  const { id } = useParams();
  const [parametrs, setParametrs] = useState(BOOKS.find((item) => item.id === id));
  const { book } = useSelector(oneBookSelector);

  useEffect(() => {
    const book = BOOKS.find((item) => item.id === id);

    setParametrs(book);
  }, [id]);

  return (
    <div className={styles.aboutBook}>
      <div className={styles.container}>
        <SliderBook src={parametrs?.src} />
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
