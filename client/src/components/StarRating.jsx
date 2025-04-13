import React from 'react';
import './StarRating.css'

/* rating represents the current rating value
onChange represents the function that will be called when the user clicks on 
a star to change the rating. An array of 5 empty elements is created using Array(5).fill()*/
const StarRating = ({ rating, onChange }) => {
  const stars = Array(5)
    .fill()
    .map((element, index) => {
      const starValue = index + 1;
      return (
        <span key={starValue} className={`star ${rating >= starValue ? 'active' : ''}`} onClick={() => onChange(starValue)}>
          &#x2606;
        </span>
      );
    });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;

/* line10: .map is used to iterate over the array of 5 elements.
  For each element it calculates the starValue as index + 1
  the index represent the current iteration from 0 to 4, and starValue is used to identify which star is being clicked. */

/* line 13: in the map function we generate a <span> element for each star. 
    it has a key prop set to starValue, which is necessary for react to efficiently update and re-render the list of stars.
    it has a className that is set based on whether the current starValue is less than or equal to the rating, if it is,
    the 'active' class is applied, which indicates that the star should be highlighted. 
    it has an onClick handler that calls the onChange function with the starValue as an argument when the user clicks the star.
    &#x2606; represents the star symbol
*/