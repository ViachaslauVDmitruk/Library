/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { API_HOST } from '../../../api/const';
import { ColorMatch } from '../../../helpers/color-match';
import { CardProps } from '../../../types/card';
import { Calendar } from '../../booking';
import { Button } from '../../button';
import { StarsRating } from '../../stars-rating';
import noImage from '../assets/no-image.png';

import styles from './card-list-view.module.scss';

export const CardListView = ({ src, rating, title, authors, id, issueYear, searchValue }: CardProps) => {
  const { category } = useParams();
  const highlight = ColorMatch({ searchValue, title });
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);

  return (
    <Link to={`/books/${category}/${id}`} data-test-id='card' className={styles.cardList} key={id}>
      <div className={styles.image}>
        <img src={src?.url == null ? noImage : `${API_HOST}${src?.url}`} alt='img' />
      </div>
      <div className={styles.content}>
        <div className={styles.title} data-test-id='book-title'>
          {highlight}
        </div>
        <div className={styles.author}>
          {authors.map((item) => (
            <span key={item}>{item}, </span>
          ))}
          <span>{issueYear}</span>
        </div>
        <div className={styles.ratingButton} onClick={(e) => e.stopPropagation()}>
          {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}
          <Button
            type='button'
            passStyle={styles.button}
            buttonText='Забронировать'
            id='booking-button'
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenCalendar(true);
            }}
          />
        </div>
      </div>
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} />
    </Link>
  );
};
