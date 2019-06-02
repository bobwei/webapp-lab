import React from 'react';

import './index.css';

const Comp = ({ photos }) => {
  return (
    <div className="photos-container">
      {photos.map(({ src }) => (
        <div
          key={src}
          className="photo"
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
};

export default Comp;
