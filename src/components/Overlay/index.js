import React from 'react';

const Comp = ({ children, onBackdropClick }) => {
  return (
    <>
      <div className="backdrop" onClick={onBackdropClick}>
        {children}
      </div>
      <style jsx>
        {`
          .backdrop {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
          }
        `}
      </style>
    </>
  );
};

export default Comp;
