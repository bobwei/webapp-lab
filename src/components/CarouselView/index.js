import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Comp = ({ photos }) => {
  const settings = {
    centerMode: true,
    centerPadding: '5%',
    infinite: false,
    speed: 300,
  };
  return (
    <>
      <Slider {...settings}>
        {photos.map(({ src }) => (
          <div key={src}>
            <div className="block">
              <div
                className="photo"
                style={{ backgroundImage: `url(${src})` }}
              />
            </div>
          </div>
        ))}
      </Slider>
      <style jsx>
        {`
          .block {
            width: 95%;
            margin: 10px auto;
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
