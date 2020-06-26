import React from 'react';
import { objectOf, oneOfType, object, array, string, number, bool } from 'prop-types'; // eslint-disable-line

const moment = require('moment');

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.review.helpful,
    };

    const { rating, travelType, expDate, lang, body, title, user, createdAt, votes, uploadImages } = props.review;

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
  }

  renderImages(index) {
    if (this.uploadImages) {
      if (this.uploadImages[index]) {
        return <div className="upload-image" style={{ backgroundImage: `url(${this.uploadImages[index].url})` }} />;
      }
    }
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
            </div >
            <div className="image-container">
              {this.renderImages(2)}
            </div>
          </div>
        );
      }
    }
  }

  render() {
    const { helpful } = this.state;
    let togglePlural = 's';
    if (this.votes <= 2) {
      togglePlural = '';
    }
    return (
      <div className={`review ${this.lang}`}>
        <div className="review-header">
          <div className="profile-image" style={{ backgroundImage: `url(${this.profileImage})` }} />
          <div className="header-text">
            <div>{this.username} wrote a review {moment(this.createdAt).format('MMM YYYY')}</div>
            <div>
              <span className="map-icon" style={{ backgroundImage: `url('https://fec-images-6-18-20.s3-us-west-2.amazonaws.com/iconfinder_Map_-_Location_Solid_Style_01_2216335.png')` }} />
              <span>{`${this.region}, ${this.country} ${this.contributions} contributions ${this.votes} helpful vote${togglePlural}`}</span>
            </div>
          </div>
        </div>

        {this.renderImageSpace()}

        <div className="review-body">
          <div>{this.rating}</div>
          <div>{`${this.title}`}</div>
          <div>{`${this.body}`}</div>
          <div><a href="#">Read more</a></div>
          <div>Date of experience: {moment(this.expDate).format('MMM YYYY')}</div>
        </div>
        <div className="review-footer">
          <div className="button-area">
            <button>Helpful</button>
            <button>Share</button>
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
  ])),
};
