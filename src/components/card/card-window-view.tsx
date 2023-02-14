import { Link } from 'react-router-dom';

import { CardProps } from '../../types/card';
import { StarsRating } from '../stars-rating';

import noImage from './assets/no-image.png';

import styles from './card.module.scss';

export const CardWindowView = ({ src, rating, title, authors, id, issueYear }: CardProps) => (
  <Link to={`/books/category/${id}`} className={styles.cardWindow} data-test-id='card' key={id}>
    <div className={styles.image}>
      <img src={src?.url == null ? noImage : `https://strapi.cleverland.by${src?.url}`} alt='img' />
    </div>
    {rating ? <StarsRating ratingStars={rating} /> : <div className={styles.noRaring}>еще нет оценок</div>}

    <div className={styles.title}>{title}</div>
    <div className={styles.author}>
      {authors.map((item) => (
        <span key={item}>{item},</span>
      ))}
      <span>{issueYear}</span>
    </div>
    <button type='button' className={styles.button}>
      Забронировать
    </button>
  </Link>
);
