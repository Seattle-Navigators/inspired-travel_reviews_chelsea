import React from 'react';
import Review from './Review.jsx';

const ReviewPage = ({ reviews }) => {
  return (
    <div className="page" id="review-page">
      {reviews.map((review, i) => {
        return <Review key={`${i}-review`}/>;
      })}
    </div>
  );
};

export default ReviewPage;