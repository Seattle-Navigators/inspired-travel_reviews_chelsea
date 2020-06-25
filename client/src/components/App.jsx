import React from 'react';
import { string, arrayOf, object } from 'prop-types';
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
import Languages from './Languages';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const reviews = props.initialData || [{
      attractionName: '',
      _id: '',
      helpful: false,
      rating: 4,
    }];

    this.state = {
      attractionId: props.attractionId,
      attractionName: reviews[0].attractionName,
      numReviews: reviews.length,
      numQuestions: 0,
      view: 'Reviews',
      reviews,
      popupActive: false,
      langActive: false,
      filters: {
        excellent: false,
        veryGood: false,
        average: false,
        poor: false,
        terrible: false,
        family: false,
        couple: false,
        solo: false,
        business: false,
        friends: false,
        marMay: false,
        junAug: false,
        sepNov: false,
        decFeb: false,
        english: false,
        spanish: false,
        italian: false,
        french: false,
        portuguese: false,
        german: false,
        chinese: false,
        japanese: false,
        korean: false,
      },
    };
    this.getCurrentView = this.getCurrentView.bind(this);
    this.handleViewSwitch = this.handleViewSwitch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
  }

  componentDidMount() {
    const {
      attractionId,
      view,
      popupActive,
      langActive,
      filters,
    } = this.state;

    axios.get(`/${attractionId}/api/reviews`)
      .then((res) => {
        this.setState({
          attractionId,
          attractionName: res.data[0].attractionName,
          numReviews: res.data.length,
          numQuestions: 0,
          view,
          reviews: res.data,
          popupActive,
          langActive,
          filters,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCurrentView() {
    const {
      view,
      numReviews,
      numQuestions,
      reviews,
      filters,
    } = this.state;

    let statusRateFilters = false;
    let statusTypeFilters = false;
    let statusTimeFilters = false;
    let statusLangFilters = false;

    const rateFilters = ['excellent', 'veryGood', 'average', 'poor', 'terrible'];
    const typeFilters = ['family', 'couple', 'solo', 'business', 'friends'];
    const timeFilters = ['decFeb', 'marMay', 'junAug', 'sepNov'];
    const langFilters = ['english', 'spanish', 'italian', 'french', 'portuguese', 'german', 'chinese', 'japanese', 'korean'];

    for (const filter in filters) { // eslint-disable-line
      if (rateFilters.indexOf(filter) > -1) {
        if (filters[filter]) {
          statusRateFilters = true;
        }
      }
      if (typeFilters.indexOf(filter) > -1) {
        if (filters[filter]) {
          statusTypeFilters = true;
        }
      }
      if (timeFilters.indexOf(filter) > -1) {
        if (filters[filter]) {
          statusTimeFilters = true;
        }
      }
      if (langFilters.indexOf(filter) > -1) {
        if (filters[filter]) {
          statusLangFilters = true;
        }
      }
    }

    const mapToFilter = {
      4: 'excellent',
      3: 'veryGood',
      2: 'average',
      1: 'poor',
      0: 'terrible',
      Family: 'family',
      Couple: 'couple',
      Solo: 'solo',
      Business: 'business',
      Friends: 'friends',
      m1: 'decFeb',
      m2: 'decFeb',
      m3: 'marMay',
      m4: 'marMay',
      m5: 'marMay',
      m6: 'junAug',
      m7: 'junAug',
      m8: 'junAug',
      m9: 'sepNov',
      m10: 'sepNov',
      m11: 'sepNov',
      m12: 'decFeb',
      English: 'english',
      Spanish: 'spanish',
      Italian: 'italian',
      French: 'french',
      Portuguese: 'portuguese',
      German: 'german',
      Chinese: 'chinese',
      Japanese: 'japanese',
      Korean: 'korean',
    };

    const filteredReviews = reviews.filter((review) => {
      const {
        rating,
        travelType,
        expDate,
        lang,
      } = review;

      if (filters[mapToFilter[rating]] || !statusRateFilters) {
        if (filters[mapToFilter[travelType]] || !statusTypeFilters) {
          if (filters[mapToFilter[`m${new Date(expDate).getMonth()}`]] || !statusTimeFilters) {
            if (filters[mapToFilter[lang]] || !statusLangFilters) {
              return true;
            }
          }
        }
      }
      return false;
    });

    const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];
    const types = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
    const times = ['Dec-Feb', 'Mar-May', 'Jun-Aug', 'Sep-Nov'];
    const langs = ['All languages', 'English', 'Spanish', 'Italian', 'French', 'Portuguese', 'German', 'Chinese', 'Japanese', 'Korean'];

    const langsArray = this.getUniqueSortedLangs(reviews);

    if (view === 'Reviews') {
      return (
        <div>
          <Header id="reviews-header" header="Reviews" buttonLabel="Write a review" subtitle="" buttonId="write-review" handleSelection={this.handleSelection} />
          <div id="filter-container">

            <Ratings
              names={names}
              reviews={reviews}
              numReviews={numReviews}
              handleFilter={this.filterReviews}
            />

            <Checklist title="Traveler type" labels={types} handleFilter={this.filterReviews} />
            <Checklist title="Time of year" labels={times} handleFilter={this.filterReviews} />
            <RadioList title="Language" labels={langs} handleSelection={this.handleSelection} langs={langsArray} handleFilter={this.filterReviews} />
          </div>

          <Mentions />
          <Search />
          <ReviewPage reviews={filteredReviews} />
        </div>
      );
    }
    return (
      <div>
        <Header id="qa-header" header="Questions & Answers" buttonLabel="Ask a question" subtitle={`See all ${numQuestions} questions`} buttonId="ask-question" handleSelection={this.handleSelection} />
      </div>
    );
  }

  filterReviews(e) {
    const {
      attractionId,
      attractionName,
      numReviews,
      numQuestions,
      view,
      reviews,
      popupActive,
      langActive,
      filters,
    } = this.state;

    const filter = e.target.id;
    const isChecked = e.target.checked;

    console.log(filter, isChecked);

    const mapToFilter = {
      'Excellent-filter': 'excellent',
      'VeryGood-filter': 'veryGood',
      'Average-filter': 'average',
      'Poor-filter': 'poor',
      'Terrible-filter': 'terrible',
      'checkbox-Families': 'family',
      'checkbox-Couples': 'couple',
      'checkbox-Solo': 'solo',
      'checkbox-Business': 'business',
      'checkbox-Friends': 'friends',
      'checkbox-Dec-Feb': 'decFeb',
      'checkbox-Mar-May': 'marMay',
      'checkbox-Jun-Aug': 'junAug',
      'checkbox-Sep-Nov': 'sepNov',
    };

    if (isChecked !== undefined) {

      filters[mapToFilter[filter]] = isChecked;

      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view,
        reviews,
        popupActive,
        langActive,
        filters,
      });
    }
  }

  handleSelection(e) {
    const {
      attractionId,
      attractionName,
      numReviews,
      numQuestions,
      view,
      reviews,
      popupActive,
      langActive,
      filters,
    } = this.state;

    if (e.target.value === 'ask-question' || e.target.value === 'Ask a question') {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view,
        reviews,
        popupActive: true,
        langActive,
        filters,
      });
    } else if (e.target.value === 'more-langs') {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view,
        reviews,
        popupActive,
        langActive: true,
        filters,
      });
    } else {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view,
        reviews,
        popupActive,
        langActive,
        filters,
      });
      window.alert('Off-page link');
    }
  }

  handleViewSwitch(e) {
    const {
      attractionId,
      attractionName,
      numReviews,
      numQuestions,
      view,
      reviews,
      popupActive,
      langActive,
      filters,
    } = this.state;

    let newView;
    const qualifierIndex = e.target.id.indexOf('-');
    const id = e.target.id.slice(0, qualifierIndex);

    if (id === 'review') {
      newView = 'Reviews';
    } else if (id === 'qa') {
      newView = 'Questions';
    } else {
      newView = view;
    }

    if (view !== newView || popupActive || langActive) {
      this.setState({
        attractionId,
        attractionName,
        numReviews,
        numQuestions,
        view: newView,
        reviews,
        popupActive: false,
        langActive: false,
        filters,
      });
    }
  }

  render() {
    const {
      attractionName,
      reviews,
      numReviews,
      numQuestions,
      popupActive,
      langActive,
    } = this.state;

    const langsArray = this.getUniqueSortedLangs(reviews);

    return (
      <div className="container">

        <AskQuestion
          hidden={!popupActive}
          handleViewSwitch={this.handleViewSwitch}
          name={attractionName}
        />

        <Languages
          hidden={!langActive}
          handleViewSwitch={this.handleViewSwitch}
          langs={langsArray}
          handleFilter={this.filterReviews}
        />

        <div id="tabs">
          <Tab baseId="review" title="Reviews" records={numReviews} handleViewSwitch={this.handleViewSwitch} />
          <Tab baseId="qa" title="Q&A" records={numQuestions} handleViewSwitch={this.handleViewSwitch} />
        </div>

        {this.getCurrentView()}

        <NavBar />
      </div>
    );
  }

  getUniqueSortedLangs(reviews) {
    const allLangs = reviews.map((review) => review.lang);
    const uniqueifier = {};

    allLangs.forEach((lang) => {
      if (lang in uniqueifier) {
        uniqueifier[lang] += 1;
      } else {
        uniqueifier[lang] = 1;
      }
    });

    const langsSummary = [];
    for (const lang in uniqueifier) { // eslint-disable-line
      const oneLang = [];
      oneLang.push(lang, uniqueifier[lang]);
      langsSummary.push(oneLang);
    }

    langsSummary.sort((langA, langB) => {
      if (langA[1] > langB[1]) {
        return -1;
      } else if (langA[1] < langB[1]) {
        return 1;
      } else {
        return 0;
      }
    });

    langsSummary.unshift(['All languages', null]);

    return langsSummary;
  }
}

App.propTypes = {
  attractionId: string.isRequired,
  initialData: arrayOf(object), // eslint-disable-line react/require-default-props
};
