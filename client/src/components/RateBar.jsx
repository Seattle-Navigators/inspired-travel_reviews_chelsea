import React from 'react';
import { string, number } from 'prop-types';

const RateBar = ({ name, totalRatings, ratings }) => (
  <div>
    <div className="rate-bar">
      <input type="checkbox" />
      {name}
      <span style={{ display: 'inline-block', width: '20px', border: '1px solid black' }} />
      <span>{ratings}</span>
    </div>
  </div>
);

RateBar.propTypes = {
  name: string.isRequired,
  totalRatings: number.isRequired,
  ratings: number.isRequired,
};

export default RateBar;
