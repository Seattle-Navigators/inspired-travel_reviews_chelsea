import React from 'react';
import { number, func } from 'prop-types';

const PageButton = ({ currentPage, pageNumber, handlePageChange }) => {
  let className = 'inactive-page';
  if (currentPage === pageNumber) {
    className = 'active-page';
  }
  return (
    <div className={className}>
      <button className={`${className}-button`} onClick={handlePageChange} value={pageNumber} type="button">{pageNumber}</button>
    </div>
  );
};

PageButton.propTypes = {
  currentPage: number.isRequired,
  pageNumber: number.isRequired,
  handlePageChange: func.isRequired,
};

export default PageButton;
