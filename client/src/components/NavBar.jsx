import React from 'react';
import { number, func } from 'prop-types';
import PageButton from './PageButton';

const NavBar = ({ currentPage, numReviews, handlePageChange }) => {
  const pageNums = [];
  let thisPage = 1;
  for (let i = 0; i < numReviews; i += 5) {
    pageNums.push(thisPage);
    thisPage += 1;
  }
  return (
    <div className="nav-bar">
      <button>Previous</button>
        {pageNums.map((pageNum) => (
          <PageButton
            currentPage={currentPage}
            key={`page-${pageNum}`}
            pageNumber={pageNum}
            handlePageChange={handlePageChange}
          />
        ))}
      <button>Next</button>
    </div>
  );
};

NavBar.propTypes = {
  currentPage: number.isRequired,
  numReviews: number.isRequired,
  handlePageChange: func.isRequired,
}

export default NavBar;
