/**
 * @jest-environment enzyme
 */
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import React from 'react';
import App from '../../client/src/components/App.jsx';
import RadioList from '../../client/src/components/RadioList.jsx';
import getAttractionId from '../../client/src/urlParser.js';

const { generateTestData } = require('../nodeTests/testData.js');

describe('App component functionality', () => {
  test('App should update state with a 3-character attractionId prop', () => {
    const attractionId = getAttractionId('http://127.0.0.1:3004/200/');
    const wrapper = mount(<App attractionId={attractionId} initialData={generateTestData('200', true)} />);
    expect(wrapper).toHaveProp({ attractionId: '200' });
    expect(wrapper).toHaveState({ attractionId: '200' });
  });

  test('App should render all child components', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper).toContainMatchingElements(3, '.checklist-filter');
    expect(wrapper).toContainMatchingElements(1, '.ratings-filter');
    expect(wrapper).toContainMatchingElements(1, '.header');
    expect(wrapper).toContainMatchingElements(1, '#popular-mentions');
    expect(wrapper).toContainMatchingElements(1, '.nav-bar');
    expect(wrapper).toContainMatchingElements(5, '.rate-bar');
    expect(wrapper).toContainMatchingElements(5, '.review');
    expect(wrapper).toContainMatchingElements(1, '#review-page');
    expect(wrapper).toContainMatchingElements(1, '.search');
    expect(wrapper).toContainMatchingElements(2, '.tab');
  });
});

describe('Tab component functionality', () => {
  test('Non-active tab should switch views when clicked', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#qa-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#qa-header');
    wrapper.find('#review-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#reviews-header');
  });

  test('Active tab should not switch views when clicked', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#review-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#reviews-header');
    wrapper.find('#qa-tab').simulate('click');
    wrapper.find('#qa-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#qa-header');
  });

  test('Review tab should show number of reviews based on state', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const appInstance = wrapper.instance();
    const { numReviews } = appInstance.state;
    expect(wrapper.find('#review-num')).toHaveText(`${numReviews}`);
  });
});

describe('Header and AskQuestion component functionality', () => {
  test('Header component should show number of questions when Q&A tab selected', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const appInstance = wrapper.instance();
    const { numQuestions } = appInstance.state;
    wrapper.find('#qa-tab').simulate('click');
    expect(wrapper.find('#subtitle')).toHaveText(`See all ${numQuestions} questions`);
  });
  test('Header component should trigger an alert when off-page links selected', () => {
    window.alert = jest.fn();
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#off-page-write').simulate('change');
    wrapper.find('#off-page-photo').simulate('change');
    wrapper.find('#write-review').simulate('click');
    wrapper.find('#qa-tab').simulate('click');
    wrapper.find('#off-page-write').simulate('change');
    wrapper.find('#off-page-photo').simulate('change');
    expect(window.alert).toHaveBeenCalledTimes(5);
  });
  test('Header component should trigger AskQuestion view when \'Ask a question\' selected', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.exists('.popup')).toEqual(false);
    wrapper.find('#ask-question-option').simulate('change');
    expect(wrapper.find('.popup')).toExist();
  });
  test('Header component should trigger AskQuestion view when \'Ask a question\' clicked', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#qa-tab').simulate('click');
    expect(wrapper.exists('.popup')).toEqual(false);
    wrapper.find('#ask-question').simulate('click');
    expect(wrapper.find('.popup')).toExist();
  });
  test('User can click to exit AskQuestion component', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#ask-question-option').simulate('change');
    wrapper.find('#exit-popup').simulate('click');
    expect(wrapper.exists('.popup')).toEqual(false);
  });
  test('AskQuestion view should be removed upon submission', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
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

describe('Ratings component functionality', () => {
  test('Total reviews should match total type ratings', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const appInstance = wrapper.instance();
    const { numReviews } = appInstance.state;

    const excellents = Number(wrapper.find('#Excellent-ratings').text());
    const veryGoods = Number(wrapper.find('#VeryGood-ratings').text());
    const averages = Number(wrapper.find('#Average-ratings').text());
    const poors = Number(wrapper.find('#Poor-ratings').text());
    const terribles = Number(wrapper.find('#Terrible-ratings').text());

    const totalTypeRatings = excellents + veryGoods + averages + poors + terribles;

    expect(totalTypeRatings).toEqual(numReviews);
  });

  test('Rating types should allow user to filter and unfilter reviews', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper).toContainMatchingElements(5, '.review');

    wrapper.find('#Excellent-filter').simulate('change', {target: {id: 'Excellent-filter', checked: true} });
    expect(wrapper).toContainMatchingElements(1, '.review');
    wrapper.find('#VeryGood-filter').simulate('change', {target: {id: 'VeryGood-filter', checked: true} });
    expect(wrapper).toContainMatchingElements(2, '.review');
    wrapper.find('#Average-filter').simulate('change', {target: {id: 'Average-filter', checked: true} });
    expect(wrapper).toContainMatchingElements(3, '.review');
    wrapper.find('#Poor-filter').simulate('change', {target: {id: 'Poor-filter', checked: true} });
    expect(wrapper).toContainMatchingElements(4, '.review');
    wrapper.find('#Terrible-filter').simulate('change', {target: {id: 'Terrible-filter', checked: true} });
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#Excellent-filter').simulate('change', {target: {id: 'Excellent-filter', checked: false} });
    expect(wrapper).toContainMatchingElements(4, '.review');
    wrapper.find('#VeryGood-filter').simulate('change', {target: {id: 'VeryGood-filter', checked: false} });
    wrapper.find('#Average-filter').simulate('change', {target: {id: 'Average-filter', checked: false} });
    wrapper.find('#Poor-filter').simulate('change', {target: {id: 'Poor-filter', checked: false} });
    wrapper.find('#Terrible-filter').simulate('change', {target: {id: 'Terrible-filter', checked: false} });
    expect(wrapper).toContainMatchingElements(5, '.review');
  });
});

describe('Checklist component functionality', () => {
  test('Five traveler types should be listed', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.find('#checkbox-Families')).toExist();
    expect(wrapper.find('#checkbox-Couples')).toExist();
    expect(wrapper.find('#checkbox-Solo')).toExist();
    expect(wrapper.find('#checkbox-Business')).toExist();
    expect(wrapper.find('#checkbox-Friends')).toExist();
  });

  test('Traveler types should allow user to filter and unfilter reviews', () => {
    const testReviews = generateTestData('200', true);
    const testTypes = ['Family', 'Couple', 'Solo', 'Business', 'Friends'];
    const typeTestData = testReviews.map((review, i) => {
      review.travelType = testTypes[i];
      return review;
    });

    const wrapper = mount(<App attractionId="200" initialData={typeTestData} />);
    expect(wrapper).toContainMatchingElements(5, '.review');

    wrapper.find('#checkbox-Families').simulate('change', {target: {id: 'checkbox-Families', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    wrapper.find('#checkbox-Couples').simulate('change', {target: {id: 'checkbox-Couples', checked: true}});
    expect(wrapper).toContainMatchingElements(2, '.review');
    wrapper.find('#checkbox-Solo').simulate('change', {target: {id: 'checkbox-Solo', checked: true}});
    expect(wrapper).toContainMatchingElements(3, '.review');
    wrapper.find('#checkbox-Business').simulate('change', {target: {id: 'checkbox-Business', checked: true}});
    expect(wrapper).toContainMatchingElements(4, '.review');
    wrapper.find('#checkbox-Friends').simulate('change', {target: {id: 'checkbox-Friends', checked: true}});
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#checkbox-Friends').simulate('change', {target: {id: 'checkbox-Friends', checked: false}});
    expect(wrapper).toContainMatchingElements(4, '.review');
    wrapper.find('#checkbox-Families').simulate('change', {target: {id: 'checkbox-Families', checked: false}});
    wrapper.find('#checkbox-Couples').simulate('change', {target: {id: 'checkbox-Couples', checked: false}});
    wrapper.find('#checkbox-Solo').simulate('change', {target: {id: 'checkbox-Solo', checked: false}});
    wrapper.find('#checkbox-Business').simulate('change', {target: {id: 'checkbox-Business', checked: false}});
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('Four seasons should be listed', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.find('#checkbox-Dec-Feb')).toExist();
    expect(wrapper.find('#checkbox-Mar-May')).toExist();
    expect(wrapper.find('#checkbox-Jun-Aug')).toExist();
    expect(wrapper.find('#checkbox-Sep-Nov')).toExist();
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

    const wrapper = mount(<App attractionId="200" initialData={timeTestData} />);
    expect(wrapper).toContainMatchingElements(5, '.review');

    wrapper.find('#checkbox-Dec-Feb').simulate('change', {target: {id: 'checkbox-Dec-Feb', checked: true}});
    expect(wrapper).toContainMatchingElements(2, '.review');
    wrapper.find('#checkbox-Mar-May').simulate('change', {target: {id: 'checkbox-Mar-May', checked: true}});
    expect(wrapper).toContainMatchingElements(3, '.review');
    wrapper.find('#checkbox-Jun-Aug').simulate('change', {target: {id: 'checkbox-Jun-Aug', checked: true}});
    expect(wrapper).toContainMatchingElements(4, '.review');
    wrapper.find('#checkbox-Sep-Nov').simulate('change', {target: {id: 'checkbox-Sep-Nov', checked: true}});
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#checkbox-Sep-Nov').simulate('change', {target: {id: 'checkbox-Sep-Nov', checked: false}});
    expect(wrapper).toContainMatchingElements(4, '.review');
    wrapper.find('#checkbox-Dec-Feb').simulate('change', {target: {id: 'checkbox-Dec-Feb', checked: false}});
    expect(wrapper).toContainMatchingElements(2, '.review');
    wrapper.find('#checkbox-Mar-May').simulate('change', {target: {id: 'checkbox-Mar-May', checked: false}});
    wrapper.find('#checkbox-Jun-Aug').simulate('change', {target: {id: 'checkbox-Jun-Aug', checked: false}});
    expect(wrapper).toContainMatchingElements(5, '.review');
  });
});

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

    wrapper.find('#radio-English').simulate('change', {target: {id: 'radio-English', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    let foundIndex = wrapper.find('.review').text().indexOf('English');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('#radio-Spanish').simulate('change', {target: {id: 'radio-Spanish', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    foundIndex = wrapper.find('.review').text().indexOf('Spanish');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('#radio-Chinese').simulate('change', {target: {id: 'radio-Chinese', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    foundIndex = wrapper.find('.review').text().indexOf('Chinese');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('#radio-AllLanguages').simulate('change', {target: {id: 'radio-AllLanguages', checked: true}});
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('User should be able to access expanded view by selecting \'More\'', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.exists('.popup-lang')).toEqual(false);
    wrapper.find('#lang-btn').simulate('click');
    expect(wrapper.find('.popup-lang')).toExist();
  });
});

describe('Languages expanded view functionality', () => {
  test('All languages should be displayed', () => {
    const testReviews = generateTestData('200', true);
    const testLangs = ['English', 'Spanish', 'Chinese', 'German', 'Italian'];
    const langTestData = testReviews.map((review, i) => {
      review.lang = testLangs[i];
      return review;
    });
    const wrapper = mount(<App attractionId="200" initialData={langTestData} />);
    wrapper.find('#lang-btn').simulate('click');
    expect(wrapper.find('.popup-lang')).toContainMatchingElements(6, '.radio');
    // 1 extra above is for default 'All languages'
  });

  test('Languages expanded view should allow user to filter reviews by one language', () => {
    const testReviews = generateTestData('200', true);
    const testLangs = ['English', 'Spanish', 'Chinese', 'German', 'Italian'];
    const langTestData = testReviews.map((review, i) => {
      review.lang = testLangs[i];
      return review;
    });
    const wrapper = mount(<App attractionId="200" initialData={langTestData} />);
    expect(wrapper).toContainMatchingElements(5, '.review');
    wrapper.find('#lang-btn').simulate('click');

    wrapper.find('.popup-lang').find('#radio-English').simulate('change', {target: {id: 'radio-English', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    let foundIndex = wrapper.find('.review').text().indexOf('English');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('.popup-lang').find('#radio-Spanish').simulate('change', {target: {id: 'radio-Spanish', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    foundIndex = wrapper.find('.review').text().indexOf('Spanish');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('.popup-lang').find('#radio-Chinese').simulate('change', {target: {id: 'radio-Chinese', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    foundIndex = wrapper.find('.review').text().indexOf('Chinese');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('.popup-lang').find('#radio-German').simulate('change', {target: {id: 'radio-German', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    foundIndex = wrapper.find('.review').text().indexOf('German');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('.popup-lang').find('#radio-Italian').simulate('change', {target: {id: 'radio-Italian', checked: true}});
    expect(wrapper).toContainMatchingElements(1, '.review');
    foundIndex = wrapper.find('.review').text().indexOf('Italian');
    expect(foundIndex).toBeGreaterThan(-1);

    wrapper.find('.popup-lang').find('#radio-AllLanguages').simulate('change', {target: {id: 'radio-AllLanguages', checked: true}});
    expect(wrapper).toContainMatchingElements(5, '.review');
  });

  test('User can click \'X\' to exit expanded view', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#lang-btn').simulate('click');
    wrapper.find('.popup-lang').find('button').simulate('click');
    expect(wrapper.exists('.popup-lang')).toEqual(false);
  });

  test('User can click outside popup to exit expanded view', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    wrapper.find('#lang-btn').simulate('click');
    wrapper.find('.popup-lang-background').simulate('click');
    expect(wrapper.exists('.popup-lang')).toEqual(false);
  });
});

describe('Popular Mentions component functionality', () => {
  test('The default \'All reviews\' as well as words that recur in > 15% of reviews should be shown', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const expectedWords = ['allReviews', 'Like', 'I', 'said', 'a', 'great', 'place'];
    expectedWords.forEach((word) => {
      expect(wrapper.find(`#${word}-filter`)).toExist();
    });
  });

  test('A popular mention should change color when clicked', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const expectedWords = ['Like', 'I', 'said', 'a', 'great', 'place'];
    expectedWords.forEach((word) => {
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}});
      expect(wrapper.find(`#${word}-filter`).find('.mention-on')).toExist();
    });
    wrapper.find('#allReviews-filter').hostNodes().simulate('click', {target: {value: 'All reviews'}});
    expect(wrapper.find('#allReviews-filter').find('.mention-on')).toExist();
  });

  test('A popular mention should change state property \'search\' when clicked and unclicked', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const expectedWords = ['Like', 'I', 'said', 'a', 'great', 'place'];
    expectedWords.forEach((word) => {
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}}); // click
      expect(wrapper.state('search')).toEqual(` ${word}`);
      wrapper.find(`#${word}-filter`).hostNodes().simulate('click', {target: {value: word}}); // unclick
      // next iteration of forEach should fail if unclick fails as words will stack
    });
  });

  test('State \'search\' property should reflect \'All reviews\' when nothing selected', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.find('#allReviews-filter').find('.mention-on')).toExist();
    expect(wrapper.state('search')).toEqual('All reviews');
    wrapper.find(`#Like-filter`).hostNodes().simulate('click', {target: {value: 'Like'}}); // click
    wrapper.find(`#Like-filter`).hostNodes().simulate('click', {target: {value: 'Like'}}); // unclick
    expect(wrapper.state('search')).toEqual('All reviews');
  });
});

describe('ReviewPage component functionality', () => {
  test('Review page should render number of review blocks based on state', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const appInstance = wrapper.instance();
    const reviewBlocks = appInstance.state.reviews;
    expect(wrapper.find('#review-page')).toContainMatchingElements(reviewBlocks.length, '.review');
  });
});
