/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { API_HOST } from '../../../api/const';
import { ColorMatch } from '../../../helpers/color-match';
import { loginSelector } from '../../../selectors';
import { CardProps } from '../../../types/card';
import { Calendar } from '../../booking';
import { Button } from '../../button';
import { useAppSelector } from '../../hooks';
import { StarsRating } from '../../stars-rating';
import noImage from '../assets/no-image.png';

import styles from './card-list-view.module.scss';

export const CardListView = ({ src, rating, title, authors, id, issueYear, searchValue, booking }: CardProps) => {
  const { category } = useParams();
  const highlight = ColorMatch({ searchValue, title });
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const { user } = useAppSelector(loginSelector);

  return (
    <div className={styles.cardList} data-test-id='card' key={id}>
      <Link to={`/books/${category}/${id}`} className={styles.image}>
        <img src={src?.url == null ? noImage : `${API_HOST}${src?.url}`} alt='img' />
      </Link>
      <div className={styles.contentWrapper}>
        <Link to={`/books/${category}/${id}`} className={styles.content}>
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
        <div
          className={styles.ratingButton}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}
          <Button
            type='button'
            passStyle={styles.button}
            disabled={!!booking}
            buttonText={booking ? 'Забронирована' : 'Забронировать'}
            id='booking-button'
            onClick={() => {
              setIsOpenCalendar(true);
            }}
          />
        </div>
      </div>
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} />
    </div>
  );
};
