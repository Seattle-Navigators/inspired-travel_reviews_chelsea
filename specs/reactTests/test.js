/**
 * @jest-environment enzyme
 */

// =================================SETUP======================================
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import React from 'react';
import App from '../../client/src/components/App.jsx';
import RadioList from '../../client/src/components/RadioList.jsx';
import Review from '../../client/src/components/Review.jsx';
import getAttractionId from '../../client/src/urlParser.js';

// ============================HELPER FUNCTIONS================================
const { generateTestData } = require('../nodeTests/testData.js');

const clickOn = (wrapper, checkboxes) => {
  checkboxes.forEach((checkbox) => {
    wrapper.find(checkbox).simulate('change', {
      target: {
        id: checkbox.slice(1), checked: true
      }
    });
  });
};

const clickOff = (wrapper, checkboxes) => {
  checkboxes.forEach((checkbox) => {
    wrapper.find(checkbox).simulate('change', {
      target: {
        id: checkbox.slice(1), checked: false
      }
    });
  });
};

const switchView = (wrapper, tab) => wrapper.find(tab).simulate('click');

// ==================================APP=======================================
describe('App component functionality', () => {
  const attractionId = getAttractionId('http://127.0.0.1:3004/200/');
  const wrapper = mount(<App attractionId={attractionId} initialData={generateTestData('200', true)} />);

  test('App should update state with a 3-character attractionId prop', () => {
    expect(wrapper).toHaveProp({ attractionId: '200' });
    expect(wrapper).toHaveState({ attractionId: '200' });
  });

  test('App should render all child components', () => {
    const expectedChildren = {
      '.checklist-filter': 3,
      '.ratings-filter': 1,
      '.header': 1,
      '#popular-mentions': 1,
      '.nav-bar': 1,
      '.rate-bar': 5,
      '.review': 5,
      '#review-page': 1,
      '.search': 1,
      '.tab': 2,
    };
    for (const element in expectedChildren) {
      expect(wrapper).toContainMatchingElements(expectedChildren[element], element);
    }
  });

  test('App should not render inactive popup views', () => {
    const unexpectedChildren = ['.popup', '.popup-background', '.popup-lang', 'popup-lang-background'];
    for (const element of unexpectedChildren) {
      expect(wrapper).not.toContainMatchingElement(element);
    }
  });
});

// ==================================TABS======================================
describe('Tab component functionality', () => {
  const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);

  test('Non-active tab should switch views when clicked', () => {
    switchView(wrapper, '#qa-tab');
    expect(wrapper).toContainMatchingElement('#qa-header');
    switchView(wrapper, '#review-tab');
    expect(wrapper).toContainMatchingElement('#reviews-header');
  });

  test('Active tab should not switch views when clicked', () => {
    switchView(wrapper, '#review-tab');
    expect(wrapper).toContainMatchingElement('#reviews-header');
    switchView(wrapper, '#qa-tab');
    switchView(wrapper, '#qa-tab');
    expect(wrapper).toContainMatchingElement('#qa-header');
  });

  test('Review tab should show number of reviews based on state', () => {
    const appInstance = wrapper.instance();
    const { numReviews } = appInstance.state;
    expect(wrapper.find('#review-num')).toHaveText(`${numReviews}`);
  });
});

// =================================HEADER=====================================
describe('Header and AskQuestion component functionality', () => {
  const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);

  afterEach(() => {
    switchView(wrapper, '#review-tab');
  });

  test('Header component should show number of questions when Q&A tab selected', () => {
    const appInstance = wrapper.instance();
    const { numQuestions } = appInstance.state;
    switchView(wrapper, '#qa-tab');
    expect(wrapper.find('#subtitle')).toHaveText(`See all ${numQuestions} questions`);
  });

  test('Header component should trigger an alert when off-page links selected', () => {
    window.alert = jest.fn();
    const offPageOptions = ['#off-page-write', '#off-page-photo'];
    offPageOptions.forEach((option) => wrapper.find(option).simulate('change'));
    wrapper.find('#write-review').simulate('click');
    switchView(wrapper, '#qa-tab');
    offPageOptions.forEach((option) => wrapper.find(option).simulate('change'));
    expect(window.alert).toHaveBeenCalledTimes(5);
  });

  test('Header component should trigger AskQuestion view when \'Ask a question\' selected', () => {
    expect(wrapper.exists('.popup')).toEqual(false);
    wrapper.find('#ask-question-option').simulate('change');
    expect(wrapper.find('.popup')).toExist();
  });

  test('Header component should trigger AskQuestion view when \'Ask a question\' clicked', () => {
    switchView(wrapper, '#qa-tab');
    expect(wrapper.exists('.popup')).toEqual(false);
    switchView(wrapper, '#ask-question');
    expect(wrapper.find('.popup')).toExist();
  });

  test('User can click to exit AskQuestion component', () => {
    wrapper.find('#ask-question-option').simulate('change');
    switchView(wrapper, '#exit-popup');
    expect(wrapper.exists('.popup')).toEqual(false);
  });

  test('AskQuestion view should be removed upon submission', () => {
    wrapper.find('#ask-question-option').simulate('change');
    expect(wrapper.find('.popup')).toExist();
    wrapper.find('#submit-q').simulate('click');
    expect(wrapper.exists('.popup')).toEqual(false);
    wrapper.find('#ask-question-option').simulate('change');
    expect(wrapper.find('.popup')).toExist();
    wrapper.find('#cancel-q').simulate('click');
    expect(wrapper.exists('.popup')).toEqual(false);
  });
});

// ============================TRAVELER RATINGS================================
describe('Ratings component functionality', () => {
  const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);

  test('Total reviews should match total type ratings', () => {
    const appInstance = wrapper.instance();
    const { numReviews } = appInstance.state;
    const ratingElements = [
      '#Excellent-ratings',
      '#VeryGood-ratings',
      '#Average-ratings',
      '#Poor-ratings',
      '#Terrible-ratings'
    ];
    const ratingsByType = [];
    ratingElements.forEach((element) => ratingsByType.push(Number(wrapper.find(element).text())));
    const totalRatings = ratingsByType.reduce((totalRatings, typeRatings) => totalRatings + typeRatings);
    expect(totalRatings).toEqual(numReviews);
  });

  test('Rating types should allow user to filter and unfilter reviews', () => {
    expect(wrapper).toContainMatchingElements(5, '.review');
    clickOn(wrapper, ['#Excellent-filter']);
    expect(wrapper).toContainMatchingElements(1, '.review');
    clickOn(wrapper, ['#VeryGood-filter']);
    expect(wrapper).toContainMatchingElements(2, '.review');
    clickOn(wrapper, ['#Average-filter']);
    expect(wrapper).toContainMatchingElements(3, '.review');
    clickOn(wrapper, ['#Poor-filter']);
    expect(wrapper).toContainMatchingElements(4, '.review');
    clickOn(wrapper, ['#Terrible-filter']);
    expect(wrapper).toContainMatchingElements(5, '.review');
    clickOff(wrapper, ['#Excellent-filter']);
    expect(wrapper).toContainMatchingElements(4, '.review');
    clickOff(wrapper, ['#VeryGood-filter', '#Average-filter', '#Poor-filter', '#Terrible-filter']);
    expect(wrapper).toContainMatchingElements(5, '.review');
    clickOn(wrapper, ['#VeryGood-filter', '#Average-filter', '#Poor-filter']);
    expect(wrapper).toContainMatchingElements(3, '.review');
  });
});

// =====================TRAVELER TYPES & TIMES OF YEAR=========================
describe('Checklist component functionality', () => {
  test('Five traveler types should be listed', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const travelerTypes = [
      '#checkbox-Families',
      '#checkbox-Couples',
      '#checkbox-Solo',
      '#checkbox-Business',
      '#checkbox-Friends'
    ];
    travelerTypes.forEach((type) => expect(wrapper.find(type)).toExist());
  });

  test('Traveler types should allow user to filter and unfilter reviews', () => {
    const testReviews = generateTestData('200', true);
    const testTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];
    const typeTestData = testReviews.map((review, i) => {
      review.travelType = testTypes[i];
      return review;
    });
    const wrapper = mount(<App attractionId="200" initialData={typeTestData} />);
    const types = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];

    expect(wrapper).toContainMatchingElements(5, '.review');
    types.forEach((type, i) => {
      clickOn(wrapper, [`#checkbox-${type}`]);
      expect(wrapper).toContainMatchingElements(i + 1, '.review');
    });
    types.forEach((type, i) => {
      clickOff(wrapper, [`#checkbox-${type}`]);
    });
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('Four seasons should be listed', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const seasonFilters = ['#checkbox-Dec-Feb', '#checkbox-Mar-May', '#checkbox-Jun-Aug', '#checkbox-Sep-Nov'];
    seasonFilters.forEach((season) => expect(wrapper.find(season)).toExist());
  });

  test('Seasons should allow user to filter and unfilter reviews', () => {
    const testReviews = generateTestData('200', true);
    const testTimes = [
      '2019-01-27T06:08:15.712Z',
      '2019-03-27T06:08:15.712Z',
      '2019-07-27T06:08:15.712Z',
      '2019-10-27T06:08:15.712Z',
      '2019-12-27T06:08:15.712Z',
    ];
    const timeTestData = testReviews.map((review, i) => {
      review.expDate = testTimes[i];
      return review;
    });
    const seasonFilters = ['#checkbox-Dec-Feb', '#checkbox-Mar-May', '#checkbox-Jun-Aug', '#checkbox-Sep-Nov'];
    const cumulativeReviewsPerSeason = [2, 3, 4, 5];
    const wrapper = mount(<App attractionId="200" initialData={timeTestData} />);

    expect(wrapper).toContainMatchingElements(5, '.review');
    seasonFilters.forEach((season, i) => {
      clickOn(wrapper, [season]);
      expect(wrapper).toContainMatchingElements(cumulativeReviewsPerSeason[i], '.review');
    });
    clickOff(wrapper, seasonFilters);
    expect(wrapper).toContainMatchingElements(5, '.review');
  });
});

// ============================LANGUAGE FILTER=================================
describe('RadioList component functionality', () => {
  test('Four first languages should be displayed', () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(
      <RadioList
        title="Language"
        handleSelection={mockCallBack}
        langs={[['All languages', null], ['English', 10], ['Spanish', 9], ['Chinese', 8], ['German', 7]]}
        handleFilter={mockCallBack}
        selection="All languages"
      />
    );
    expect(wrapper).toContainMatchingElements(4, '.radio');
  });

  test('Languages should allow user to filter reviews by one language', () => {
    const testReviews = generateTestData('200', true);
    const testLangs = ['English', 'Spanish', 'Chinese', 'German', 'Italian'];
    const langTestData = testReviews.map((review, i) => {
      review.lang = testLangs[i];
      return review;
    });
    const wrapper = mount(<App attractionId="200" initialData={langTestData} />);

    expect(wrapper).toContainMatchingElements(5, '.review');
    testLangs.forEach((lang, i) => {
      if (i > 2) {
        expect(wrapper.exists(`#radio-${lang}`)).toEqual(false);
      } else {
        clickOn(wrapper, [`#radio-${lang}`]);
        expect(wrapper).toContainMatchingElements(1, '.review');
        expect(wrapper.find('.review').hasClass(lang)).toEqual(true);
      }
    });
    clickOn(wrapper, ['#radio-AllLanguages']);
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('User should be able to access expanded view by selecting \'More\'', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.exists('.popup-lang')).toEqual(false);
    wrapper.find('#lang-btn').simulate('click');
    expect(wrapper.find('.popup-lang')).toExist();
  });
});

// =============================LANGUAGE POPUP=================================
describe('Languages expanded view functionality', () => {
  const testReviews = generateTestData('200', true);
  const testLangs = ['English', 'Spanish', 'Chinese', 'German', 'Italian'];
  const langTestData = testReviews.map((review, i) => {
    review.lang = testLangs[i];
    return review;
  });
  const wrapper = mount(<App attractionId="200" initialData={langTestData} />);

  test('All languages should be displayed including default \'All languages\'', () => {
    switchView(wrapper, '#lang-btn');
    expect(wrapper.find('.popup-lang')).toContainMatchingElements(6, '.radio');
    wrapper.find('.popup-lang').find('button').simulate('click');
  });

  test('Languages expanded view should allow user to filter reviews by one language', () => {
    expect(wrapper).toContainMatchingElements(5, '.review');
    switchView(wrapper, '#lang-btn');
    testLangs.forEach((lang) => {
      wrapper.find('.popup-lang').find(`#radio-${lang}`).simulate('change', {
        target: {
          id: `radio-${lang}`, checked: true
        }
      });
      expect(wrapper).toContainMatchingElements(1, '.review');
      expect(wrapper.find('.review').hasClass(lang)).toEqual(true);
    });
    wrapper.find('.popup-lang').find('#radio-AllLanguages').simulate('change', {
      target: {
        id: 'radio-AllLanguages', checked: true
      }
    });
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('User can click \'X\' to exit expanded view', () => {
    switchView(wrapper, '#lang-btn');
    wrapper.find('.popup-lang').find('button').simulate('click');
    expect(wrapper.exists('.popup-lang')).toEqual(false);
  });

  test('User can click outside popup to exit expanded view', () => {
    switchView(wrapper, '#lang-btn');
    wrapper.find('.popup-lang-background').simulate('click');
    expect(wrapper.exists('.popup-lang')).toEqual(false);
  });
});

// ============================POPULAR MENTIONS================================
describe('Popular Mentions component functionality', () => {
  const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);

  test('\'All reviews\' and common words should appear; repeated or sub-words should not', () => {
    const expectedWords = ['allReviews', 'Like', 'I', 'said', 'a', 'great', 'place'];
    expectedWords.forEach((word) => {
      if (word === 'a') {
        expect(wrapper.exists(`#${word}-filter`)).toEqual(false);
      } else {
        expect(wrapper.find(`#${word}-filter`)).toExist();
      }
    });
  });

  test('A popular mention should change color when clicked and unclicked', () => {
    const expectedWords = ['Like', 'I', 'said', 'great', 'place'];

    expectedWords.forEach((word) => {
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}});
      expect(wrapper.find(`#${word}-filter`).find('.mention-on')).toExist();
      expect(wrapper.find(`#${word}-filter`).exists('.mention-off')).toEqual(false);
    });

    expect(wrapper.find('#allReviews-filter').exists('.mention-on')).toEqual(false);

    expectedWords.forEach((word) => {
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}});
      expect(wrapper.find(`#${word}-filter`).find('.mention-off')).toExist();
      expect(wrapper.find(`#${word}-filter`).exists('.mention-on')).toEqual(false);
    });

    expect(wrapper.find('#allReviews-filter').find('.mention-on')).toExist();
  });

  test('A popular mention should change state property \'search\' when clicked and unclicked', () => {
    const expectedWords = ['Like', 'I', 'said', 'great', 'place'];
    expectedWords.forEach((word) => {
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}}); // click
      expect(wrapper.state('search')).toEqual(word);
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}}); // unclick
    });
  });

  test('State \'search\' property should reflect \'All reviews\' when nothing selected', () => {
    expect(wrapper.find('#allReviews-filter').find('.mention-on')).toExist();
    expect(wrapper.state('search')).toEqual('All reviews');
    wrapper.find(`#Like-filter`).hostNodes().simulate('click', {target: {value: 'Like'}}); // click
    wrapper.find(`#Like-filter`).hostNodes().simulate('click', {target: {value: 'Like'}}); // unclick
    expect(wrapper.state('search')).toEqual('All reviews');
  });
});

// =================================SEARCH=====================================
describe('Search component functionality', () => {
  const testReviews = generateTestData('200', true);
  const testBodies = ['zzz aa bb', 'amazing HI there', 'test Me out', 'words and things', 'out of ideas'];
  const testTitles = ['Amazing title', 'Vacation', 'hello', 'This was a great vacation', 'Test'];
  const bodyTestData = testReviews.map((review, i) => {
    review.body = testBodies[i];
    return review;
  });
  const testData = bodyTestData.map((review, i) => {
    review.title = testTitles[i];
    return review;
  });
  const wrapper = mount(<App attractionId="200" initialData={testData} />);

  test('Search should filter reviews based on words in body and title', () => {
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#search-input').simulate('change', {target: {value: 'ZZZ'}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    wrapper.find('#search-input').simulate('change', {target: {value: 'amazing'}});
    expect(wrapper).toContainMatchingElements(2, '.review');
  });

  test('Search should be cleared after clicking the \'X\' button', () => {
    wrapper.find('.search').find('button').simulate('click');
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('Search should show no reviews if no matches found', () => {
    wrapper.find('#search-input').simulate('change', {target: {value: 'notHere'}});
    expect(wrapper).toContainMatchingElements(0, '.review');
    wrapper.find('.search').find('button').simulate('click');
  });

  test('Search should show no-results message if no matches found', () => {
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#search-input').simulate('change', {target: {value: 'notHere'}});
    expect(wrapper).toContainMatchingElements(1, '#no-results');
    wrapper.find('.search').find('button').simulate('click');
  });

  test('All reviews should be shown if Search is empty', () => {
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#search-input').simulate('change', {target: {value: 'notHere'}});
    wrapper.find('#search-input').simulate('change', {target: {value: ''}});
    expect(wrapper).toContainMatchingElements(5, '.review');
  });
});

// ==============================REVIEW FEED===================================
describe('ReviewPage component functionality', () => {
  const testBatch1 = generateTestData('200', true);
  const testBatch2 = generateTestData('200', true);
  const testData = testBatch1.concat(testBatch2);
  const wrapper = mount(<App attractionId="200" initialData={testData} />);

  test('Review page should render only five first reviews on first page', () => {
    const appInstance = wrapper.instance();
    const reviewBlocks = appInstance.state.reviews;
    expect(wrapper.find('#review-page')).toContainMatchingElements(5, '.review');
    expect(reviewBlocks.length).toEqual(10);
  });
});

// =============================REVIEW BLOCKS==================================
describe('Review block component functionality', () => {
  const testReview = generateTestData('200', true)[0];
  const reviewWrapper = mount(<Review review={testReview} />);

  test('A review block should contain a set of standard items', () => {
    const expectedElements = [
      '.profile-image',
      '.header-user-text',
      '.header-user-info',
      '.map-icon',
      '.rating-area',
      '.review-title',
      '.review-text',
      '.read-more-button',
      '.exp-date',
      '.helpful-button',
      '.share-button',
    ];
    expectedElements.forEach((element) => {
      expect(reviewWrapper).toContainMatchingElement(element);
    });
  });

  test('\'Read more\' button should expand and collapse', () => {
    expect(reviewWrapper.find('.read-more-btn-txt')).toHaveText('Read more');
    expect(reviewWrapper.find('.read-more-btn-txt')).not.toHaveText('Read less');
    reviewWrapper.find('.read-more-button').simulate('click');
    expect(reviewWrapper.find('.read-more-btn-txt')).toHaveText('Read less');
  });

  test('\'1 Helpful vote\' should be shown if state property \'helpful\' is set to true', () => {
    reviewWrapper.setState({ helpful: true });
    expect(reviewWrapper.find('.helpful-vote').props()['hidden']).toEqual(false);
  });

  test('Green circles representing rating should match instance\'s rating property plus one', () => {
    const reviewInstance = reviewWrapper.instance();
    expect(reviewWrapper).toContainMatchingElements(reviewInstance.rating + 1, '.green-rating-circle');
  });

  test('\'...\' button should open a dropdown menu', () => {
    expect(reviewWrapper.find('.dots-menu').props()['hidden']).toEqual(true);
    reviewWrapper.find('.dots').find('button').simulate('click');
    expect(reviewWrapper.find('.dots-menu').props()['hidden']).toEqual(false);
  });
});

describe('NavBar component functionality', () => {
  const testBatch1 = generateTestData('200', true);
  const testBatch2 = generateTestData('200', true);
  const testBatch3 = generateTestData('200', true);
  const testBatch4 = generateTestData('200', true);
  const testData = testBatch1.concat(testBatch2).concat(testBatch3).concat(testBatch4);
  const wrapper = mount(<App attractionId="200" initialData={testData} />);

  test('Previous button should not go to previous page when on page 1', () => {
    expect(wrapper).toHaveState({ currentPage: 1 });
    wrapper.find('#prev-page').simulate('click', {target: {value: 'prev-page'}});
    expect(wrapper).toHaveState({ currentPage: 1 });
  });

  test('Next button should go to next page when not on last page', () => {
    expect(wrapper).toHaveState({ currentPage: 1 });
    wrapper.find('#next-page').simulate('click', {target: {value: 'next-page'}});
    expect(wrapper).toHaveState({ currentPage: 2 });
  });

  test('Previous button should go to previous page when not on page 1', () => {
    wrapper.find('#next-page').simulate('click', {target: {value: 'next-page'}});
    wrapper.find('#next-page').simulate('click', {target: {value: 'next-page'}});
    wrapper.find('#prev-page').simulate('click', {target: {value: 'prev-page'}});
    expect(wrapper).toHaveState({ currentPage: 3 });
  });

  test('Next button should not go to next page when on last page', () => {
    wrapper.find('#next-page').simulate('click', {target: {value: 'next-page'}});
    expect(wrapper).toHaveState({ currentPage: 4 });
    wrapper.find('#next-page').simulate('click', {target: {value: 'next-page'}});
    expect(wrapper).toHaveState({ currentPage: 4 });
  });

  test('Selecting a page number should navigate to that page', () => {
    const pageNumber = wrapper.find('.inactive-page-button').at(1).props()['value'];
    wrapper.find('.inactive-page-button').at(1).simulate('click', {target: {value: pageNumber}});
    expect(wrapper).toHaveState({ currentPage: pageNumber });
  });

  test('The sixth review stored in state should be the first review on page two', () => {
    const uniqueIdTestData = testData.map((review, i) => {
      review._id = i;
      return review;
    });
    const wrapper = mount(<App attractionId="200" initialData={uniqueIdTestData} />);
    wrapper.find('.inactive-page-button').at(0).simulate('click', {target: {value: 2}});
    expect(wrapper).toHaveState({ currentPage: 2 });
    const reviewInstance = wrapper.find(Review).at(0).instance();
    expect(reviewInstance.reviewId).toEqual(5);
  });
});
