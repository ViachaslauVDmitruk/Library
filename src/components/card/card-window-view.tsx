/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { API_HOST } from '../../api/const';
import { ColorMatch } from '../../helpers/color-match';
import { loginSelector } from '../../selectors';
import { CardProps } from '../../types/card';
import { Calendar } from '../booking';
import { Button } from '../button';
import { useAppSelector } from '../hooks';
import { StarsRating } from '../stars-rating';

import noImage from './assets/no-image.png';

import styles from './card.module.scss';

export const CardWindowView = ({ src, rating, title, authors, id, issueYear, searchValue, booking }: CardProps) => {
  const { category } = useParams();
  const highlight = ColorMatch({ searchValue, title });
  const [openModalCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const { user } = useAppSelector(loginSelector);

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
        //   passStyle={classNames(styles.button, { [styles.bookingUser]: booking.customerId === user.id })}
        //   disabled={!booking || !(booking.customerId === user?.id)}
        disabled={!booking}
        buttonText={booking ? 'Забронировать' : 'Забронирована'}
        id='booking-button'
        onClick={() => setIsOpenCalendar(true)}
      />
      <Calendar isOpen={openModalCalendar} setIsOpen={setIsOpenCalendar} />
    </div>
  );
};
