import React from 'react';
import { string, arrayOf } from 'prop-types';
import RateBar from './RateBar';

const Ratings = ({ names }) => (
  <div className="filter">
    <div className="filter-header">Traveler Rating</div>
    {names.map((name) => <RateBar name={name} key={`${name}-bar`} />)}
  </div>
);

Ratings.propTypes = {
  names: arrayOf(string).isRequired,
};

export default Ratings;
