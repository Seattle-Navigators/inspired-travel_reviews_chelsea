import React from 'react';
import { bool, number } from 'prop-types';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.helpful,
    };
    this.rating = props.rating;
  }

  render() {
    const { helpful } = this.state;
    return (
      <div className="review">
        REVIEW BLOCK
        <span>{`${helpful}, ${this.rating}`}</span>
      </div>
    );
  }
}

Review.propTypes = {
  helpful: bool.isRequired,
  rating: number.isRequired,
};
