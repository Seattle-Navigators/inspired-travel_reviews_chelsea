import React from 'react';
import { string, number, func, bool } from 'prop-types'; // eslint-disable-line

const RateBar = ({
  name,
  percentage,
  ratings,
  handleFilter,
  selected,
}) => {
  const backWidth = 120;
  const barWidth = backWidth * percentage;

  let nameNoSpace = name;

  if (name === 'Very Good') {
    nameNoSpace = 'VeryGood'; // eslint-disable-line
  }

  return (
    <div>
      <div className="rate-bar">
        <input id={`${nameNoSpace}-filter`} type="checkbox" onChange={handleFilter} checked={selected} />

        <span className="rating-name">{name}</span>

        <span style={{
          display: 'inline-flex',
          height: '12px',
          marginLeft: '12px',
          marginRight: '14px',
          width: `${backWidth}px`,
          backgroundColor: '#e0e0e0',
          borderRadius: '2px',
        }}> {/*eslint-disable-line*/}

          <span style={{
            display: 'inline-block',
            height: '12px',
            width: `${barWidth}px`,
            backgroundColor: '#222',
            borderRadius: '2px',
          }} /> {/*eslint-disable-line*/}

        </span>
        <span id={`${nameNoSpace}-ratings`}>{ratings}</span>
      </div>
    </div>
  );
};

RateBar.propTypes = {
  name: string.isRequired,
  percentage: number.isRequired,
  ratings: number.isRequired,
  handleFilter: func.isRequired,
  selected: bool.isRequired,
};

export default RateBar;
