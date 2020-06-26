import React from 'react';
import { number } from 'prop-types';
import PageButton from './PageButton';

const NavBar = ({ page, numReviews }) => {
  const pageNums = [];
  let currentPage = 1;
  for (let i = 0; i < numReviews; i += 5) {
    pageNums.push(currentPage);
    currentPage += 1;
  }
  return (
    <div className="nav-bar">
      <button>Previous</button>
        {pageNums.map((pageNum) => <PageButton currentPage={page} key={`page-${pageNum}`} pageNumber={pageNum} />)}
      <button>Next</button>
    </div>
  );
};

NavBar.propTypes = {
  page: number.isRequired,
  numReviews: number.isRequired,
}

export default NavBar;
