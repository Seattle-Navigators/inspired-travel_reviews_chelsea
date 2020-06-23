import React from 'react';
import { string } from 'prop-types';

const RateBar = ({ name }) => (
  <div className="rate-bar">{name}</div>
);

RateBar.propTypes = {
  name: string.isRequired,
};

export default RateBar;
