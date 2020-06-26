import React from 'react';
import { arrayOf, object, number } from 'prop-types';
import Review from './Review';

const ReviewPage = ({ reviews, currentPage }) => {
  const upTicks = currentPage - 1;
  const firstReviewIndex = upTicks * 5;
  const lastReviewIndex = firstReviewIndex + 5;
  const currentPageReviews = reviews.slice(firstReviewIndex, lastReviewIndex);

  return (
    <div className="page" id="review-page">
      {currentPageReviews.map((review) => (
        <Review
          key={review._id} // eslint-disable-line
          review={review}
        />
      ))}
    </div>
  );
};

ReviewPage.propTypes = {
  reviews: arrayOf(object).isRequired,
  currentPage: number.isRequired,
};

export default ReviewPage;
