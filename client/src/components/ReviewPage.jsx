import React from 'react';
import Review from './Review.jsx';

const ReviewPage = ({ reviews }) => {
  return (
    <div className="page" id="review-page">
      {reviews.map((review) => {
        return <Review />;
      })}
    </div>
  );
};

export default ReviewPage;