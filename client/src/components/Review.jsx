import React from 'react';
import { objectOf, oneOfType, object, array, string, number, bool } from 'prop-types'; // eslint-disable-line

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.review.helpful,
    };

    const { rating, travelType, expDate, lang, body, title, user } = props.review;

    this.rating = rating;
    this.travelType = travelType;
    this.expDate = expDate;
    this.lang = lang;
    this.body = body;
    this.title = title;
    this.username = user.name;
    this.profileImage = user.profileImage;
  }

  render() {
    const { helpful } = this.state;
    return (
      <div className="review">
        <div>
          <div className="profile-image" style={{ backgroundImage: `url(${this.profileImage})` }} />
          <div>{this.username}</div>
        </div>

        <div>{`${this.title}`}</div>
        <span>{`${helpful}, ${this.rating}, ${this.travelType}, ${this.expDate}, ${this.lang}`}</span>
        <div>{`${this.body}`}</div>
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
