import React from 'react';
import { string, arrayOf, object } from 'prop-types';
import { contains } from 'underscore';
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
import { applyFilters } from '../utilities/applyFilters';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const reviews = props.initialData || [{
      attractionName: '',
      _id: '',
      helpful: false,
      rating: 4,
      lang: '',
      expDate: '',
      travelType: '',
      body: '',
      title: '',
      user: '',
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
        language: 'All languages',
      },
      search: 'All reviews',
      currentPage: 1,
      guideActive: false,
    };
    this.getCurrentView = this.getCurrentView.bind(this);
    this.handleViewSwitch = this.handleViewSwitch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
    this.handleMention = this.handleMention.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleReadMore = this.handleReadMore.bind(this);
  }

  componentDidMount() {
    const stateCopy = this.state;
    const { attractionId } = this.state;

    axios.get(`/${attractionId}/api/reviews`)
      .then((res) => {
        stateCopy.attractionName = res.data[0].attractionName;
        stateCopy.numReviews = res.data.length;
        stateCopy.reviews = res.data;
        this.setState(stateCopy);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getCurrentView() {
    const {
      view,
      numReviews,
      filters,
      search,
      currentPage,
      reviews
    } = this.state;

    // ========================Apply filters to reviews========================
    const filteredReviews = applyFilters(this.state);
    const noResults = filteredReviews.length === 0;

    // ========================Retrieve popular mentions=======================

    const reviewBodies = reviews.map((review) => review.body);
    const combinedText = reviewBodies.join(' ');
    const words = combinedText.split(' ');

    const wordCounts = words.reduce((counts, word) => {
      word in counts ? counts[word] += 1 : counts[word] = 1; // eslint-disable-line
      return counts;
    }, {});

    const popularMentions = [];
    for (const word in wordCounts) { // eslint-disable-line
      if (wordCounts[word] > reviews.length * 0.15) {
        if (popularMentions.join(' ').indexOf(word) === -1) {
          if ('all reviews'.indexOf(word) === -1) {
            popularMentions.push(word);
          }
        }
      }
    }

    popularMentions.sort((wordA, wordB) => {
      if (wordA[1] > wordB[1]) {
        return -1;
      }
      if (wordA[1] < wordB[1]) {
        return 1;
      }
      return 0;
    });

    popularMentions.unshift('All reviews');

    // ============Provide either Reviews or Questions as the view=============
    const names = ['Excellent', 'Very Good', 'Average', 'Poor', 'Terrible'];
    const types = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
    const times = ['Dec-Feb', 'Mar-May', 'Jun-Aug', 'Sep-Nov'];

    const langsArray = this.getUniqueSortedLangs(reviews);

    if (view === 'Reviews') {
      return (
        <div>
          <Header
            id="reviews-header"
            header="Reviews"
            buttonLabel="Write a review"
            subtitle=""
            buttonId="write-review"
            handleSelection={this.handleSelection}
          />

          <div id="filter-container">
            <Ratings
              names={names}
              reviews={reviews}
              numReviews={numReviews}
              handleFilter={this.filterReviews}
              selections={filters}
            />

            <Checklist
              title="Traveler type"
              labels={types}
              handleFilter={this.filterReviews}
              selections={filters}
            />
            <Checklist
              title="Time of year"
              labels={times}
              handleFilter={this.filterReviews}
              selections={filters}
            />
            <RadioList
              title="Language"
              handleSelection={this.handleSelection}
              langs={langsArray}
              handleFilter={this.filterReviews}
              selection={filters.language}
            />
          </div>

          <Mentions
            keywords={popularMentions}
            handleMention={this.handleMention}
            search={search}
          />
          <Search
            handleChange={this.handleChange}
            search={search}
          />

          <ReviewPage
            reviews={filteredReviews}
            currentPage={currentPage}
          />

          <NavBar
            currentPage={currentPage}
            numReviews={filteredReviews.length}
            handlePageChange={this.handlePageChange}
            view={view}
          />

          <div id="no-results" hidden={!noResults}>
            No results found.
            Try removing a filter, changing your search, or clear all to read reviews.
          </div>

        </div>
      );
    }
    return (
      <div>
        <Header
          id="qa-header"
          header="Questions & Answers"
          buttonLabel="Ask a question"
          subtitle={`See all ${numQuestions} questions`}
          buttonId="ask-question"
          handleSelection={this.handleSelection}
        />

        <div className="page" id="qa-page">
          <div>Question & Answer Placeholder</div>
        </div>

      </div>
    );
  }

  filterReviews(e, exitView = () => {}) { // eslint-disable-line
    const stateCopy = this.state;
    const target = e.target.id;
    const isChecked = e.target.checked;

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
      if (target.indexOf('radio') > -1) {
        const firstLetter = target.indexOf('-') + 1;
        const langSelected = target.slice(firstLetter);
        if (langSelected === 'AllLanguages') {
          stateCopy.filters.language = 'All languages';
        } else {
          stateCopy.filters.language = langSelected;
        }
      } else {
        stateCopy.filters[mapToFilter[target]] = isChecked;
      }
      stateCopy.currentPage = 1;
      this.setState(stateCopy);
    }
    setTimeout(exitView, 200);
  }

  handleChange(e) {
    const stateCopy = this.state;
    const { search } = this.state;
    const target = e.target.value;

    if (search === 'All reviews') {
      stateCopy.search = '';
    }

    target === '' || target === undefined ? stateCopy.search = 'All reviews' : stateCopy.search = target; // eslint-disable-line

    stateCopy.currentPage = 1;
    this.setState(stateCopy);
    e.preventDefault();
  }

  handleMention(e) {
    const stateCopy = this.state;
    const target = e.target.value;

    if (stateCopy.search === 'All reviews') {
      stateCopy.search = '';
    }

    const priorSearchWords = stateCopy.search.split(' ');

    if (target === 'All reviews') {
      stateCopy.search = 'All reviews';
    } else {
      const untargetedWords = priorSearchWords.filter((word) => !(word === target));

      if (untargetedWords.length === priorSearchWords.length) {
        if (stateCopy.search === '') {
          stateCopy.search = target;
        } else {
          stateCopy.search = `${stateCopy.search} ${target}`;
        }
      } else {
        stateCopy.search = untargetedWords.join(' ');
      }

      if (stateCopy.search.length === 0) {
        stateCopy.search = 'All reviews';
      }
    }

    stateCopy.currentPage = 1;
    this.setState(stateCopy);
    e.preventDefault();
  }

  handlePageChange(e, max) {
    const stateCopy = this.state;
    const { currentPage } = this.state;
    const newPage = e.target.value;

    if (newPage === 'next-page' && currentPage + 1 <= max) {
      stateCopy.currentPage += 1;
    } else if (newPage === 'prev-page' && currentPage - 1 >= 1) {
      stateCopy.currentPage -= 1;
    } else if (Number(newPage)) {
      stateCopy.currentPage = Number(newPage);
    }

    if (stateCopy.currentPage !== currentPage) {
      this.setState(stateCopy);
    }
    e.preventDefault();
  }

  handleSelection(e) {
    const stateCopy = this.state;

    if (e.target.value === 'ask-question' || e.target.value === 'Ask a question') {
      stateCopy.popupActive = true;
    } else if (e.target.value === 'more-langs') {
      stateCopy.langActive = true;
    } else {
      window.alert('Off-page link');
    }

    this.setState(stateCopy);
  }

  handleViewSwitch(e) {
    const stateCopy = this.state;
    const { view, popupActive, langActive } = this.state;

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
      stateCopy.view = newView;
      stateCopy.popupActive = false;
      stateCopy.langActive = false;
      this.setState(stateCopy);
    }
  }

  handleReadMore(e) {
    const stateCopy = this.state;
    const { guideActive } = this.state;
    const target = e.target.id;

    const guidelineIds = ['guideline-area', 'posting-guidelines-link', 'posting-guidelines-arrow'];
    if (contains(guidelineIds, target)) {
      stateCopy.guideActive = !guideActive;
      this.setState(stateCopy);
    }
    e.preventDefault();
  }

  render() {
    const {
      attractionName,
      reviews,
      numReviews,
      numQuestions,
      popupActive,
      langActive,
      filters,
      guideActive,
      view,
    } = this.state;

    const langsArray = this.getUniqueSortedLangs(reviews);

    return (
      <div className="review-container">

        <AskQuestion
          hidden={!popupActive}
          handleViewSwitch={this.handleViewSwitch}
          name={attractionName}
          guideActive={guideActive}
          handleReadMore={this.handleReadMore}
        />

        <Languages
          hidden={!langActive}
          handleViewSwitch={this.handleViewSwitch}
          langs={langsArray}
          handleFilter={this.filterReviews}
          selection={filters.language}
        />

        <div id="tabs">
          <Tab
            baseId="review"
            title="Reviews"
            records={numReviews}
            handleViewSwitch={this.handleViewSwitch}
            activeView={view}
          />
          <Tab
            baseId="qa"
            title="Q&A"
            records={numQuestions}
            handleViewSwitch={this.handleViewSwitch}
            activeView={view}
          />
        </div>

        {this.getCurrentView()}

      </div>
    );
  }

  getUniqueSortedLangs(reviews) { //eslint-disable-line
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
      }
      if (langA[1] < langB[1]) {
        return 1;
      }
      return 0;
    });

    langsSummary.unshift(['All languages', null]);

    return langsSummary;
  }

  // textHasAllSearchWords(textWords, searchWords) { // eslint-disable-line
  //   let containsSearch = true;
  //   searchWords.forEach((searchWord) => {
  //     if (!contains(textWords, searchWord)) {
  //       containsSearch = false;
  //     }
  //   });
  //   return containsSearch;
  // }
}

App.propTypes = {
  attractionId: string.isRequired,
  initialData: arrayOf(object), // eslint-disable-line react/require-default-props
};
