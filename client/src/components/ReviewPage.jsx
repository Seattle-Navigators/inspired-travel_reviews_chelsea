import React from 'react';
import Review from './Review';

const ReviewPage = ({ reviews }) => (
  <div className="page" id="review-page">
    {reviews.map((review) => <Review key={review.id} />)}
  </div>
);

export default ReviewPage;
