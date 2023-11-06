import React from 'react';
import './StarRating.css'


const StarRating = ({ rating, onChange }) => {
  const stars = Array(5)
    .fill()
    .map((_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={starValue}
          className={`star ${rating >= starValue ? 'active' : ''}`}
          onClick={() => onChange(starValue)}
        >
          ★
        </span>
      );
    });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
