import React from 'react';
import { number, func, string } from 'prop-types';
import PageButton from './PageButton';

const NavBar = ({
  currentPage,
  numReviews,
  handlePageChange,
  view,
}) => {
  // ===========================Questions View============================
  if (view === 'Questions') {
    return (
      <div className="nav-bar">
        <button type="button">Previous</button>
        <PageButton
          currentPage={1}
          key="page-0"
          pageNumber={1}
          handlePageChange={() => {}}
        />
        <button type="button">Next</button>
      </div>
    );
  }
  // ===========================Reviews View==============================
  const pageNums = [];
  let thisPage = 1;
  for (let i = 0; i < numReviews; i += 5) {
    pageNums.push(thisPage);
    thisPage += 1;
  }
  return (
    <div className="nav-bar">
      <button onClick={(e) => handlePageChange(e, pageNums[pageNums.length - 1])} value="prev-page" id="prev-page" type="button">Previous</button>
      {pageNums.map((pageNum) => (
        <PageButton
          currentPage={currentPage}
          key={`page-${pageNum}`}
          pageNumber={pageNum}
          handlePageChange={handlePageChange}
        />
      ))}
      <button onClick={(e) => handlePageChange(e, pageNums[pageNums.length - 1])} value="next-page" id="next-page" type="button">Next</button>
    </div>
  );
};

NavBar.propTypes = {
  currentPage: number.isRequired,
  numReviews: number.isRequired,
  handlePageChange: func.isRequired,
  view: string.isRequired,
};

export default NavBar;
