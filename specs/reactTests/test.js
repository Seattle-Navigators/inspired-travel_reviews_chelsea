/**
 * @jest-environment enzyme
 */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';

import { shallow, mount } from 'enzyme';
import App from '../../client/src/components/App.jsx'; // eslint-disable-line import/extensions
import Checklist from '../../client/src/components/Checklist.jsx'; // eslint-disable-line import/extensions
import getAttractionId from '../../client/src/urlParser.js';

describe('App component functionality', () => {
  test('App should update state with a 3-character attractionId prop', () => {
    const attractionId = getAttractionId('http://127.0.0.1:3004/200/');
    const wrapper = mount(<App attractionId={attractionId} />);
    expect(wrapper).toHaveProp({ attractionId: '200' });
    expect(wrapper).toHaveState({ attractionId: '200' });
  });

  test('App should render all child components', () => {
    const wrapper = mount(<App attractionId="200" />);
    expect(wrapper).toContainMatchingElements(4, '.filter');
    expect(wrapper).toContainMatchingElements(1, '.header');
    expect(wrapper).toContainMatchingElements(1, '#popular-mentions');
    expect(wrapper).toContainMatchingElements(1, '.nav-bar');
    expect(wrapper).toContainMatchingElements(5, '.rate-bar');
    expect(wrapper).toContainMatchingElements(1, '.review');
    expect(wrapper).toContainMatchingElements(1, '#review-page');
    expect(wrapper).toContainMatchingElements(1, '.search');
    expect(wrapper).toContainMatchingElements(2, '.tab');
  });
});

describe('Tab component functionality', () => {
  test('Non-active tab should switch views when clicked', () => {
    const wrapper = mount(<App attractionId="200" />);
    wrapper.find('#qa-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#qa-header');
    wrapper.find('#review-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#reviews-header');
  });

  test('Active tab should not switch views when clicked', () => {
    const wrapper = mount(<App attractionId="200" />);
    wrapper.find('#review-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#reviews-header');
    wrapper.find('#qa-tab').simulate('click');
    wrapper.find('#qa-tab').simulate('click');
    expect(wrapper).toContainMatchingElement('#qa-header');
  });

  test('Review tab should show number of reviews based on state', () => {
    const wrapper = mount(<App attractionId="200" />);
    const appInstance = wrapper.instance();
    const numReviews = appInstance.state.numReviews;
    expect(wrapper.find('#review-num')).toHaveText(`${numReviews}`);
  });
});

describe('ReviewPage component functionality', () => {
  test('Review page should render number of review blocks based on state', () => {
    const wrapper = mount(<App attractionId="200" />);
    const appInstance = wrapper.instance();
    const reviewBlocks = appInstance.state.reviews;
    expect(wrapper.find('#review-page')).toContainMatchingElements(reviewBlocks.length, '.review');
  });
});
