import React from 'react';
import { bool, number } from 'prop-types';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.helpful,
    };
    this.rating = props.rating;
    this.travelType = props.travelType;
    this.expDate = props.expDate;
  }

  render() {
    const { helpful } = this.state;
    return (
      <div className="review">
        REVIEW BLOCK
        <span>{`${helpful}, ${this.rating}, ${this.travelType}, ${this.expDate}`}</span>
      </div>
    );
  }
}

Review.propTypes = {
  helpful: bool.isRequired,
  rating: number.isRequired,
};
