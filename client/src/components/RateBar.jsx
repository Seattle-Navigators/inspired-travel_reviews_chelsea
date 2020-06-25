import React from 'react';
import { string, number, func } from 'prop-types';

const RateBar = ({
  name,
  percentage,
  ratings,
  handleFilter,
}) => {
  const backWidth = 100;
  const barWidth = backWidth * percentage;

  if (name === 'Very Good') {
    name = 'VeryGood'; // eslint-disable-line
  }

  return (
    <div>
      <div className="rate-bar">
        <input id={`${name}-filter`} type="checkbox" onChange={handleFilter} />

        {name}

        <span style={{
          display: 'inline-flex',
          height: '12px',
          marginLeft: '15px',
          marginRight: '14px',
          width: `${backWidth}px`,
          backgroundColor: '#eee',
        }}> {/*eslint-disable-line*/}

          <span style={{
            display: 'inline-block',
            height: '12px',
            width: `${barWidth}px`,
            backgroundColor: '#222',
          }} /> {/*eslint-disable-line*/}

        </span>
        <span id={`${name}-ratings`}>{ratings}</span>
      </div>
    </div>
  );
};

RateBar.propTypes = {
  name: string.isRequired,
  percentage: number.isRequired,
  ratings: number.isRequired,
  handleFilter: func.isRequired,
};

export default RateBar;
