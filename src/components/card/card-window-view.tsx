/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { API_HOST } from '../../api/const';
import { ColorMatch } from '../../helpers/color-match';
import { CardProps } from '../../types/card';
import { Calendar } from '../booking';
import { Button } from '../button';
import { StarsRating } from '../stars-rating';

import noImage from './assets/no-image.png';

import styles from './card.module.scss';

export const CardWindowView = ({ src, rating, title, authors, id, issueYear, searchValue }: CardProps) => {
  const { category } = useParams();
  const highlight = ColorMatch({ searchValue, title });
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);

  return (
    <div className={styles.cardWindow} data-test-id='card' key={id}>
      <Link to={`/books/${category}/${id}`} className={styles.content}>
        <div className={styles.image}>
          <img src={src?.url == null ? noImage : `${API_HOST}${src?.url}`} alt='img' />
        </div>
        {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}
        <div className={styles.title} data-test-id='book-title'>
          {highlight}
        </div>
        <div className={styles.author}>
          {authors.map((item) => (
            <span key={item}>{item}, </span>
          ))}
          <span>{issueYear}</span>
        </div>
      </Link>
      <Button
        type='button'
        passStyle={styles.button}
        buttonText='Забронировать'
        id='booking-button'
        onClick={() => setIsOpenCalendar(true)}
      />
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} />
    </div>
  );
};
