/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const fn = ({ photos }) => {
  return (
    <div className="container">
      <div className="photos-container">
        {photos.map(({ src }) => (
          <div
            key={src}
            className="photo"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <style jsx>
        {`
          .container {
            padding: 0;
          }
          .photos-container {
            margin: 0 auto;
            max-width: 375px;
          }
          @media (min-width: 768px) {
            .photos-container {
              margin-top: 50px;
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
    </div>
  );
};

fn.defaultProps = {
  photos: require('../src/fixtures/photos.json'),
};

export default fn;
