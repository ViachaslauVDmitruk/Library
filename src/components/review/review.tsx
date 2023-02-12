import { useState } from 'react';

import { StarsRating } from '../stars-rating';

import ava from './assets/avatar.png';
import arrowUp from './assets/list-hide.png';
import arrowDown from './assets/list-show.png';

import styles from './review.module.scss';

export const Review = () => {
  const [isShowReview, setIsShowReview] = useState<boolean>(false);

  const ToggleReview = () => {
    setIsShowReview(!isShowReview);
  };

  return (
    <div className={styles.review}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.textTitle}>
            Отзывы<span>3</span>{' '}
          </div>
          <button
            type='button'
            onClick={() => ToggleReview()}
            className={styles.viewReview}
            data-test-id='button-hide-reviews'
          >
            <img src={isShowReview ? arrowUp : arrowDown} alt='img' />
          </button>
        </div>

        {isShowReview && (
          <div className={styles.reviewItems}>
            <div className={styles.content}>
              <div className={styles.information}>
                <div className={styles.avatar}>
                  <img src={ava} alt='img' />
                </div>
                <div className={styles.accountData}>
                  <div className={styles.account}>Иван Иванович</div>
                  <div className={styles.data}>5 января 2019</div>
                </div>
              </div>
              <div className={styles.stars}>
                <StarsRating ratingStars={5} />
              </div>
              <div className={styles.text}>
                Хорошая. Был на фестивале. Такая штука неприятная приключилась со мной. Не дай боже вам в такую ситуацию
                попасть. Вот книга и выручила
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.information}>
                <div className={styles.avatar}>
                  <img src={ava} alt='img' />
                </div>
                <div className={styles.accountData}>
                  <div className={styles.account}>Жан Шіраковіч</div>
                  <div className={styles.data}>20 января 2019</div>
                </div>
              </div>
              <div className={styles.stars}>
                <StarsRating ratingStars={3} />
              </div>
              <div className={styles.text}>Really cool</div>
            </div>
            <div className={styles.content}>
              <div className={styles.information}>
                <div className={styles.avatar}>
                  <img src={ava} alt='img' />
                </div>
                <div className={styles.accountData}>
                  <div className={styles.account}>Николай Качков</div>
                  <div className={styles.data}>5 января 2020</div>
                </div>
              </div>
              <div className={styles.stars}>
                <StarsRating ratingStars={4} />
              </div>
              <div className={styles.text}>
                Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет
                шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик
                предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач.
                Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени
                предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения
                создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших
                компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование
                приносит несомненную пользу обществу.
              </div>
            </div>
          </div>
        )}

        <button type='button' className={styles.button} data-test-id='button-rating'>
          Оценить книгу
        </button>
      </div>
    </div>
  );
};
