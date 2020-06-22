import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
    }
  }

  render() {
    return (
      <div className="container">

        <div id="tabs">
          <div id="reviews-tab">Reviews</div>
          <div id="qa-tab">Q&A</div>
        </div>

        <div id="reviews-header">
          <span>Reviews</span>
          <button id="write-review">Write a review</button>
        </div>

        <div id="filter-section">
          <div>Travel rating</div>
          <div>Traveler type</div>
          <div>Time of year</div>
          <div>Language</div>
        </div>

        <div id="popular-mentions">
          <button id="all-reviews-filter">All reviews</button>
        </div>
      </div>
    );
  }
}

// max container component width: 814 pixels
// min container component width: 500 pixels
// 5 review blocks per page
// page navigation component at bottom - 13px margin between final review block
// height of each review block determined by line height and whether "helpful" marked