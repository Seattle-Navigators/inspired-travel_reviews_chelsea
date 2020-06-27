import React from 'react';
import { string } from 'prop-types';

const RatingCircle = ({ color }) => (
  <span className={`${color}-rating-circle`} />
);

RatingCircle.propTypes = {
  color: string.isRequired,
};

export default RatingCircle;
