import React from 'react';
import Tab from './Tab.jsx';
import Header from './Header.jsx';
import Ratings from './Ratings.jsx';
import Checklist from './Checklist.jsx';
import RadioList from './RadioList.jsx';
import Mentions from './Mentions.jsx';
import Search from './Search.jsx';
import ReviewPage from './ReviewPage.jsx';
import NavBar from './NavBar.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numReviews: 0,
      numQuestions: 0,
      view: 'Reviews',
      reviews: [{}, {}, {}, {}, {}],
    }
    this.getCurrentView = this.getCurrentView.bind(this);
    this.switchView = this.switchView.bind(this);
  }

  getCurrentView() {
    if (this.state.view === 'Reviews') {
      return <Header id="reviews-header" header="Reviews" buttonLabel="Write a review" subtitle="" buttonId="write-review"/>;
    } else {
      return <Header id="qa-header" header="Questions & Answers" buttonLabel="Ask a question" subtitle="See all # questions" buttonId="ask-question"/>;
    }
  }

  switchView(event) {

  }

  render() {
    return (
      <div className="container">

        <div id="tabs">
          <Tab icon="icon" title="Reviews" records={this.state.numReviews} id="reviews-tab"/>
          <Tab icon="icon" title="Q&A" records={this.state.numQuestions} id="qa-tab"/>
        </div>

        {this.getCurrentView()}

        <div id="filter-container">
          <Ratings />
          <Checklist title="Traveler type" />
          <Checklist title="Time of year" />
          <RadioList title="Language" />
        </div>

        <Mentions />
        <Search />
        <ReviewPage reviews={this.state.reviews}/>
        <NavBar />
      </div>
    );
  }
}