import React from 'react';
import RateBar from './RateBar.jsx';

const Ratings = (props) => {
  const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];
  return (
    <div className="filter">
      <div className="filter-header">Traveler Rating</div>
      {names.map((name) => {
        return <RateBar name={name} key={`${name}-bar`}/>;
      })}
    </div>
  );
};

export default Ratings;