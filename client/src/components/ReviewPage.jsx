import React from 'react';
import { arrayOf, object } from 'prop-types';
import Review from './Review';

const ReviewPage = ({ reviews }) => (
  <div className="page" id="review-page">
    {reviews.map((review) => <Review key={review._id} helpful={review.helpful} rating={review.rating} />)}
  </div>
);

ReviewPage.propTypes = {
  reviews: arrayOf(object).isRequired,
};

export default ReviewPage;
