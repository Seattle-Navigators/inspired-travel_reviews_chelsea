import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';

console.log('setup.js running');

// const { JSDOM } = require('jsdom');
// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
// const { window } = jsdom;
