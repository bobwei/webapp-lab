import React from 'react';

const Comp = ({ children, title }) => {
  return (
    <>
      <div className="section">
        {title && <h4>{title}</h4>}
        {children}
      </div>
      <style jsx>
        {`
          .section {
            padding: 15px 0;
          }
        `}
      </style>
    </>
  );
};

Comp.defaultProps = {
  title: '',
};

export default Comp;
