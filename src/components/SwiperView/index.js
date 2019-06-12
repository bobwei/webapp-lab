import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

const Comp = ({ children, config }) => {
  const swiperRef = React.createRef();
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (!swiper && swiperRef.current) {
      setSwiper(
        new Swiper(swiperRef.current, {
          ...Comp.defaultProps.config,
          ...config,
        }),
      );
    }
  });
  return (
    <>
      <div className="swiper-container" ref={swiperRef}>
        <div className="swiper-wrapper">{children({ swiper })}</div>
      </div>
    </>
  );
};

Comp.defaultProps = {
  config: {
    centeredSlides: true,
    slidesPerView: 'auto',
    simulateTouch: true,
    keyboard: {
      enabled: true,
    },
  },
};

Comp.propTypes = {
  config: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default Comp;
