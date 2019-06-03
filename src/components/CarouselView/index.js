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
          {photos.map((photo) => {
            const { src, location } = photo;
            return (
              <div key={src} className="block swiper-slide" onClick={createOnClick({ photo })}>
                <div className="overlay-top">
                  <i className="fas fa-external-link-alt" />
                </div>
                <div className="photo" style={{ backgroundImage: `url(${src})` }} />
                {location && (
                  <div className="overlay">
                    <div className="location">
                      <i className="fas fa-map-marker-alt" />
                      {location.name}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>
        {`
          .block {
            width: 80%;
            margin: 10px 10px;
            border-radius: 3px;
            overflow: hidden;
            position: relative;
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

          .overlay {
            color: white;
            height: 100px;
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 20px;
          }

          .location > i {
            margin-right: 8px;
          }

          .overlay-top {
            color: white;
            height: 60px;
            position: absolute;
            right: 0;
            left: 0;
            background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25));
            padding: 10px;
            display: flex;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  );
};

function createOnClick({ photo }) {
  const { location, url } = photo;
  return (e) => {
    const $overlay = e.currentTarget.querySelector('.overlay');
    const isOverlayClicked = $overlay.contains(e.target);
    if (isOverlayClicked && location) {
      window.open(`https://www.google.com/maps?q=${location.name}`, '_blank');
      return;
    }
    window.open(url, '_blank');
  };
}

export default Comp;
