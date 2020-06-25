import React from 'react';
import { string } from 'prop-types';

const RateBar = ({ name }) => (
  <div>
    <div className="rate-bar">
      <input type="checkbox" />
      {name}
      <span style={{ display: 'inline-block', width: '20px', border: '1px solid black' }} />
    </div>
  </div>
);

RateBar.propTypes = {
  name: string.isRequired,
};

export default RateBar;
