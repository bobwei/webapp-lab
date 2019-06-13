import React, { useState } from 'react';

const Comp = ({ photo }) => {
  const [tags] = useState([]);
  const { src, location } = photo;
  return (
    <>
      <div className="block swiper-slide" onClick={createOnClick({ photo })}>
        <div className="overlay-top">
          <i className="fas fa-external-link-alt" />
        </div>
        <div className="photo" style={{ backgroundImage: `url(${src})` }} />
        {location && (
          <div className="overlay">
            <div className="description">
              <div className="tag">{tags.join(', ')}</div>
              <i className="fas fa-map-marker-alt" />
              {location.name}
            </div>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .block {
            width: 80%;
            margin: 5px 10px;
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
            height: 140px;
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 20px;
          }

          .description > i {
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

          .fa-eye {
            font-size: 22px;
            padding: 20px;
            margin: -20px;
          }

          .tag {
            color: white;
            margin-bottom: 10px;
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
