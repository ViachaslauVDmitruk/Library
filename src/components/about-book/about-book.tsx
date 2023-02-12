import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BOOKS } from '../../const/card';
import { SliderBook } from '../slider';

import styles from './about-book.module.scss';

export const AboutBook = () => {
  const { id } = useParams();
  const [parametrs, setParametrs] = useState(BOOKS.find((item) => item.id === id));

  useEffect(() => {
    const book = BOOKS.find((item) => item.id === id);

    setParametrs(book);
  }, [id]);

  return (
    <div className={styles.aboutBook}>
      <div className={styles.container}>
        <SliderBook src={parametrs?.src} />
        <div className={styles.discribeTop}>
          <div className={styles.title}>
            Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
          </div>
          <div className={styles.author}>Адитья Бхаргава, 2019</div>
          <button type='button' className={styles.button}>
            Забронировать
          </button>
        </div>
        <div className={styles.discribeBottom}>
          <div className={styles.about}>О книге</div>

          <div className={styles.text}>
            Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
            решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
            изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
            время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
            алгоритмы — это веселое и увлекательное занятие.
          </div>
        </div>
      </div>
    </div>
  );
};
