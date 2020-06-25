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

  test('Rating types should allow user to filter reviews', () => {
    const mockCallBack = jest.fn();
    const wrapper1 = mount(<RateBar name="Excellent" percentage={0.4} ratings={15} handleFilter={mockCallBack} />);
    const wrapper2 = mount(<RateBar name="Very Good" percentage={0.4} ratings={15} handleFilter={mockCallBack} />);
    const wrapper3 = mount(<RateBar name="Average" percentage={0.4} ratings={15} handleFilter={mockCallBack} />);
    const wrapper4 = mount(<RateBar name="Poor" percentage={0.4} ratings={15} handleFilter={mockCallBack} />);
    const wrapper5 = mount(<RateBar name="Terrible" percentage={0.4} ratings={15} handleFilter={mockCallBack} />);
    wrapper1.find('#Excellent-filter').simulate('change');
    wrapper2.find('#VeryGood-filter').simulate('change');
    wrapper3.find('#Average-filter').simulate('change');
    wrapper4.find('#Poor-filter').simulate('change');
    wrapper5.find('#Terrible-filter').simulate('change');
    expect(mockCallBack).toHaveBeenCalledTimes(5);
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
