import React from 'react';
import { bool } from 'prop-types';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpful: props.helpful,
    };
  }

  render() {
    const { helpful } = this.state;
    return (
      <div className="review">
        REVIEW BLOCK
        <span>{`${helpful}`}</span>
      </div>
    );
  }
}

Review.propTypes = {
  helpful: bool.isRequired,
};
