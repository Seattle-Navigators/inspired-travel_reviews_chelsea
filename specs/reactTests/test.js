/**
 * @jest-environment enzyme
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx';
import Checklist from '../../client/src/components/Checklist.jsx';
import RateBar from '../../client/src/components/RateBar.jsx';
import ListItem from '../../client/src/components/ListItem.jsx';
import RadioList from '../../client/src/components/RadioList.jsx';
import Languages from '../../client/src/components/Languages.jsx';
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
    const numReviews = appInstance.state.numReviews;
    expect(wrapper.find('#review-num')).toHaveText(`${numReviews}`);
  });
});

describe('Header and AskQuestion component functionality', () => {
  test('Header component should show number of questions when Q&A tab selected', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const appInstance = wrapper.instance();
    const numQuestions = appInstance.state.numQuestions;
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
    const numReviews = appInstance.state.numReviews;

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

  test('Traveler types should allow user to filter reviews', () => {
    const mockCallBack = jest.fn();
    const types = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
    const wrapper = mount(<Checklist title="Traveler type" labels={types} handleFilter={mockCallBack} />);
    wrapper.find('#checkbox-Families').simulate('change');
    wrapper.find('#checkbox-Couples').simulate('change');
    wrapper.find('#checkbox-Solo').simulate('change');
    wrapper.find('#checkbox-Business').simulate('change');
    wrapper.find('#checkbox-Friends').simulate('change');
    expect(mockCallBack).toHaveBeenCalledTimes(5);
  });

  test('Four seasons should be listed', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    expect(wrapper.find('#checkbox-Dec-Feb')).toExist();
    expect(wrapper.find('#checkbox-Mar-May')).toExist();
    expect(wrapper.find('#checkbox-Jun-Aug')).toExist();
    expect(wrapper.find('#checkbox-Sep-Nov')).toExist();
  });

  test('Seasons should allow user to filter reviews', () => {
    const mockCallBack = jest.fn();
    const times = ['Dec-Feb', 'Mar-May', 'Jun-Aug', 'Sep-Nov'];
    const wrapper = mount(<Checklist title="Time of year" labels={times} handleFilter={mockCallBack} />);
    wrapper.find('#checkbox-Dec-Feb').simulate('change');
    wrapper.find('#checkbox-Mar-May').simulate('change');
    wrapper.find('#checkbox-Jun-Aug').simulate('change');
    wrapper.find('#checkbox-Sep-Nov').simulate('change');
    expect(mockCallBack).toHaveBeenCalledTimes(4);
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
        selection={'All languages'}
      />
    );
    expect(wrapper).toContainMatchingElements(4, '.radio');
  });

  test('Languages should allow user to filter reviews', () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(
      <RadioList
        title="Language"
        handleSelection={mockCallBack}
        langs={[['All languages', null], ['English', 10], ['Spanish', 9], ['Chinese', 8], ['German', 7]]}
        handleFilter={mockCallBack}
        selection={'All languages'}
      />
    );
    wrapper.find('#radio-AllLanguages').simulate('change');
    wrapper.find('#radio-English').simulate('change');
    wrapper.find('#radio-Spanish').simulate('change');
    wrapper.find('#radio-Chinese').simulate('change');
    expect(mockCallBack).toHaveBeenCalledTimes(4);
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

  test('Languages expanded view should allow user to filter reviews', () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(
      <Languages
        hidden={false}
        handleViewSwitch={() => {}}
        langs={[['All languages', null], ['English', 10], ['Spanish', 9], ['Chinese', 8], ['German', 7]]}
        handleFilter={mockCallBack}
        selection={'All languages'}
      />
    );
    wrapper.find('#radio-AllLanguages').simulate('change');
    wrapper.find('#radio-English').simulate('change');
    wrapper.find('#radio-Spanish').simulate('change');
    wrapper.find('#radio-Chinese').simulate('change');
    wrapper.find('#radio-German').simulate('change');
    expect(mockCallBack).toHaveBeenCalledTimes(5);
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

describe('ReviewPage component functionality', () => {
  test('Review page should render number of review blocks based on state', () => {
    const wrapper = mount(<App attractionId="200" initialData={generateTestData('200', true)} />);
    const appInstance = wrapper.instance();
    const reviewBlocks = appInstance.state.reviews;
    expect(wrapper.find('#review-page')).toContainMatchingElements(reviewBlocks.length, '.review');
  });
});
