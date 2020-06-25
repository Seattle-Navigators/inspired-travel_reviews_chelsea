import React from 'react';
import { string, arrayOf, object, number } from 'prop-types';
import RateBar from './RateBar';

const Ratings = ({ names, reviews, numReviews }) => {
  const ratingCounts = reviews.reduce((obj, review) => {
    obj[review.rating] += 1;
    return obj;
  }, {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  });

  console.log(ratingCounts);

  return (
    <div className="filter">
      <div className="filter-header">Traveler Rating</div>
      {names.map((name) => <RateBar name={name} key={`${name}-bar`} />)}
    </div>
  );
};

Ratings.propTypes = {
  names: arrayOf(string).isRequired,
  reviews: arrayOf(object).isRequired,
  numReviews: number.isRequired,
};

export default Ratings;
