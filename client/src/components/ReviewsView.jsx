import React from 'react';
import Header from './Header';
import Ratings from './Ratings';
import Checklist from './Checklist';
import RadioList from './RadioList';
import Mentions from './Mentions';
import Search from './Search';
import ReviewPage from './ReviewPage';
import NavBar from './NavBar';
import { getUniqueSortedLangs } from '../utilities/getUniqueSortedLangs';

const ReviewsView = ({
  handleSelection,
  reviews,
  numReviews,
  filterReviews,
  filters,
  popularMentions,
  handleMention,
  handleFilter,
  handleChange,
  search,
  filteredReviews,
  currentPage,
  handlePageChange,
  view,
  noResults,
}) => {
  const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];
  const types = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
  const times = ['Dec-Feb', 'Mar-May', 'Jun-Aug', 'Sep-Nov'];
  const langsArray = getUniqueSortedLangs(reviews);

  return (
    <div>
      <Header
        id="reviews-header"
        header="Reviews"
        buttonLabel="Write a review"
        subtitle=""
        buttonId="write-review"
        handleSelection={handleSelection}
      />

      <div id="filter-container">
        <Ratings
          names={names}
          reviews={reviews}
          numReviews={numReviews}
          handleFilter={filterReviews}
          selections={filters}
        />

        <Checklist
          title="Traveler type"
          labels={types}
          handleFilter={filterReviews}
          selections={filters}
        />
        <Checklist
          title="Time of year"
          labels={times}
          handleFilter={filterReviews}
          selections={filters}
        />
        <RadioList
          title="Language"
          handleSelection={handleSelection}
          langs={langsArray}
          handleFilter={filterReviews}
          selection={filters.language}
        />
      </div>

      <Mentions
        keywords={popularMentions}
        handleMention={handleMention}
        search={search}
      />
      <Search
        handleChange={handleChange}
        search={search}
      />

      <ReviewPage
        reviews={filteredReviews}
        currentPage={currentPage}
      />

      <NavBar
        currentPage={currentPage}
        numReviews={filteredReviews.length}
        handlePageChange={handlePageChange}
        view={view}
      />

      <div id="no-results" hidden={!noResults}>
        No results found.
        Try removing a filter, changing your search, or clear all to read reviews.
      </div>

    </div>
  );
};

export default ReviewsView;
