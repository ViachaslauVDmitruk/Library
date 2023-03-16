import { useState } from 'react';
import { useSelector } from 'react-redux';

import { oneBookSelector } from '../../selectors';
import { Calendar } from '../booking';
import { Button } from '../button';
import { SliderBook } from '../slider';

import styles from './about-book.module.scss';

export const AboutBook = () => {
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const { book } = useSelector(oneBookSelector);

  return (
    <div className={styles.aboutBook}>
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} />
      <div className={styles.container}>
        <SliderBook src={book.images} />
        <div className={styles.discribeTop}>
          <div className={styles.title} data-test-id='book-title'>
            {book.title}
          </div>
          <div className={styles.author}>
            {book.authors.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Button
            type='button'
            passStyle={styles.button}
            buttonText='Забронировать'
            id='booking-button'
            onClick={() => setIsOpenCalendar(true)}
          />
        </div>
        <div className={styles.discribeBottom}>
          <div className={styles.about}>О книге</div>

          <div className={styles.text}>{book.description}</div>
        </div>
      </div>
    </div>
  );
};
