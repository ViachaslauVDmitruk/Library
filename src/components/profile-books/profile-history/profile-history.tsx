import classNames from 'classnames';
import { FreeMode, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { USER_FULL_DATA } from '../../../const/user-data';
import { userSelector } from '../../../selectors';
import { CardWindowView } from '../../card';
import { CardListView } from '../../card/card-list-view';
import { useAppSelector } from '../../hooks';

import './swiper-user.scss';
import styles from '../profile-books.module.scss';

export const ProfileHistory = () => {
  //   const { user } = useAppSelector(userSelector);
  const user = USER_FULL_DATA;

  const books = user.history?.books || [];

  return (
    <div className={styles.container} data-test-id='history'>
      <div className={styles.wrapperHistory}>
        <div className={styles.title}>История</div>
        <div className={styles.discription}>Список прочитанных книг</div>
        {!user.history?.books && (
          <div className={styles.content} data-test-id='empty-blue-card'>
            Вы не читали книг
            <br />
            из нашей библиотеки
          </div>
        )}

        {books && (
          <div className={styles.sliderWrapper}>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 35 },
                560: { slidesPerView: 2, spaceBetween: 35 },
                768: { slidesPerView: 3, spaceBetween: 35 },
                960: { slidesPerView: 4, spaceBetween: 30 },
              }}
              modules={[FreeMode, Navigation, Pagination]}
              pagination={{
                clickable: true,
              }}
              className='swiperUser'
            >
              {books.map(({ title, rating, image, id, authors, issueYear }) => (
                <SwiperSlide key={title} data-test-id='history-slide'>
                  <CardWindowView
                    src={image}
                    title={title}
                    rating={rating}
                    id={id}
                    authors={authors}
                    issueYear={issueYear}
                    bookingUserBookId={user.booking?.id ?? null}
                    searchValue=''
                    commentsUser={user.comments}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};
