import React from 'react';
import { string } from 'prop-types';
import axios from 'axios';
import Tab from './Tab';
import Header from './Header';
import Ratings from './Ratings';
import Checklist from './Checklist';
import RadioList from './RadioList';
import Mentions from './Mentions';
import Search from './Search';
import ReviewPage from './ReviewPage';
import NavBar from './NavBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionId: props.attractionId,
      numReviews: 0,
      numQuestions: 0,
      view: 'Reviews',
      reviews: [
        { _id: 0 },
      ],
    };
    this.getCurrentView = this.getCurrentView.bind(this);
  }

  componentDidMount() {
    const { attractionId, view } = this.state;
    axios.get(`/${attractionId}/api/reviews`)
      .then((res) => {
        this.setState({
          attractionId,
          numReviews: res.data.length,
          numQuestions: 0,
          view,
          reviews: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCurrentView() {
    const { view } = this.state;
    if (view === 'Reviews') {
      return <Header id="reviews-header" header="Reviews" buttonLabel="Write a review" subtitle="" buttonId="write-review" />;
    }
    return <Header id="qa-header" header="Questions & Answers" buttonLabel="Ask a question" subtitle="See all # questions" buttonId="ask-question" />;
  }

  render() {
    const { numReviews, numQuestions, reviews } = this.state;
    const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];
    return (
      <div className="container">

        <div id="tabs">
          <Tab icon="icon" title="Reviews" records={numReviews} id="reviews-tab" />
          <Tab icon="icon" title="Q&A" records={numQuestions} id="qa-tab" />
        </div>

        {this.getCurrentView()}

        <div id="filter-container">
          <Ratings names={names} />
          <Checklist title="Traveler type" />
          <Checklist title="Time of year" />
          <RadioList title="Language" />
        </div>

        <Mentions />
        <Search />
        <ReviewPage reviews={reviews} />
        <NavBar />
      </div>
    );
  }
}

App.propTypes = {
  attractionId: string.isRequired,
};
