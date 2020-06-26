import React from 'react';
import { arrayOf, object } from 'prop-types';
import Review from './Review';

const ReviewPage = ({ reviews }) => (
  <div className="page" id="review-page">
    {reviews.map((review) => (
      <Review
        key={review._id} // eslint-disable-line
        review={review}
      />
    ))}
  </div>
);

ReviewPage.propTypes = {
  reviews: arrayOf(object).isRequired,
};

export default ReviewPage;
