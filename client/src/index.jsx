import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import getAttractionId from './urlParser';

const { generateTestData } = require('../../specs/nodeTests/testData.js');

const attractionId = getAttractionId(window.location.href);

const initialData = generateTestData('200');

ReactDOM.render(<App attractionId={attractionId} />, document.getElementById('app'));
