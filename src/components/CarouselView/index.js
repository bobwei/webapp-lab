import React, { useEffect } from 'react';
import Swiper from 'swiper';

import 'swiper/dist/css/swiper.min.css';

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
          {photos.map(({ src }) => (
            <div key={src} className="block swiper-slide">
              <div
                className="photo"
                style={{ backgroundImage: `url(${src})` }}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .block {
            width: 80%;
            margin: 10px 10px;
            border-radius: 3px;
            overflow: hidden;
          }

          .photo {
            display: inline-block;
            width: 100%;
            margin-bottom: -6px;
            padding-bottom: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
          }
        `}
      </style>
    </>
  );
};

export default Comp;
