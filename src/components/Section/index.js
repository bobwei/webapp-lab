import React from 'react';

const Comp = ({ children }) => {
  return (
    <>
      <div className="section">{children}</div>
      <style jsx>
        {`
          .section {
            padding: 10px 0;
          }
        `}
      </style>
    </>
  );
};

export default Comp;
