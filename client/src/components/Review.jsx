import React from 'react';
import { objectOf, oneOfType, object, array, string, number, bool, func } from 'prop-types'; // eslint-disable-line
import axios from 'axios';
import { range } from 'underscore';
import RatingCircle from './RatingCircle';

const moment = require('moment');

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.review.helpful,
      readMoreActive: false,
      dotsActive: false,
    };

    const {
      _id,
      attractionId,
      rating,
      travelType,
      expDate,
      lang,
      body,
      title,
      user,
      createdAt,
      votes,
      uploadImages,
    } = props.review;

    this.reviewId = _id;
    this.attractionId = attractionId;
    this.rating = rating;
    this.travelType = travelType;
    this.expDate = expDate;
    this.lang = lang;
    this.body = body;
    this.title = title;
    this.votes = votes;
    this.username = user.name;
    this.profileImage = user.profileImage;
    this.createdAt = createdAt;
    this.region = user.originRegion;
    this.country = user.originCountry;
    this.contributions = user.contributions;
    this.uploadImages = uploadImages;

    this.renderImages = this.renderImages.bind(this);
    this.renderImageSpace = this.renderImageSpace.bind(this);
    this.handleReadMore = this.handleReadMore.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.changeDots = this.changeDots.bind(this);
  }

  handleReadMore(e) {
    const stateCopy = this.state;
    const { readMoreActive } = this.state;
    stateCopy.readMoreActive = !readMoreActive;
    this.setState(stateCopy);
    e.preventDefault();
  }

  markHelpful() {
    const stateCopy = this.state;
    const { helpful } = this.state;
    axios.patch(`/${this.attractionId}/api/reviews/${this.reviewId}`)
      .then(() => {
        stateCopy.helpful = !helpful;
        this.setState(stateCopy);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  changeDots() {
    const stateCopy = this.state;
    const { dotsActive } = this.state;
    stateCopy.dotsActive = !dotsActive;
    this.setState(stateCopy);
  }

  renderImages(index) {
    if (this.uploadImages) {
      if (this.uploadImages[index]) {
        return <div className="upload-image" style={{ backgroundImage: `url(${this.uploadImages[index].url})` }} />;
      }
    }
    return <div />;
  }

  renderImageSpace() {
    if (this.uploadImages) {
      if (this.uploadImages.length > 0) {
        return (
          <div className="review-images">
            <div className="image-container">
              {this.renderImages(0)}
            </div>
            <div className="image-container">
              {this.renderImages(1)}
            </div>
            <div className="image-container">
              {this.renderImages(2)}
            </div>
          </div>
        );
      }
    }
    return <div />;
  }

  render() {
    const { helpful, readMoreActive, dotsActive } = this.state;

    let togglePlural = 's';
    if (this.votes <= 2) {
      togglePlural = '';
    }

    const mapTypeToSentence = {
      Friends: 'with friends',
      Family: 'with family',
      Business: 'on business',
      Couple: 'as a couple',
      Solo: 'solo',
    };

    const greenCircles = range(this.rating + 1);
    const emptyCircles = range(5 - this.rating - 1);

    const toggleReadMore = readMoreActive ? 'Read less' : 'Read more';

    return (
      <div className={`review ${this.lang}`}>
        <div className="review-header">
          <div className="profile-image" style={{ backgroundImage: `url(${this.profileImage})` }} />
          <div className="header-text">
            <div className="header-user-text">
              <span className="username">{`${this.username} `}</span>
              {`wrote a review ${moment(this.createdAt).format('MMM YYYY')}`}
            </div>
            <div className="user-info-area">
              <span className="map-icon" />
              <span className="header-user-info">
                {`${this.region}, ${this.country} `}
                <span className="spacer-dot" />
                <span className="user-num">{`${this.contributions}`}</span>
                <span className="contributions-text">contributions </span>
                <span className="spacer-dot" />
                <span className="user-num">{`${this.votes}`}</span>
                <span className="helpful-text">{`helpful vote${togglePlural}`}</span>
              </span>
            </div>
          </div>
          <div className="dots">
            <button type="button" onClick={this.changeDots}>
              ...
            </button>
            <select className="dots-menu" hidden={!dotsActive}>
              <option hidden value="hidden" aria-label="hidden" />
              <option value="dots-report-this">Report this</option>
              <option value="dots-follow">Follow</option>
            </select>
          </div>
        </div>

        {this.renderImageSpace()}

        <div className="review-body">
          <div className="rating-area">
            {greenCircles.map((circle, i) => <RatingCircle color="green" key={`circle-green-${i}-${this.reviewId}`} />)} {/* eslint-disable-line */}
            {emptyCircles.map((circle, i) => <RatingCircle color="empty" key={`circle-empty-${i}-${this.reviewId}`} />)} {/* eslint-disable-line */}
          </div>
          <div className="review-title">{`${this.title}`}</div>
          <div className="review-text">{`${this.body}`}</div>
          <div><button className="read-more-button" type="button" onClick={this.handleReadMore} id="read-more"><span className="read-more-btn-txt">{toggleReadMore}</span></button></div>
          <div className="exp-date">
            <span className="exp-date-title">Date of experience: </span>
            {`${moment(this.expDate).format('MMM YYYY')}`}
          </div>
          <div hidden={!readMoreActive}>
            <div className="trip-type">
              <span className="trip-type-title">Trip type: </span>
              {`Traveled ${mapTypeToSentence[this.travelType]}`}
            </div>
            <div className="disclaimer">
              This review is the subjective opinion of an
              Inspired Travel member and not of Inspired Travel.
            </div>
          </div>
        </div>
        <div className="review-footer">
          <div className="helpful-vote" hidden={!helpful}>1 Helpful vote</div>
          <div className="button-area">
            <button className="review-helpful-button" type="button" onClick={this.markHelpful}>Helpful</button>
            <button className="review-share-button" type="button">Share</button>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  review: objectOf(oneOfType([
    object,
    array,
    string,
    number,
    bool,
  ])).isRequired,
};
