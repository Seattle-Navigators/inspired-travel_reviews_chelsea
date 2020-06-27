import React from 'react';
import { string } from 'prop-types';

const RatingCircle = ({ color }) => (
  <span className={`${color}-rating-circle`}></span>
);

RatingCircle.propTypes = {
  color: string.isRequired,
}

export default RatingCircle;