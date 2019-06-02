import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Comp = ({ photos }) => {
  return (
    <>
      <Slider>
        {photos.map(({ src }) => (
          <div key={src}>
            <div className="photo" style={{ backgroundImage: `url(${src})` }} />
          </div>
        ))}
      </Slider>
      <style jsx>
        {`
          .photos-container {
            margin: 0 auto;
          }

          @media (min-width: 768px) {
            .photos-container {
              margin: 50px 0;
            }
          }

          .photo {
            display: inline-block;
            width: 33.33%;
            padding-bottom: 33.33%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            margin-bottom: -6px;
          }
        `}
      </style>
    </>
  );
};

export default Comp;
