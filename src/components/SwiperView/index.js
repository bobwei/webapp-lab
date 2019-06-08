import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

const Comp = ({ children, config }) => {
  const swiperRef = React.createRef();
  let swiper;
  useEffect(() => {
    if (!swiper && swiperRef.current) {
      swiper = new Swiper(swiperRef.current, {
        ...Comp.defaultProps.config,
        ...config,
      });
    }
  });
  return (
    <>
      <div className="swiper-container" ref={swiperRef}>
        <div className="swiper-wrapper">{children()}</div>
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
