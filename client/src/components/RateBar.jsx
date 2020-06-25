import React from 'react';
import { string, number } from 'prop-types';

const RateBar = ({ name, percentage, ratings }) => {
  const backWidth = 100;
  const barWidth = backWidth * percentage;

  return (
    <div>
      <div className="rate-bar">
        <input type="checkbox" />

        {name}

        <span style={{
          display: 'inline-flex',
          height: '12px',
          marginLeft: '15px',
          marginRight: '14px',
          width: `${backWidth}px`,
          backgroundColor: '#eee'
        }}>

          <span style={{
            display: 'inline-block',
            height: '12px',
            width: `${barWidth}px`,
            backgroundColor: '#222'
          }} />

        </span>
        <span>{ratings}</span>
      </div>
    </div>
  );
};

RateBar.propTypes = {
  name: string.isRequired,
  percentage: number.isRequired,
  ratings: number.isRequired,
};

export default RateBar;
