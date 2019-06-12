import React, { useState } from 'react';

import SwiperView from '../SwiperView';

const Comp = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div
        className="background-photo"
        style={{ backgroundImage: photos && `url(${photos[activeIndex].src})` }}
      />
      {photos && (
        <div className="spots-wrapper">
          <SwiperView>
            {({ swiper }) => {
              if (swiper) {
                swiper.off('slideChange');
                swiper.on('slideChange', createOnSlideChange({ swiper, setActiveIndex }));
              }
              return photos
                .filter((photo) => photo.location)
                .map((photo) => {
                  const { location } = photo;
                  return (
                    <div key={photo.id} className="spot swiper-slide">
                      {location && location.name}
                    </div>
                  );
                });
            }}
          </SwiperView>
        </div>
      )}
      <style jsx>
        {`
          .background-photo {
            display: inline-block;
            width: 100%;
            height: 100%;
            margin-bottom: -6px;
            padding-bottom: 100%;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
          }

          .spots-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .spot {
            width: 260px;
            height: 100px;
            margin: 20px;
            border-radius: 3px;
            background-color: white;
            padding: 12px 15px;
            font-size: 16px;
          }
        `}
      </style>
    </>
  );
};

function createOnSlideChange({ swiper, setActiveIndex }) {
  return () => {
    setActiveIndex(swiper.activeIndex);
  };
}

export default Comp;
