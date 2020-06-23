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
    return (
      <div className="review">REVIEW BLOCK</div>
    );
  }
}

Review.propTypes = {
  helpful: bool.isRequired,
};
