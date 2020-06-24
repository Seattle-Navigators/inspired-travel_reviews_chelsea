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
import AskQuestion from './AskQuestion';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionId: props.attractionId,
      attractionName: '',
      numReviews: 0,
      numQuestions: 0,
      view: 'Reviews',
      reviews: [
        {
          _id: 0,
          helpful: false,
        },
      ],
      popup: false,
    };
    this.getCurrentView = this.getCurrentView.bind(this);
    this.handleViewSwitch = this.handleViewSwitch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount() {
    const { attractionId, view, popup } = this.state;
    axios.get(`/${attractionId}/api/reviews`)
      .then((res) => {
        this.setState({
          attractionId,
          attractionName: res.data[0].attractionName,
          numReviews: res.data.length,
          numQuestions: 0,
          view,
          reviews: res.data,
          popup,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCurrentView() {
    const {
      view,
      numQuestions,
      reviews,
      popup,
    } = this.state;

    const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];

    if (view === 'Reviews') {
      return (
        <div>
          <Header id="reviews-header" header="Reviews" buttonLabel="Write a review" subtitle="" buttonId="write-review" handleSelection={this.handleSelection} />
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
    } else if (view === 'Questions') {
      return (
        <div>
          <Header id="qa-header" header="Questions & Answers" buttonLabel="Ask a question" subtitle={`See all ${numQuestions} questions`} buttonId="ask-question" handleSelection={this.handleSelection} />
        </div>
      )
    }
  }

  handleSelection(event) {
    const {
      attractionId,
      attractionName,
      numReviews,
      numQuestions,
      view,
      reviews,
      popup,
    } = this.state;

    if (event.target.value === 'ask-question' || event.target.value === 'Ask a question') {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view,
        reviews,
        popup: true,
      });
    } else {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view,
        reviews,
        popup,
      });
      window.alert('Off-page link');
    }
  }

  handleViewSwitch(event) {
    const {
      attractionId,
      attractionName,
      numReviews,
      numQuestions,
      view,
      reviews,
      popup,
    } = this.state;
    let newView;
    const qualifierIndex = event.target.id.indexOf('-');
    const id = event.target.id.slice(0, qualifierIndex);

    if (id === 'review') {
      newView = 'Reviews';
    } else if (id === 'qa') {
      newView = 'Questions';
    } else {
      newView = view;
    }

    if (view !== newView || popup) {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view: newView,
        reviews,
        popup: false,
      });
    }
  }

  render() {
    const { attractionName, numReviews, numQuestions, popup } = this.state;
    return (
      <div className="container">
        <AskQuestion hidden={!popup} handleViewSwitch={this.handleViewSwitch} name={attractionName} />
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
