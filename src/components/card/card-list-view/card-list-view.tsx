import { Link } from 'react-router-dom';

import { CardProps } from '../../../types/card';
import { StarsRating } from '../../stars-rating';
import noImage from '../assets/no-image.png';

import styles from './card-list-view.module.scss';

export const CardListView = ({ src, rating, title, authors, id }: CardProps) => (
  <Link to={`/books/category/${id}`} data-test-id='card' className={styles.cardList} key={id}>
    <div className={styles.image}>
      <img src={src?.url == null ? noImage : `https://strapi.cleverland.by${src?.url}`} alt='img' />
    </div>
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.author}>
        {authors.map((item) => (
          <span>{item},</span>
        ))}
      </div>
      <div className={styles.ratingButton}>
        {/* <StarsRating ratingStars={rating} /> */}
        <button type='button' className={styles.button}>
          Забронировать
        </button>
      </div>
    </div>
  </Link>
);
