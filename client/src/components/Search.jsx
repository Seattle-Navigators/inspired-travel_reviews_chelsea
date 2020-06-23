import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
  }

  render() {
    return (
      <div className="search">Search</div>
    );
  }
}
