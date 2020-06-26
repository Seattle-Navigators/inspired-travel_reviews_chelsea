import React from 'react';
import { arrayOf, object } from 'prop-types';
import Review from './Review';

const ReviewPage = ({ reviews }) => (
  <div className="page" id="review-page">
    {reviews.map((review) => (
      <Review
        key={review._id} // eslint-disable-line
        helpful={review.helpful}
        rating={review.rating}
        travelType={review.travelType}
        expDate={review.expDate}
        lang={review.lang}
        body={review.body}
        title={review.title}
      />
    ))}
  </div>
);

ReviewPage.propTypes = {
  reviews: arrayOf(object).isRequired,
};

export default ReviewPage;
