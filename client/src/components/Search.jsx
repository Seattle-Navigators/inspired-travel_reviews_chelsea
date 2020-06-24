import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
    };
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search">
        Search
        <span>{query}</span>
      </div>
    );
  }
}
