import React from 'react';

const MotionDiv = ({ children }) => {
  return (
    <div data-aos="zoom-in-down" data-aos-duration="500">
      {children}
    </div>
  );
};

export default MotionDiv;
