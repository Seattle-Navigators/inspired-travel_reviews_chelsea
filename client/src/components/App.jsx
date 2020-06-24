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
    this.handleViewSwitch = this.handleViewSwitch.bind(this);
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

  handleViewSwitch(event) {
    const { attractionId, numReviews, numQuestions, view, reviews } = this.state;
    let newView;
    const qualifierIndex = event.target.id.indexOf('-');
    let id = event.target.id.slice(0, qualifierIndex);

    if (id === 'review') {
      newView = 'Reviews';
    } else {
      newView = 'Questions';
    }

    if (view !== newView) {
      this.setState({
        attractionId,
        numReviews,
        numQuestions,
        view: newView,
        reviews,
      });
    }
  }

  getCurrentView() {
    const { view, numQuestions, reviews } = this.state;
    const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];

    if (view === 'Reviews') {
      return (
        <div>
          <Header id="reviews-header" header="Reviews" buttonLabel="Write a review" subtitle="" buttonId="write-review" />
          <div id="filter-container">
            <Ratings names={names} />
            <Checklist title="Traveler type" />
            <Checklist title="Time of year" />
            <RadioList title="Language" />
          </div>

          <Mentions />
          <Search />
          <ReviewPage reviews={reviews} />
        </div>
      );
    }
    return <Header id="qa-header" header="Questions & Answers" buttonLabel="Ask a question" subtitle={`See all ${numQuestions} questions`} buttonId="ask-question" />;
  }

  render() {
    const { numReviews, numQuestions } = this.state;
    return (
      <div className="container">

        <div id="tabs">
          <Tab baseId="review" title="Reviews" records={numReviews} handleViewSwitch={this.handleViewSwitch} />
          <Tab baseId="qa" title="Q&A" records={numQuestions} handleViewSwitch={this.handleViewSwitch} />
        </div>

        {this.getCurrentView()}


        <NavBar />
      </div>
    );
  }
}

App.propTypes = {
  attractionId: string.isRequired,
};
