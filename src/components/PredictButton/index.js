import React from 'react';
import classNames from 'classnames';

const Comp = ({ onClick, isLoading }) => {
  return (
    <>
      <i className={classNames('far', 'fa-eye', { 'is-loading': isLoading })} onClick={onClick} />
      <style jsx>
        {`
          .is-loading {
            animation: random 5s infinite;
          }

          @keyframes random {
            15% {
              color: red;
            }
            30% {
              color: yellow;
            }
            45% {
              color: green;
            }
            60% {
              color: blue;
            }
            75% {
              color: white;
            }
          }
        `}
      </style>
    </>
  );
};

Comp.defaultProps = {
  isLoading: false,
};

export default Comp;
