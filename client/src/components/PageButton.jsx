import React from 'react';
import { number } from 'prop-types';

const PageButton = ({ currentPage, pageNumber }) => {
  let className = 'inactive-page';
  if (currentPage === pageNumber) {
    className = 'active-page';
  }
  return (
    <div className={className}>
      <button className={`${className}-button`}>{pageNumber}</button>
    </div>
  );
};

PageButton.propTypes = {
  currentPage: number.isRequired,
  pageNumber: number.isRequired,
};

export default PageButton;
