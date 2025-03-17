// filepath: c:\Users\HP\campus-coin\src\components\ui\Card.jsx
import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white text-black rounded shadow p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;