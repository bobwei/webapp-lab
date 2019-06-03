import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

import Card from '../Card';

const Comp = ({ photos }) => {
  const swiperRef = React.createRef();
  let swiper;
  useEffect(() => {
    if (!swiper && swiperRef.current) {
      swiper = new Swiper(swiperRef.current, {
        centeredSlides: true,
        slidesPerView: 'auto',
        simulateTouch: true,
        keyboard: {
          enabled: true,
        },
      });
    }
  });
  return (
    <>
      <div className="swiper-container" ref={swiperRef}>
        <div className="swiper-wrapper">
          {photos.map((photo) => (
            <Card key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comp;
