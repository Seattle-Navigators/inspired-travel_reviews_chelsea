import React from 'react';

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
