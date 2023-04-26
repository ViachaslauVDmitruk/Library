import { useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { API_HOST } from '../../api/const';
import noImage from './assets/no-image.png';

import './slider-book.css';
import './slider-book.scss';
import styles from './slider-book.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type SliderProps = {
  src: SlideUrl[] | null;
};

type SlideUrl = {
  url: string | null;
};

export const SliderBook = ({ src }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const src2 = src || [];

  return (
    <div className={styles.imageBook}>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        pagination={{
          clickable: true,
        }}
        className='mySwiper2'
        data-test-id='slide-big'
      >
        {src2.map(({ url }) => (
          <SwiperSlide key={url}>
            <div className={styles.image}>
              {/* <img src={`${API_HOST}${url}`} alt='img' /> */}
              <img src={url ? url : noImage} alt='img' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {src2.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={4}
          freeMode={true}
          initialSlide={1}
          modules={[FreeMode, Thumbs]}
          className='mySwiper'
        >
          {src2.map(({ url }) => (
            <SwiperSlide data-test-id='slide-mini' className={styles.sliderMini} key={url}>
              <div className={styles.imageMini}>
                {/* <img src={`${API_HOST}${url}`} alt='img' />
                 */}
                <img src={url ? url : noImage} alt='img' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
