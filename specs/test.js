import App from '../client/src/components/App.jsx';
import React from 'react';
import { mount, shallow } from 'enzyme';

const { findForId, updateReview, updateImage } = require('../server/routeHandlers.js');
// const casper = require('casper').create();

// test('CasperJS', () => {
//   casper.open('http://localhost:3004');
//   casper.then(function() {
//     this.echo(this.getTitle());
//     expect(true).toBe(true);
//   });
// });

test('findForId is a function', () => {
  expect(typeof findForId).toBe('function');
});

test('updateReview is a function', () => {
  expect(typeof updateReview).toBe('function');
});

test('updateImage is a function', () => {
  expect(typeof updateImage).toBe('function');
});

test('App is a function', () => {
  expect(typeof App).toBe('function');
});
