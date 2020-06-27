import React from 'react';
import { objectOf, oneOfType, object, array, string, number, bool, func } from 'prop-types'; // eslint-disable-line
import axios from 'axios';

const moment = require('moment');

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.review.helpful,
      readMoreActive: false,
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
      .then((res) => {
        stateCopy.helpful = !helpful;
        this.setState(stateCopy);
      })
      .catch((err) => {
        console.error(err);
      });
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
    const { helpful, readMoreActive } = this.state; // eslint-disable-line
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
    }
    return (
      <div className={`review ${this.lang}`}>
        <div className="review-header">
          <div className="profile-image" style={{ backgroundImage: `url(${this.profileImage})` }} />
          <div className="header-text">
            <div>{`${this.username} wrote a review ${moment(this.createdAt).format('MMM YYYY')}`}</div>
            <div>
              <span className="map-icon" />
              <span>{`${this.region}, ${this.country} ${this.contributions} contributions ${this.votes} helpful vote${togglePlural}`}</span>
            </div>
          </div>
        </div>

        {this.renderImageSpace()}

        <div className="review-body">
          <div>{this.rating}</div>
          <div>{`${this.title}`}</div>
          <div>{`${this.body}`}</div>
          <div><button onClick={this.handleReadMore} id="read-more">Read more</button></div>
          <div>{`Date of experience: ${moment(this.expDate).format('MMM YYYY')}`}</div>
          <div hidden={!readMoreActive}>
            <div>{`Trip type: Traveled ${mapTypeToSentence[this.travelType]}`}</div>
            <div>This review is the subjective opinion of a TripAdvisor member and not of TripAdvisor LLC.</div>
          </div>
        </div>
        <div className="review-footer">
          <div hidden={!helpful}>1 Helpful vote</div>
          <div className="button-area">
            <button type="button" onClick={this.markHelpful}>Helpful</button>
            <button type="button">Share</button>
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
