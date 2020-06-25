import React from 'react';
import { string, arrayOf, object, number, func } from 'prop-types'; // eslint-disable-line
import RateBar from './RateBar';

const Ratings = ({ names, reviews, numReviews, handleFilter }) => { // eslint-disable-line
  const ratingCounts = reviews.reduce((obj, review) => {
    obj[review.rating] += 1; // eslint-disable-line
    return obj;
  }, {
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  });

  const mappedNames = {
    Excellent: '4',
    'Very Good': '3',
    Average: '2',
    Poor: '1',
    Terrible: '0',
  };

  return (
    <div className="ratings-filter">
      <div className="filter-header">Traveler Rating</div>
      {names.map((name) => {
        const ratings = ratingCounts[mappedNames[name]];
        return (
          <RateBar
            name={name}
            key={`${name}-bar`}
            percentage={ratings / numReviews}
            ratings={ratings}
            handleFilter={handleFilter}
          />
        );
      })}
    </div>
  );
};

Ratings.propTypes = {
  names: arrayOf(string).isRequired,
  reviews: arrayOf(object).isRequired,
  numReviews: number.isRequired,
  handleFilter: func.isRequired,
};

export default Ratings;
