import React from 'react';
import { bool, number, string } from 'prop-types';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.helpful,
    };
    this.rating = props.rating;
    this.travelType = props.travelType;
    this.expDate = props.expDate;
    this.lang = props.lang;
    this.body = props.body;
    this.title = props.title;
  }

  render() {
    const { helpful } = this.state;
    return (
      <div className="review">
        REVIEW BLOCK
        <div>{`${this.title}`}</div>
        <span>{`${helpful}, ${this.rating}, ${this.travelType}, ${this.expDate}, ${this.lang}`}</span>
        <div>{`${this.body}`}</div>
      </div>
    );
  }
}

Review.propTypes = {
  helpful: bool.isRequired,
  rating: number.isRequired,
  travelType: string.isRequired,
  expDate: string.isRequired,
  lang: string.isRequired,
};
